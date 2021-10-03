<template>
  <main class="weather">
    <div class="container">
      <div class="weather__wrapper">
        <h1 class="weather__title">World Weather</h1>
        <p class="weather__subtitle">Watch weather in your current location</p>
      </div>
      <div class="weather__content" v-if="weatherList.length">
        <div class="weather__later">
          <template
            v-for="(item, i) in weatherList">
            <div class="weather__currentCardWrapper"
                 :key="i"
                 v-if="i === weatherList.length - 1"
            >
              <Card
                class="weather__currentCard"
                :item="item"
                current
                hideRemove
                @removeCard="removeCard"
              />
            </div>
            <Card
              v-else
              :key="i"
              class="weather__card"
              :item="item"
              @removeCard="removeCard"
            />
          </template>
        </div>
      </div>
      <div
        v-else
        class="weather__empty"
      >
        <Btn
          @click="openAddPopup"
        >
          Add your first city
        </Btn>
      </div>
    </div>
    <Modal
      :active="isOpenAddPopup"
      @close="isOpenAddPopup = false"
      @addCity="addCard"
    />
    <btn
      class="weather__addCard"
      filled
      round
      shadow
      @click="openAddPopup"
    >
      <svg-icon
        class="weather__addCardIcon"
        name="plus"
        title="plus"
      />
    </btn>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'weather',
  components: {
    Btn: () => import('@/components/ui-elements/btn'),
    SvgIcon: () => import('@/components/ui-elements/SvgIcon'),
    Card: () => import('@/components/Card'),
    Modal: () => import('@/components/Modal')
  },
  data () {
    return {
      isOpenAddPopup: false,
      weatherList: []
    }
  },
  mounted () {
    if (localStorage.weatherList) {
      let savedCities = localStorage.weatherList
      savedCities = savedCities.split(';')
      savedCities.forEach(elem => {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en&APPID=8852c3ddb393e3e60aa0c159aaa0b762&q=${elem}`)
          .then(resp => {
            this.weatherList.push(resp.data)
          })
      })
    }
  },
  methods: {
    openAddPopup () {
      this.isOpenAddPopup = true
    },
    addCard (city) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en&APPID=8852c3ddb393e3e60aa0c159aaa0b762&q=${city}`)
        .then(resp => {
          this.weatherList.push(resp.data)
          this.isOpenAddPopup = false
          if (localStorage.weatherList) {
            localStorage.weatherList += `${resp.data.name};`
          } else {
            localStorage.weatherList = `${resp.data.name};`
          }
        }).catch(() => {
          this.isOpenAddPopup = true
        })
    },
    removeCard (name) {
      this.weatherList = this.weatherList.filter(item => item.name !== name)
      localStorage.weatherList = localStorage.weatherList.replace(`${name};`, '')
    }
  }
}
</script>

<style lang="scss">
.weather {
  position: relative;

  &__wrapper {
    padding: 25px 0;
    text-align: center;
  }

  &__title {
    font-weight: 300;
    font-size: 70px;
    @include below($tablet) {
      font-size: 50px;
    }
  }

  &__subtitle {
    margin-top: 30px;
    color: $grey;
    @include below($tablet) {
      margin-top: 15px;
    }
  }

  &__addCard {
    position: fixed;
    right: 45px;
    bottom: 35px;
    height: 56px;
    width: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    @include below($tablet) {
      right: 25px;
      bottom: 15px;
      height: 50px;
      width: 50px;
    }
  }

  &__addCardIcon {
    width: 14px;
    height: 14px;
  }

  &__currentCard {
    width: 50%;
    margin: 0 auto;
    @include below($tablet) {
      width: 100%;
      border-bottom: 1px solid rgba(196, 196, 196, 0.5);
      padding-bottom: 20px;
    }
  }

  &__currentCardWrapper {
    width: 100%;
    margin-bottom: 80px;
    order: -1;
  }

  &__later {
    margin: 0 -20px;
    display: flex;
    flex-wrap: wrap;
    @include below($tablet) {
      margin-top: 20px;
    }
  }

  &__card {
    flex: 0 1 calc(25% - 40px);
    margin: 0 20px 40px;
    @include below($notebook) {
      flex: 0 1 calc(50% - 20px);
      margin: 0 10px 20px;
    }
    @include below($mobileLrg) {
      flex: 0 1 100%;
      margin: 0 20px 20px;
    }
  }

  &__empty {
    font-size: 36px;
    text-align: center;
    margin-top: 100px;
  }
}
</style>
