<template>
  <transition name="fade">
    <div class="modal" v-if="active">
      <div class="modal__layout" @click="close" />
      <div class="modal__content">
        <div class="modal__form">
          <div class="modal__title">Choose a city</div>
          <div class="modal__subtitle">To find city start typing and pick one from the suggestions</div>
          <custom-input
            class="modal__input"
            label="Search City"
            v-model.trim="$v.city.$model"
            :required="!$v.city.required"
          />
        </div>
        <div class="modal__control">
          <div class="modal__control-left">
            <btn :disabled="!$v.city.required" @click="clearInput">Clear</btn>
          </div>
          <div class="modal__control-right">
            <btn class="modal__cancelBtn" @click="close">Cancel</btn>
            <btn
              @click="addCity"
              :disabled="!$v.city.required"
            >Add</btn>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'modal',
  components: {
    customInput: () => import('@/components/ui-elements/customInput'),
    Btn: () => import('@/components/ui-elements/btn')
  },
  data () {
    return {
      city: ''
    }
  },
  validations: {
    city: {
      required
    }
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
      this.clearInput()
    },
    clearInput () {
      this.city = ''
    },
    addCity () {
      this.$emit('addCity', this.city)
      this.city = ''
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  &__layout {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(11, 11, 11, 0.5);
  }
  &__content {
    padding: 24px;
    background: $white;
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.14), 0 6px 30px rgba(0, 0, 0, 0.12), 0 8px 10px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    width: 50%;
    position: absolute;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__title {
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 15px;
  }
  &__subtitle {
    font-size: 24px;
    color: $grey;
  }
  &__input {
    margin-top: 55px;
  }
  &__control {
    display: flex;
    justify-content: space-between;
  }
  &__cancelBtn {
    margin-right: 30px;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
