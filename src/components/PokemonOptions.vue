<template>
    <div class="options-container">
        <ul>
            <li
              v-for="pokemon in pokemons"
              :key="pokemon.id"
              @click="select(pokemon.id)" :class="{ disabled }">
                {{ pokemon.name }}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        pokemons: {
            type: Array,
            required: true
        },
        disabled: {
            type: Boolean
        }
    },
    methods: {
        select(pokemonId){
            this.$emit('selection', pokemonId)
        }
    }
}
</script>
<style scoped>
    ul {
    list-style-type: none;
}
li {
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    height: 50px;
    width: 300px;
    line-height: 50px;
    font-size: large
}

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.disabled {
    pointer-events: none;
    opacity: 0.6;
}
</style>