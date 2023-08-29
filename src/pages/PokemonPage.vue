<template>
    <h1 v-if="!pokemon">Espere por favor...</h1>
    <div v-else>
        <h1>¿Quién es este pokémon?</h1>

        <h3>
            <span class="aciertos"><i class="fa fa-2x fa-solid fa-thumbs-up"></i>&nbsp;Aciertos: {{ aciertos }}</span>
            <span class="fallos"><i class="fa fa-2x fa-solid fa-thumbs-down"></i>&nbsp;Fallos: {{ fallos }}</span>
        </h3>

        <PokemonPicture

          :pokemonId="pokemon.id"
          :showPokemon="showPokemon" />
        <PokemonOptions
          :pokemons="pokemonArr"
          @selection="checkAnswer($event)"
          :disabled="optionsDisabled" />

        <template v-if="confirmed">
            <!-- <h2 class="fade-in" :style="{ color: color() }">
                {{ message() }}
            </h2> -->
            <button @click="newGame">
                Nuevo juego
            </button>
        </template>
    </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions'
import PokemonPicture from '@/components/PokemonPicture'

import getPokemonOptions from '@/helpers/getPokemonOptions'
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
            confirmed: false,
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
        checkAnswer(selectedId) {
            Swal.fire({
                titleText: '¿Estás seguro?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No...',
                confirmButtonText: 'Sí!'
            }).then((result) => {
                if(result.isConfirmed) {
                    this.showPokemon = true
                    this.confirmed = true
                    this.optionsDisabled = true
                    if (selectedId === this.pokemon.id) {
                        this.correctAnswer = true
                        store.commit('contarAcierto')
                        Swal.fire({
                            titleText: this.message(),
                            icon: 'success'
                        })
                    }
                    else {
                        Swal.fire({
                            titleText: this.message(),
                            icon: 'error'
                        })
                        store.commit('contarFallo')
                    }
                }
                else
                    this.optionsDisabled = false
            })
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
        aciertos() {
            return store.getters['getAciertos']
        },
        fallos() {
            return store.getters['getFallos']
        }
    }
}
</script>

<style scoped>
.aciertos {
    color: green;
}

.aciertos > i {
    margin-right: 2px; 
}

.fallos {
    color: red;
    margin-left: 20px;
}

.fallos > i {
    margin-right: 2px; 
}
</style>
