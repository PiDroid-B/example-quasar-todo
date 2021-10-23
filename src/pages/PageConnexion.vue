<template>
  <q-page padding>
    <q-card class="connexion">
      <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="connexion" label="Se connecter" />
        <q-tab name="enregistrement" label="Créer un compte" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="connexion">
          <connexion-form />
        </q-tab-panel>
        <q-tab-panel name="enregistrement">
          <enregistrement-form />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
import ConnexionForm from "src/components/Connexion/ConnexionForm.vue";
import EnregistrementForm from "src/components/Connexion/EnregistrementForm.vue";

export default {
  name: "PageConnexion",
  components: {
    ConnexionForm,
    EnregistrementForm,
  },
  setup() {
    const tab = ref("connexion");

    return {
      tab,
    };
  },
};
</script>

<style scoped>
.connexion {
  max-width: 500px;
  width: auto;
  margin: 0 auto;
}
</style>
