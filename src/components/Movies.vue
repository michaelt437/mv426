<template>
  <ul class="movies nostyle">
    <li class="movies__item c-hand" :class="{'active' : (film.id == selectedFilm)}" v-for="(film,i) in moviesList" :key="film.id" @click="selectFilm(film.id, film)">{{film.title}}</li>
  </ul>
</template>

<script>
export default {
  name: 'moviesList',
  props: ['year','month','moviesList'],
  data(){
    return{
      selectedFilm: '',
    }
  },
  methods: {
    selectFilm(selection, film){
      this.selectedFilm = selection
      this.$eventBus.$emit('selectFilm', film);
    }
  }
}
</script>
