<template>
  <q-pull-to-refresh @refresh="refresh">
    <h1>PageTache</h1>
    <!-- spinner -->

    <div v-if="!tachesChargees" class="q-pa-lg text-center">
      <q-spinner-radio color="primary" size="4em" />
    </div>

    <!-- list des taches -->
    <q-list v-if="taches.length && tachesChargees" separator bordered>
      <!-- v-ripple effet visuel sur click -->
      <tache v-for="tache in taches" :key="tache.id" :tache="tache"></tache>
    </q-list>
  </q-pull-to-refresh>
  <q-page-sticky position="bottom" class="q-mb-lg">
    <q-btn fab icon="add" color="primary" @click="afficherFormTache = true" />
  </q-page-sticky>
  <!-- persistent == ne se ferme pas si on click à coté -->
  <q-dialog v-model="afficherFormTache" persistent>
    <form-tache @fermer="afficherFormTache = false" bouton="Ajouter"
      >Ajouter une tache !</form-tache
    >
  </q-dialog>
</template>

<script>
import Tache from "src/components/Tache.vue";
import FormTache from "src/components/Taches/Dialogs/FormTache.vue";
import { ref, computed } from "vue";
// import { defineComponent, ref } from "vue";
// import { mapGetters } from "vuex";
import { useStore } from "vuex";

// export default defineComponent({          >>> typescript
export default {
  name: "Taches",
  components: {
    Tache,
    FormTache,
  },
  setup() {
    // let taches = ref([
    //   {
    //     id: 1,
    //     nom: "Acheter des oranges",
    //     terminee: false,
    //     dateFin: "06.06.2020",
    //     heureFin: "12:00",
    //   },
    //   {
    //     id: 2,
    //     nom: "Manger des oranges",
    //     terminee: false,
    //     dateFin: "15.06.2020",
    //     heureFin: "22:00",
    //   },
    //   {
    //     id: 3,
    //     nom: "Digérer des oranges",
    //     terminee: false,
    //     dateFin: "16.06.2020",
    //     heureFin: "14:00",
    //   },
    // ]);

    const store = useStore();

    const taches = computed(() => store.getters["taches/tachesAll"]);

    const tachesChargees = computed(() => store.state.taches.tachesChargees);

    // done is the callback of q-pull-to-refresh to notify the loading is done
    const refresh = function (done) {
      store.dispatch("taches/getTachesApi");
      done(); // required to remove the according spinner
    };

    let afficherFormTache = ref(false);

    return {
      // taches,
      afficherFormTache,
      taches,
      tachesChargees,
      refresh,

      // taches: computed(() => store.getters.taches),
    };
  },
  // computed: {
  //   ...mapGetters("taches", ["taches"]),
  //   // taches() {
  //   //   return this.$store.getters['taches/taches']
  //   // }
  // },

  // });
};
</script>

<style>
.text-barre {
  text-decoration: line-through;
}
</style>
