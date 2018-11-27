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
      errored: false,
      form: {},
      token: null
    }
  },
  async mounted() {
    const data = await loadForm(this.formId)

    if (!data.form || !data.token) {
      console.log('Bad configuration received from Howzit')
      this.errored = true
      return
    }

    this.form = data.form
    this.token = data.token
    this.loaded = true
  }
}
</script>
