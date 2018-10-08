<template>
  <div>
    <div class="columns">
      <div class="column col-3">
        <ul class="list--unstyled">
          <li v-for="(year, i) in years" :key="year">
            <a href="#" @click.prevent="">{{year}}</a>
          </li>
        </ul>
      </div>
      <div class="column col-4">
        <ul class="list--unstyled">
          <li v-for="(month, i) in months" :key="month">
            <a href="#" @click.prevent="">{{month}}</a>
          </li>
        </ul>
      </div>
      <div class="column col-5">
        <ul class="list--unstyled">
          <li v-for="movie in movies">
            <a href="#" @click.prevent="">{{movie}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-lists',
  props: {
    movies: {
      type: Array
    }
  },
  data(){
    return{
      years: [
        '2016',
        '2017',
        '2018',
        '2019',
        '2020'
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
      ]
    }
  }
}
</script>
