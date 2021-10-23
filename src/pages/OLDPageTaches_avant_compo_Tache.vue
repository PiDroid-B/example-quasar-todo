<template>
  <h1>PageTache</h1>

  <q-list separator bordered>
    <!-- v-ripple effet visuel sur click -->
    <q-item
      v-ripple
      clickable
      v-for="tache in taches"
      :key="tache.id"
      @click.prevent="tache.terminee = !tache.terminee"
      :class="tache.terminee ? 'bg-green-2' : 'bg-orange-2'"
    >
      <q-item-section side>
        <q-checkbox v-model="tache.terminee" />
        <!-- <q-checkbox v-model="check1" /> -->
      </q-item-section>
      <q-item-section>
        <q-item-label :class="{ 'text-barre': tache.terminee }">{{
          tache.nom
        }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <div class="row">
          <div class="column justify-center">
            <q-icon name="event" class="q-mr-xs" size="18px" />
          </div>
          <div class="column content-end">
            <q-item-label caption class="text-right">{{
              tache.dateFin
            }}</q-item-label
            ><q-item-label caption class="text-right">
              <small>{{ tache.heureFin }}</small></q-item-label
            >
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "Taches",

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

    return {
      // taches,
    };
  },
  computed: {
    ...mapGetters("taches", ["taches"])
    // taches() {
    //   return this.$store.getters['taches/taches']
    // }
  }
});
</script>

<style>
.text-barre {
  text-decoration: line-through;
}
</style>
