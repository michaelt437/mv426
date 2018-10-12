<template>
  <div>
    <div class="columns">
      <div class="column col-3">
        <ul class="list--unstyled">
          <li v-for="(year, i) in years" :key="year">
            <a href="#" @click.prevent="() => (setYear(year), getMoviesOfMonth())" :class="{'active' : (year == selectedYear)}">{{year}}</a>
          </li>
        </ul>
      </div>
      <div class="column col-4">
        <ul class="list--unstyled">
          <li v-for="(month, i) in months" :key="month">
            <a href="#" @click.prevent="() => (setMonth(month), getMoviesOfMonth())" :class="{'active' : (month == selectedMonth)}">{{month}}</a>
          </li>
        </ul>
      </div>
      <div class="column col-5">
        <ul class="list--unstyled">
          <li v-for="movie in movies">
            <a href="#" @click.prevent="getMovieDetails(movie.id)" :class="{'active' : (movie.title == selectedMovie.title)}">{{movie.title}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations,  mapGetters, mapActions } from 'vuex'
export default {
  name: 'app-lists',
  data(){
    return{
    }
  },
  methods: {
    ...mapMutations([
      'setYear',
      'setMonth',
      'setMovie'
    ]),
    ...mapActions([
      'getMoviesOfMonth',
      'getMovieDetails'
    ])
  },
  computed: {
    ...mapState([
      'years',
      'months',
      'selectedYear',
      'selectedMonth',
      'movies',
      'selectedMovie'
    ])
  }
}
</script>
