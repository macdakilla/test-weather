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
  <div class="card__loader" v-if="loader">
    <svg-icon name="loader" class="card__loaderIcon" />
  </div>
</div>
</template>

<script>
import moment from 'moment'
import getWeather from '@/core/getWeather'

export default {
  name: 'Card',
  components: {
    Btn: () => import('@/components/ui-elements/btn'),
    SvgIcon: () => import('@/components/ui-elements/SvgIcon')
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
      currentDate: new Date(),
      date: moment(this.currentDate).fromNow(),
      loader: false
    }
  },
  mounted () {
    setInterval(() => {
      this.updateTime()
    }, 60000)
  },
  methods: {
    updateTime () {
      this.date = moment(this.currentDate).fromNow()
    },
    reloadCard () {
      this.loader = true
      getWeather(this.item.name, resp => {
        this.thisWeather = resp.data
        this.loader = false
        this.currentDate = new Date()
        this.date = moment(this.currentDate).fromNow()
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
  position: relative;
  overflow: hidden;
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
  &__loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__loaderIcon {
    width: 60px;
    height: 60px;
    animation: rotate 1s infinite;
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
