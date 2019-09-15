# howzit-vue

A Vue widget for Howzit contact forms.

## Howzit

There is a standalone server component available at UnicornGlobal/howzit
that you can host yourself.

You may use this to quickly create a contact form service.

You can also create your own service as long as it complies with the
standards outlined below.

Alternatively you can contact Unicorn Global if you are interested in a
managed cloud based solution should you not wish to set it up yourself.

Howzit Docs: https://docs.howzit.tech

## Usage

### Install

`npm install --save @unicorns/howzit-vue`

### Usage

#### Client

App ID is if your API is based on `UnicornGlobal/strong-lumen` or uses
an App ID header for additional security.

You can also add a debugToken to unlock additional debugging information
in staging / development environments (strong-lumen feature).

The below example will:

- GET form configuration from `https://localhost:9000/public/forms/contact`
- POST to `https://localhost:9000/public/forms/contact/submit`

Set things up first in main.js or similar:

```javascript
import Howzit from 'howzit-vue'

Vue.use(Howzit, {
  url: 'https://localhost:9000/public/forms',
  appId: 'xxx'
})
```

Then use it in a Vue component

```vue
<template>
  <howzit :form-id="formId" />
</template>

<script>
  import Howzit from 'howzit-vue'

  export default {
    components: {
      Howzit
    },
    data() {
      return {
        formId: 'contact'
      }
    }
  }
</script>
```

The configuration endpoint is created like:

`GET [url]/[formId]`

The submission endpoint is created like:

`POST [url]/[formId]/submit`

The last part of the submission route is always 'submit'

#### Server

If you don't want to use the UnicornGlobal/howzit self hosted service
or the SaaS solution then you can roll your own server implementation
using the following setup.

The server should return an object like this on the GET [url]/[formId] route.

The following example will render a form with an email input and a
textbox for a message.

```json
{
  'form': {
    'name': 'Awesome Contact Form',
    'fields': [
      {
        'name': 'email',
        'label': 'Email Address',
        'type': 'email',
        'min_length': 7,
        'max_length': 56,
        'regex': null,
        'required': 1,
        'order_index': 2
      },
      {
        'name': 'message',
        'label': 'Message',
        'type': 'text',
        'min_length': 10,
        'max_length': 512,
        'regex': null,
        'required': 1,
        'order_index': 3
      }
    ]
  },
  'token': 'c089871c-af8d-435c-98ca-41d66d116bca'
}
```

The `token` must be sent in the response from the server will be sent
back to the server on form submission.

This should be used to verify the authenticity of the form submission. It
is like a CSRF token.

It is recommended that this token be single-use only and that it gets
invalidated after it's been used one.

## Development

`npm run test`
`npm run build`

## Note

This is a _naked component_.

There are _no styles_ and _no style scoping_ it is 100% up to the host
application to style the form that is rendered.

The component that includes the form should set the following styles:

- `div.howzit`
- `p.howzit-title`
- `form.howzit-form`
- `label.howzit-label`
- `input.howzit-input-[type]` (where `type` is the value of field.type)
- `span.howzit-validation-error`
- `button.howzit-submit`
- `div.howzit-loading`
- `div.howzit-error`
- `div.howzit-submitted`

## Version History

v2.0.0 is not backwards compatible with v1.x

Upgrading to v2 requires changes to your host application.

If you are unable to make these changes then it is suggested
that you remain on v1.x until you are able to do so.
