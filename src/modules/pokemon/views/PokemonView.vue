<template>
    <div class="container">
        <h1 v-if="!pokemon">Espere por favor...</h1>
        <div class="content" v-else>
            <div>
                <span class="hits"><i class="fa fa-2x fa-solid fa-thumbs-up"></i>&nbsp;Aciertos: {{ hits }}</span>
                <span class="errors"><i class="fa fa-2x fa-solid fa-thumbs-down"></i>&nbsp;Fallos: {{ errors }}</span>
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
                confirmButtonText: 'Sí!'
            })

            if( isConfirmed ) {
                this.showPokemon = true
                this.optionsDisabled = true
                if (selectedId === this.pokemon.id) {
                    this.correctAnswer = true
                    store.commit('pokemon/increaseHits')
                    await Swal.fire({
                        titleText: this.message(),
                        icon: 'success'
                    })
                }
                else {
                    await Swal.fire({
                        titleText: this.message(),
                        icon: 'error'
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
.hits {
    color: green;
}

.hits > i {
    margin-right: 2px; 
}

.errors {
    color: red;
    margin-left: 20px;
}

.errors > i {
    margin-right: 2px; 
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