<template>
  <div class="contact-form">
    <p>
      Contact us at
      <a class="trsc-link" href="https://trsc.org" target="_blank">
        The Transnational Red Sea
      </a>
    </p>
    <q-form @submit="onSubmit">
      <q-input v-model="name" filled label="Name" class="q-pa-md" required />
      <q-input
        v-model="email"
        filled
        label="Email"
        type="email"
        class="q-pa-md"
        required
      />
      <q-input
        v-model="message"
        filled
        label="Message"
        type="textarea"
        class="q-pa-md"
        required
      />
      <div class="button-container q-pl-md q-pr-md">
        <q-btn type="submit" label="Send" color="primary" @click="sendEmail" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');

function onSubmit() {
  // Handle form submission
  console.log('Form submitted:', {
    name: name.value,
    email: email.value,
    message: message.value,
  });
}

function sendEmail() {
  const subject = encodeURIComponent(`Message from ${name.value}`);
  const body = encodeURIComponent(
    `Name: ${name.value}\nEmail: ${email.value}\n\nMessage:\n${message.value}`
  );
  window.location.href = `mailto:contact@trsc.org?subject=${subject}&body=${body}`;
}
</script>

<style scoped>
.trsc-link {
  color: red;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
  &:visited {
    color: red;
  }
  &:active {
    color: red;
  }
}
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form p {
  text-align: center;
}

.contact-form q-input {
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}
</style>
