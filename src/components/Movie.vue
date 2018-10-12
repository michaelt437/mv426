<template>
  <div>
    <h1>{{movie.title}}</h1>
    <p>{{movie.overview}}</p>
    <p>Release Date: {{$moment(movie.release_date).format('MMMM D, YYYY')}}</p>
    <div class="columns">
      <div class="column col-4">
        <ul class="list--unstyled">
          <li>Director: Denis Villenueve</li>
          <li>Composer: Johan Johansson</li>
          <li>Director of Photography: Roger Deakins</li>
        </ul>
      </div>
      <div class="column col-4">
        <ul class="list--unstyled">
          <li>Starring:</li>
          <li>Marion Cotillard</li>
          <li>Michael Shannon</li>
          <li>Jake Gyllenhaal</li>
          <li>Rebecca Hall</li>
          <li>Dan Stevens</li>
          <li>Claire Foy</li>
        </ul>
      </div>
      <div class="column col-4">
        <img :src="posterSrc" class="poster img-responsive" :alt="movie.title">
      </div>
    </div>
    <div class="columns">
      <p>Stills</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'movie-details',
  data(){
    return{
    }
  },
  computed: {
    movie(){
      return this.$store.state.selectedMovie
    },
    posterSrc(){
      return this.$store.getters.getPoster
    }
  }
}
</script>
