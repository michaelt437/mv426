<template>
  <nav class="py2">
    <p class="py1 px2 capitalize">this month</p>
    <ul class="vert-nav year-nav nostyle mb2">
      <li v-for="(year, i) in yearsList" class="vert-nav__item capitalize c-hand" :class="{'active' : (year == activeYear)}" @click="changeYear(year)">{{year}}</li>
    </ul>
    <ul class="vert-nav month-nav nostyle">
      <li v-for="(month, i) in months" class="vert-nav__item capitalize c-hand" :class="{'active' : (i == activeMonth)}" @click="changeMonth(i)">{{month}}</li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'navigation',
  props: ['selectedYear', 'selectedMonth'],
  data(){
    return{
      activeYear: this.selectedYear,
      activeMonth: this.selectedMonth,
      months: [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december',
      ],
      yearOffsets: [-2, -1, 0, 1, 2],
    }
  },
  computed: {
    yearsList(){
      let arr = [];
      for(var offset of this.yearOffsets) {
        arr.push(this.$moment().year() + offset);
      };
      return arr;
    }
  },
  methods: {
    changeMonth(month){
      this.activeMonth = month;
      this.$eventBus.$emit('changeMonth', this.activeMonth);
    },
    changeYear(year){
      this.activeYear = year;
      this.$eventBus.$emit('changeYear', this.activeYear);
    }
  }
}
</script>
