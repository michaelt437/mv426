<template>
  <div>
    <h1 class="mb0">{{movie.title}}</h1>
    <hr style="width: 20px; margin-left: 0;">
    <h4 class="mb2">{{movie.tagline}}</h4>
    <p class="mb0"><strong>Synopsis</strong></p>
    <p class="mb2">{{movie.overview}}</p>
    <dl class="pb2">
      <dt>Release Date</dt>
      <dd class="mt0">{{$moment(movie.release_date).format('MMMM D, YYYY')}}</dd>
      <dt>Runtime</dt>
      <dd class="mt0">{{runtime || '???'}}</dd>
    </dl>
    <div class="columns">
      <div class="column col-4">
        <ul class="list--unstyled">
          <li><strong>Crew:</strong></li>
          <li v-for="crewMember in crew">
            {{crewMember.job}}: {{crewMember.name}}
          </li>
        </ul>
      </div>
      <div class="column col-4">
        <ul class="list--unstyled">
          <li><strong>Starring:</strong></li>
          <li v-for="member in cast">{{member.name}}</li>
          <li v-if="castLength > castLimit">
            <a href="#" @click.prevent="showMoreCast = !showMoreCast" v-text="showMoreCast ? '< Less...' : '> More...'"></a>
          </li>
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
  methods: {
    sortCrew(a, b) {
      return a.job > b.job
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
    }
  }
}
</script>
