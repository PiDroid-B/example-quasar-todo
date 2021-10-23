<template>
  <q-form @submit.prevent="submitForm">
    <q-input
      outlined
      v-model="form.email"
      label="E-mail"
      class="q-my-md"
      :rules="[(val) => validateEmail(val) || 'Email invalide']"
      lazy-rules
    />
    <q-input
      outlined
      v-model="form.password"
      label="Mot de passe"
      class="q-my-md"
      :rules="[(val) => val.length >= 4 || 'Minimum de 4 caractères']"
      lazy-rules
    />
    <q-btn type="submit" colo="primary" label="Se connecter" />
  </q-form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "ConnexionForm",
  setup() {
    const store = useStore();

    const form = ref({
      email: "",
      password: "",
    });

    const submitForm = function () {
      store.dispatch("auth/connecterUtilisateur", form.value);
    };

    const validateEmail = function (email) {
      // Source : https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    return {
      form,
      submitForm,
      validateEmail,
    };
  },
};
</script>

<style></style>
