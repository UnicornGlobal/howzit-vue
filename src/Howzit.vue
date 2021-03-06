<template>
  <div class="howzit">
    <div
      v-if="errored"
      class="howzit-error"
    >
      <p class="howzit-error-body">
        There was a problem submitting your request. Please try again later.
      </p>
    </div>
    <div
      v-else-if="submitted"
      class="howzit-submitted"
    >
      <p class="howzit-success-body">
        Your request has been submitted successfully.
      </p>
    </div>
    <form
      v-else-if="loaded"
      class="howzit-form"
    >
      <p class="howzit-title">
        {{ form.name }}
      </p>
      <div
        v-for="(field, key) in form.fields"
        :key="key"
      >
        <label
          :for="field.name"
          class="howzit-label"
        >{{ field.label }}</label>

        <input
          v-if="field.type !== 'textarea'"
          v-model="field.value"
          v-validate="field.required ? 'required' : ''"
          :class="'howzit-input-' + field.type"
          :type="field.type"
          :name="field.name"
          :required="field.required ? true : false"
        >

        <textarea
          v-else
          v-model="field.value"
          v-validate="field.required ? 'required' : ''"
          :rows="field.rows || 5"
          :class="'howzit-input-' + field.type"
          :type="field.type"
          :name="field.name"
          :required="field.required ? true : false"
        />

        <span
          v-if="errors.has(field.name)"
          class="howzit-validation-error"
        >{{ errors.first(field.name) }}</span>
      </div>
      <div class="howzit-button-area">
        <button
          class="howzit-submit"
          type="submit"
          @click.prevent="submit()"
        >
          SUBMIT
        </button>
      </div>
    </form>
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
        const valid = await this.$validator.validateAll()
        if (!valid) {
          return false
        }

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
