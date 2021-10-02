<template>
<div class="card" v-if="thisWeather && Object.keys(thisWeather).length">
  <div class="card__city">
    {{ thisWeather.name }}
  </div>
  <div class="card__country">
    {{ current ? 'Your current location' : thisWeather.sys.country }}
  </div>
  <div class="card__content">
    <div class="card__item" v-if="thisWeather.weather[0].main">
      <div class="card__label">Weather</div>
      <div class="card__value">{{ thisWeather.weather[0].main }}</div>
    </div>
    <div class="card__item" v-if="item.main.temp">
      <div class="card__label">Temperature</div>
      <div class="card__value">{{ thisWeather.main.temp.toFixed(0) }} °C</div>
    </div>
    <div class="card__item" v-if="item.main.humidity">
      <div class="card__label">Humidity</div>
      <div class="card__value">{{ thisWeather.main.humidity }} %</div>
    </div>
    <div class="card__time">{{ date }}</div>
  </div>
  <div class="card__btns">
    <Btn @click="reloadCard">Reload</Btn>
    <Btn v-if="!hideRemove" @click="$emit('removeCard', thisWeather.name)">Remove</Btn>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Card',
  components: {
    Btn: () => import('@/components/ui-elements/btn')
  },
  props: {
    item: {
      type: Object,
      default () {
        return null
      }
    },
    hideRemove: {
      type: Boolean,
      default: false
    },
    current: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      thisWeather: {
        ...this.item
      },
      date: moment().startOf('minute').fromNow()
    }
  },
  methods: {
    reloadCard () {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en&APPID=8852c3ddb393e3e60aa0c159aaa0b762&q=${this.item.name}`)
        .then(resp => {
          this.thisWeather = resp.data
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  background: $white;
  box-shadow: 0px 2px 10px rgba(10, 10, 10, 0.25);
  padding: 24px;
  border-radius: 6px;
  @include below($mobileLrg) {
    padding: 18px;
  }
  &__city {
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 15px;
    @include below($mobileLrg) {
      font-size: 28px;
      margin-bottom: 5px;
    }
  }
  &__country {
    @include below($mobileLrg) {
      font-size: 14px;
    }
  }
  &__content {
    padding: 40px 0 32px;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #C4C4C4;
    @include below($mobileLrg) {
      font-size: 16px;
    }
  }
  &__time {
    color: $light-grey;
    font-size: 16px;
    text-align: right;
    margin-top: 8px;
    @include below($mobileLrg) {
      font-size: 14px;
    }
  }
  &__btns {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
}
</style>
