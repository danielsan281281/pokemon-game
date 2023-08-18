<template>
    <h1 v-if="!pokemon">Espere por favor...</h1>
    <div v-else>
        <h1>¿Quién es este pokémon?</h1>

        <PokemonPicture
          :pokemonId="pokemon.id"
          :showPokemon="showPokemon" />
       <PokemonOptions
          :pokemons="pokemonArr"
          @selection="checkAnswer($event)" />

        <template v-if="showAnswer">
            <h2 class="fade-in" :style="{ color: color() }">
                {{ message() }}
            </h2>
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
            showAnswer: false,
            correctAnswer: false
        }
    },
    methods: {
        async mixPokemonArray() {
            this.pokemonArr = await getPokemonOptions()

            const rndInt = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[rndInt]
        },
        checkAnswer(selectedId) {
            this.showPokemon = true
            this.showAnswer = true
            if (selectedId === this.pokemon.id) {
                this.correctAnswer = true
            }
        },
        newGame(){
            this.pokemonArr = []
            this.pokemon = null
            this.showPokemon = false
            this.showAnswer = false
            this.correctAnswer = false 

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
    }
}
</script>
