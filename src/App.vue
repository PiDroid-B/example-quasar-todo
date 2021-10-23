<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { LocalStorage } from "quasar";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();

    // on récupère les données du localStorage
    const user = LocalStorage.getItem("user");
    const token = LocalStorage.getItem("token");

    // Si utilisateur + token trouvé
    if (user && token) {
      // on crée l'objet data
      const data = {
        user: user,
        access_token: token,
      };

      store.dispatch("auth/setUserAction", data);
    }

    return {};
  },
});
</script>
