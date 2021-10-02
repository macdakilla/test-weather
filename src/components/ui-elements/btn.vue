<template>
  <a :href="url"
     class="btn"
     :class="{
        'btn--round': round,
        'btn--filled': filled,
        'btn--shadow': shadow,
        'btn--disabled': disabled,
     }"
     @click.prevent="onClick($event)"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'btn',
  props: {
    url: {
      type: String,
      default: ''
    },
    round: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick (event) {
      if (!this.disabled) { this.$emit('click', event) }
    }
  }
}
</script>

<style lang="scss">
.btn {
  color: $current;
  text-align: center;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 700;
  &--filled {
    background: $current;
    color: $white;
  }
  &--round {
    border-radius: 50%;
  }
  &--shadow {
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
  &--disabled {
    color: #C1C1C1;
    cursor: default;
  }
}
</style>
