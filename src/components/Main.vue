<template>
  <div class="d-flex">
    <MoviesList ref="moviesList" class="movies-list" :year="selectedValues['year']" :month="month" :moviesList="films" />
    <MovieDetails :film="selectedValues['film']" />
  </div>
</template>

<script>
export default {
  name: 'main',
  props: ['selectedValues', 'films', 'month'],
  components: {
  },
  watch: {
    films: () => {
      console.log('watching main, updated movies list')
    }
  },
  created(){
    this.$eventBus.$on('month-update', this.getAPI);
  }
}
</script>
