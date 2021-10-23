<template>
  <q-form @submit.prevent="submitForm">
    <q-input
      outlined
      v-model="form.name"
      label="Nom d'utilisateur"
      class="q-my-md"
      :rules="[(val) => val.length >= 4 || 'Minimum de 4 caractères']"
    />
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
    <q-input
      outlined
      v-model="form.password_confirmation"
      label="Confirmer mot de passe"
      class="q-my-md"
      :rules="[ (val) => val === form.password || 'Les mots de passe sont différents']"
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
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    const submitForm = function () {
      store.dispatch("auth/enregistrerUtilisateur", form.value);
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
