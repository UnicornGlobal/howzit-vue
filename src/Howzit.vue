<template>
  <div class="howzit">
    <div v-if="errored" class="howzit-error">
      ERROR
    </div>
    <div v-else-if="submitted" class="howzit-submitted">
      SUBMITTED
    </div>
    <div v-else-if="loaded" class="howzit-form">
      <p>Contact {{ form.name }}</p>
      <div v-for="(field, key) in form.fields" :key="key">
        <label :for="field.name">{{ field.label }}</label>
        <input :type="field.type" :name="field.name" :required="field.required ? true : false" v-model="field.value" />
      </div>
      <button type="submit" @click="submit">SUBMIT</button>
    </div>
    <div v-else class="howzit-loading">
      LOADING
    </div>
  </div>
</template>

<script>
  import { loadForm, sendForm } from '@/api/howzit'

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
        submitted: false,
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
    },
    methods: {
      async submit() {
        const response = await sendForm(this.form, this.formId)

        if (response.error && response.error === 'Server error') {
          this.errored = true
        }

        if (response.data && response.data === 'OK') {
          this.submitted = true
        }
      }
    }
  }
</script>
