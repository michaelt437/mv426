<template>
  <div>
    <h1 class="mb0">{{movie.title}}</h1>
    <hr style="width: 20px; margin-left: 0;">
    <h4 class="mb2">{{movie.tagline}}</h4>
    <p class="mb0"><strong>Synopsis</strong></p>
    <p class="mb4">{{movie.overview}}</p>
    <div class="columns mb3">
      <div class="column col-8">
        <div class="columns">
          <div class="column col-6">
            <dl class="m0 pb2">
              <dt>Genre</dt>
              <dd class="mt0">{{genres.join(', ')}}</dd>
              <dt>Release Date</dt>
              <dd class="mt0">{{$moment(movie.release_date).format('MMMM D, YYYY')}}</dd>
              <dt>Runtime</dt>
              <dd class="mt0">{{runtime}}</dd>
            </dl>
          </div>
          <div class="column col-6">
            <p><strong>Rating</strong></p>
            <div class="graph_wrapper">
              <h3 class="vote_average">{{movie.vote_average}}</h3>
              <GChart
                type="PieChart"
                :data="chartData"
                :options="chartOptions"
              />
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column col-6">
            <ul class="list--unstyled">
              <li><strong>Crew</strong></li>
              <li v-for="crewMember in crew">
                {{crewMember.job}}: {{crewMember.name}}
              </li>
            </ul>
          </div>
          <div class="column col-6">
            <ul class="list--unstyled">
              <li><strong>Starring</strong></li>
              <li v-for="member in cast">{{member.name}}</li>
              <li v-if="castLength > castLimit">
                <a href="#" @click.prevent="showMoreCast = !showMoreCast" v-text="showMoreCast ? '< Less...' : '> More...'"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="column col-4">
        <img :src="posterSrc" class="poster img-responsive" :alt="movie.title">
      </div>
    </div>
    <p><strong>Stills</strong></p>
    <div class="columns">
      <div class="column">
        <img src="https://via.placeholder.com/300x200?text=NA" class="img-responsive" alt="">
      </div>
      <div class="column">
        <img src="https://via.placeholder.com/300x200?text=NA" class="img-responsive" alt="">
      </div>
      <div class="column">
        <img src="https://via.placeholder.com/300x200?text=NA" class="img-responsive" alt="">
      </div>
      <div class="column">
        <img src="https://via.placeholder.com/300x200?text=NA" class="img-responsive" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
export default {
  name: 'movie-details',
  components: {
    GChart
  },
  data() {
    return {
      showMoreCast: false,
      castLimit: 10,
      crewList: [
        'Director',
        'Director of Photography',
        'Original Music Composer'
      ]
    }
  },
  watch: {
    movie: function() {
      if(this.showMoreCast) {
        this.showMoreCast = false;
      }
    }
  },
  methods: {
    sortCrew(a, b) {
      return a.job > b.job
    },
    setRatingColor(rating) {
      switch(Math.round(rating)) {
        case 1:
          return '#911f00'
        case 2:
          return '#f41818'
        case 3:
          return '#f9592e'
        case 4:
          return '#f9862e'
        case 5:
          return '#f6b437'
        case 6:
          return '#f6d237'
        case 7:
          return '#f4ff4d'
        case 8:
          return '#95c234'
        case 9:
          return '#72d228'
        case 10:
          return '#15d270'
        default:
          return '#666666'
      }
    }
  },
  computed: {
    movie() {
      return this.$store.state.selectedMovie;
    },
    runtime() {
      return this.movie.runtime ?
        `${Math.floor(this.movie.runtime / 60)}hr ${(this.movie.runtime % 60)}m` :
        'TBD'
    },
    genres() {
      return this.movie.genres.map((genreObj) => genreObj.name)
    },
    limitCastList() {
      return this.showMoreCast ? this.movie.credits.cast.length : this.castLimit;
    },
    cast() {
      if(Object.keys(this.movie).length) {
        return this.movie.credits.cast.filter((member, i) => i < this.limitCastList);
      }
    },
    castLength() {
      if(Object.keys(this.movie).length) {
        return this.movie.credits.cast.length;
      }
    },
    crew() {
      let crew = []
      if(Object.keys(this.movie).length) {
        crew = this.movie.credits.crew.filter((member, i) => this.crewList.includes(member.job));
        crew.sort(this.sortCrew)
        return crew;
      }
    },
    posterSrc() {
      return this.$store.getters.getPoster;
    },
    chartData() {
      return [
        ['fill', 'remainder'],
        ['f', this.movie.vote_average * 10],
        ['r', 100 - (this.movie.vote_average * 10)]
      ]
    },
    chartOptions() {
      return {
        backgroundColor: 'transparent',
        colors: [this.setRatingColor(this.movie.vote_average), '#c6c6c6'],
        chartArea: {
          height: '70',
          width: '70'
        },
        enableInteractivity: false,
        legend: 'none',
        pieSliceBorderColor: 'transparent',
        pieSliceText: 'none',
        pieHole: 0.8,
        height: '70',
        width: '70'
      }
    }
  }
}
</script>
