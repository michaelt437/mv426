import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
// import { APIKEY } from '../apiKey'

const APIKEY = process.env.APIKEY

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    configs: {
      imgPath: '',
      backdropSizes: '',
      posterSizes: '',
      profileSizes: ''
    },
    years: [
      2015,
      2016,
      2017,
      2018,
      2019,
      2020,
      2021,
      2022,
    ],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    movies: [],
    selectedYear: moment().format('YYYY'),
    selectedMonth: moment().format('MMMM'),
    selectedMovie: {}
  },
  mutations: {
    setYear: (state, year) => {
      state.selectedYear = year
    },
    setMonth: (state, month) => {
      state.selectedMonth = month
    },
    setMovies: (state, movies) => {
      state.movies = movies.map(movie => {
        return { id: movie.id, title: movie.title }
      })
    },
    setMovie: (state, movie) => {
      state.selectedMovie = movie;
    },
    setConfigs: (state, payload) => {
      state.configs.imgPath = payload.images.base_url
      state.configs.backdropSizes = payload.images.backdrop_sizes
      state.configs.posterSizes = payload.images.poster_sizes
      state.configs.profileSizes = payload.images.profile_sizes
    }
  },
  getters: {
    getPoster(state){
      if(state.selectedMovie.poster_path) return state.configs.imgPath + state.configs.posterSizes[4] + state.selectedMovie.poster_path;
      else return "https://via.placeholder.com/240x360?text=TBA";
    },
    getMonthStartEnd(state){
      return {
        start: state.selectedYear + '-' + moment(state.selectedMonth, 'MMMM').format('MM') + '-' + '01',
        end: state.selectedYear + '-' + moment(state.selectedMonth, 'MMMM').format('MM') + '-' + moment().month(state.selectedMonth).endOf('month').format('DD')
      };
    },
  },
  actions: {
    getMoviesOfMonth({ state, commit, getters, dispatch }){
      fetch('https://api.themoviedb.org/3/discover/movie?&api_key='+ APIKEY + '&region=US&release_date.gte=' + getters.getMonthStartEnd.start + '&release_date.lte=' + getters.getMonthStartEnd.end + '&with_release_type=3|2')
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        console.log(data)
        commit('setMovies', data.results)
      })
      .then(function(){
        dispatch('getMovieDetails', state.movies[0].id)
      })
    },
    getUpcoming({ state, commit, dispatch }){
      fetch('https://api.themoviedb.org/3/movie/upcoming?&api_key='+ APIKEY + '&language=en-US&page=1&region=US')
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        console.log(data)
        commit('setMovies', data.results)
      })
      .then(function(){
        dispatch('getMovieDetails', state.movies[0].id)
      })
    },
    getConfigs({commit}){
      fetch('https://api.themoviedb.org/3/configuration?api_key=' + APIKEY)
      .then((response) => {
        return response.json();
      })
      .then((configs) => {
        commit('setConfigs', configs)
      })
    },
    getMovieDetails({commit}, id){
      fetch('https://api.themoviedb.org/3/movie/' + id + '?&api_key='+ APIKEY + '&language=en-US&region=US&append_to_response=images,credits,release_dates')
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        commit('setMovie', data)
      })
    }
  }
})
