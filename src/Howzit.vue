<template>
  <div>
    <div v-for="(key, field) in form" :key="key">
      {{ key }}
      {{ field }}
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
export default {
  props: {
    form: {
      type: Array,
      required: true
    }
  }
}
</script>
