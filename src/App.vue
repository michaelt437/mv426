<template>
  <div id="app" class="container grid-xl">
    <header>
      <h1 class="title">{{name}}</h1>
    </header>
    <div id="content-wrapper">
      <h2>{{monthString}} {{selectedValues.year}}</h2>
      <div id="content">
        <div id="movies-container">
          <movies :year="selectedValues.year" :month="selectedValues.month" :moviesList="films_sorted" />
        </div>
      </div>
      <!-- <navigation :selectedYear="selectedValues['year']" :selectedMonth="selectedValues['month']"/> -->
    </div>
    <!--  <mainContent class="router-view" :films="films_sorted" :selectedValues="selectedValues" :month="monthString" /> -->
  </div>
</template>

<script>
import Main from './components/Main'
import Navigation from './components/Navigation'
import Movies from './components/Movies'
import {APIKEY} from './apiKey'
export default {
  name: 'app',
  components: {
    Movies
  },
  data(){
    return{
      name: 'MV-426',
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
      fetch('https://api.themoviedb.org/3/discover/movie?&api_key='+ app.apiKey +'&region=US&release_date.gte='+app.monthStart+'&release_date.lte='+app.monthEnd+'&with_release_type=3|2')
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
