<template>
    <div class="container">
        <h1 v-if="!pokemon">Espere por favor...</h1>
        <div class="content" v-else>
            <div class="score-card">
                <div class="score-box success">
                    <span>Aciertos</span>
                    <strong>{{ hits }}</strong>
                </div>
                <div class="score-box error">
                    <span>Fallos</span>
                    <strong>{{ errors }}</strong>
                </div>
            </div>
            <h1>¿Quién es este pokémon?</h1>

            <PokemonPicture
            :pokemonId="pokemon.id"
            :showPokemon="showPokemon" />
            <PokemonOptions
            :pokemons="pokemonArr"
            @selection="checkAnswer($event)"
            :disabled="optionsDisabled" />

        </div>
    </div>
</template>

<script>
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions'
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture'

import getPokemonOptions from '@/modules/pokemon/helpers/getPokemonOptions'
import store from '@/store'
import Swal from 'sweetalert2';

export default {
    name: 'PokemonPage',
    components: {
        PokemonOptions,
        PokemonPicture
    },
    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            correctAnswer: false,
            optionsDisabled: false
        }
    },
    methods: {
        async mixPokemonArray() {
            this.pokemonArr = await getPokemonOptions()

            const rndInt = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[rndInt]
        },
        async checkAnswer(selectedId) {
            const { isConfirmed } = await Swal.fire({
                titleText: '¿Estás seguro?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No...',
                confirmButtonText: 'Sí!',
                background: 'rgba(255, 255, 255, 0.8)',
                backdrop: false
            })

            if( isConfirmed ) {
                this.showPokemon = true
                this.optionsDisabled = true
                if (selectedId === this.pokemon.id) {
                    this.correctAnswer = true
                    store.commit('pokemon/increaseHits')
                    await Swal.fire({
                        titleText: this.message(),
                        icon: 'success',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdrop: false,
                    })
                }
                else {
                    await Swal.fire({
                        titleText: this.message(),
                        icon: 'error',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdrop: false,
                    })
                    store.commit('pokemon/increaseErrors')
                }

                this.newGame()
            }
            else {
                this.optionsDisabled = false
            }
        },
        newGame(){
            this.pokemonArr = []
            this.pokemon = null
            this.showPokemon = false
            this.confirmed = false
            this.correctAnswer = false
            this.optionsDisabled = false

            this.mixPokemonArray()
        },
        message(){
            return this.correctAnswer? `Correcto, ${this.pokemon.name}` : `Oops, era ${this.pokemon.name}`
        },
        color(){
            return this.correctAnswer? 'green' : 'red'
        }
    },
    mounted() {
        this.mixPokemonArray()
    },
    computed: {
        hits: () => store.getters['pokemon/hits'],
        errors: () => store.getters['pokemon/errors']
    }
}
</script>

<style scoped>
.score-card {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.score-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 120px;
  transition: transform 0.3s;
}

.score-box:hover {
  transform: scale(1.05);
}

.score-box i {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.success {
  background: linear-gradient(135deg, #4CAF50, #81C784);
}

.error {
  background: linear-gradient(135deg, #F44336, #E57373);
}

.score-box span {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.score-box strong {
  font-size: 1.6rem;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>