<template>
  <div>
    <label
      class="inputWrapper"
      :class="{
        'inputWrapper--required': required}"
    >
      <span
        v-if="label"
        class="inputWrapper__label"
        :class="{
          'inputWrapper__label--focus': isFocused
        }"
      >
        {{ label }}
      </span>
      <input
        class="inputWrapper__input"
        :value="value"
        @input="onInput($event)"
        @focus="focus"
        @blur="focusout"
      >
    </label>
    <div class="inputWrapper__error" v-if="required">Choose a city</div>
    <div class="inputWrapper__error" v-else-if="unknown">This city does not find</div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'customInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    unknown: {
      type: Boolean,
      default: false
    }
  },
  validations: {
    value: {
      required,
      minLength: minLength(4)
    }
  },
  mounted () {
    if (this.value) {
      this.isFocused = true
    }
  },
  data () {
    return {
      isFocused: false
    }
  },
  methods: {
    focus () {
      this.isFocused = true
    },
    focusout () {
      if (!this.value) {
        this.isFocused = false
      }
    },
    onInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.inputWrapper {
  display: inline-block;
  position: relative;
  border-bottom: 1px solid #1B1B1B;
  width: 100%;

  &--required {
    border-bottom: 1px solid $error;
  }

  &__input {
    padding: 20px 0 12px;
    border: none;
    font-weight: 500;
    font-size: 24px;
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  &__label {
    position: absolute;
    top: 20px;
    color: #C1C1C1;
    font-weight: 500;
    font-size: 24px;
    transition: all 0.25s ease;

    &--focus {
      top: 0;
      font-size: 14px;
    }
  }

  &__error {
    margin-top: 12px;
    color: $error;
  }
}
</style>
