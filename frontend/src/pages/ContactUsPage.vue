<template>
  <div class="contact-form">
    <p>
      {{ t('contact.intro') }}
      <a class="trsc-link" href="https://trsc.org" target="_blank">
        {{ t('contact.linkText') }}
      </a>
    </p>
    <q-form @submit="onSubmit">
      <q-input v-model="name" filled :label="t('contact.form.name')" class="q-pa-md" required />
      <q-input
        v-model="email"
        filled
        :label="t('contact.form.email')"
        type="email"
        class="q-pa-md"
        required
      />
      <q-input
        v-model="message"
        filled
        :label="t('contact.form.message')"
        type="textarea"
        class="q-pa-md"
        required
      />
      <div class="button-container q-pl-md q-pr-md">
        <q-btn type="submit" :label="t('contact.form.send')" color="primary" @click="sendEmail" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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

<i18n lang="yaml">
en:
  contact:
    intro: "Contact us at "
    linkText: "The Transnational Red Sea"
    form:
      name: "Name"
      email: "Email"
      message: "Message"
      send: "Send"
fr:
  contact:
    intro: "Contactez-nous à "
    linkText: "Le Centre Transnational de la Mer Rouge"
    form:
      name: "Nom"
      email: "E-mail"
      message: "Message"
      send: "Envoyer"
ar:
  contact:
    intro: "اتصل بنا على "
    linkText: "المركز العابر للحدود لبحر الأحمر"
    form:
      name: "الاسم"
      email: "البريد الإلكتروني"
      message: "الرسالة"
      send: "إرسال"
</i18n>

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
