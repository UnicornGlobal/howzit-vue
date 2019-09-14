<template>
  <div class="howzit">
    <div
      v-if="errored"
      class="howzit-error"
    >
      ERROR
    </div>
    <div
      v-else-if="submitted"
      class="howzit-submitted"
    >
      SUBMITTED
    </div>
    <div
      v-else-if="loaded"
      class="howzit-form"
    >
      <p>Contact {{ form.name }}</p>
      <div
        v-for="(field, key) in form.fields"
        :key="key"
      >
        <label :for="field.name">{{ field.label }}</label>
        <input
          v-model="field.value"
          :type="field.type"
          :name="field.name"
          :required="field.required ? true : false"
        >
      </div>
      <button
        type="submit"
        @click="submit"
      >
        SUBMIT
      </button>
    </div>
    <div
      v-else
      class="howzit-loading"
    >
      LOADING
    </div>
  </div>
</template>

<script>
  import { loadForm, sendForm } from '@/api/howzit'
  import { configure } from '@/api/driver'

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
    async created() {
      configure(this.$howzit)
      const response = await loadForm(this.formId)

      if (!response.data || !response.data.form || !response.data.token) {
        console.error('Bad configuration received from Howzit')
        this.errored = true
        return
      }

      this.form = response.data.form
      this.token = response.data.token
      this.loaded = true
    },
    methods: {
      async submit() {
        let submission = {
          token: this.token
        }

        for (let field in this.form.fields) {
          submission = {
            ...submission,
            [this.form.fields[field].name]: this.form.fields[field].value
          }
        }

        const response = await sendForm(submission, this.formId)

        if (response && response.data && response.data.success  === true) {
          this.submitted = true
          return
        }

        this.errored = true
      }
    }
  }
</script>
