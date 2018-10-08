<template>
  <div id="app" class="container grid-xl">
    <div id="content-wrapper">
      <h2 class="mv--426">MV.426</h2>
      <div id="content" class="columns">
        <Lists class="column col-4" :movies="mvlist" />
        <Movie class="column col-8"/>
      </div>
    </div>
  </div>
</template>

<script>
import Lists from './components/Lists'
import Movie from './components/Movie'
import {APIKEY} from './apiKey'
export default {
  name: 'app',
  components: {
    Lists,
    Movie
  },
  data(){
    return{
      name: 'MV.426',
      base_Url: 'https://api.themoviedb.org/3/',
      apiKey: APIKEY,
      selectedValues: {
        year: this.$moment().year(),
        month: this.$moment().month(),
        film: '',
      },
      configs: {
        imgPath: '',
        backdropSizes: '',
        posterSizes: '',
      },
      filmsArr: [],
    }
  },
  computed: {
    films_sorted(){
      let arr = this.filmsArr;
      arr.sort((a,b) => {
        if(a.release_date < b.release_date){
          return -1;
        }else{
          return 1;
        }
        return 0;
      })
      return arr;
    },
    mvlist(){
      let mvlist = this.filmsArr.map(film => {
        return film.title;
      });
      return mvlist;
    },
    monthStart(){
      return this.$moment().year(this.selectedValues['year']).month(this.selectedValues['month']).startOf('month').format('YYYY-MM-DD');
    },
    monthEnd(){
      return this.$moment().year(this.selectedValues['year']).month(this.selectedValues['month']).endOf('month').format('YYYY-MM-DD');
    },
    monthString(){
      return this.$moment().month(this.selectedValues['month']).format('MMMM');
    }
  },
  methods: {
    getConfigs(){
      fetch('https://api.themoviedb.org/3/configuration?api_key=' + this.apiKey)
      .then((response) => {
        return response.json();
      })
      .then((configs) => {
        this.configs['imgPath'] = configs.images.base_url;
        this.configs['backdropSizes'] = configs.images.backdrop_sizes;
        this.configs['posterSizes'] = configs.images.poster_sizes;
      })
    },
    getAPI(){
      let app = this;
      fetch('https://api.themoviedb.org/3/movie/upcoming?&api_key='+ app.apiKey + '&language=en-US&page=1&region=US')
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        app.filmsArr = data.results;
      })
    },
    changeMonth(month){
      this.selectedValues['month'] = month;
      this.getAPI();
    },
    changeYear(year){
      this.selectedValues['year'] = year;
      this.getAPI();
    },
    changeFilm(filmTitle){
      this.selectedValues['film'] = filmTitle;
    },
  },
  created(){
    this.getConfigs();
    this.getAPI();
    this.$eventBus.$on('changeMonth', this.changeMonth);
    this.$eventBus.$on('changeYear', this.changeYear);
    this.$eventBus.$on('selectFilm', this.changeFilm);
  }
}
</script>
