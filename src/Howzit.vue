<template>
  <div>
    <div v-if="loaded">
      <div v-for="(field, key) in form.fields" :key="key">
        {{ key }}
        {{ field }}
      </div>
    </div>
    <div v-else>
      LOADING
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import { loadForm } from '@/api/howzit'

export default {
  props: {
    formId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loaded: false,
      form: {},
      token: null
    }
  },
  async mounted() {
    const form = await loadForm(this.formId)
    this.form = form
  }
}
</script>
