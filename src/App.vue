<template>
  <div id="app" class="container grid-xl">
    <div id="content-wrapper">
      <h2 class="mv--426">MV.426</h2>
      <div id="content" class="columns">
        <Lists class="column col-4" />
        <Movie class="column col-7 col-ml-auto" />
      </div>
    </div>
  </div>
</template>

<script>
import Lists from './components/Lists'
import Movie from './components/Movie'
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
    // getConfigs(){
    //   fetch('https://api.themoviedb.org/3/configuration?api_key=' + this.apiKey)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((configs) => {
    //     this.configs['imgPath'] = configs.images.base_url;
    //     this.configs['backdropSizes'] = configs.images.backdrop_sizes;
    //     this.configs['posterSizes'] = configs.images.poster_sizes;
    //   })
    // }
  },
  created(){
    // this.getConfigs();
    if(this.$store.state.movies.length == 0){
      // this.$store.dispatch('getUpcoming');
      this.$store.dispatch('getMoviesOfMonth');
      this.$store.dispatch('getConfigs');
    }
  }
}
</script>
