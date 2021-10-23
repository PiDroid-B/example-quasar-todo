<template>
<!-- updates: { terminee: !tache.terminee }, si booléen sinon faire comme suit -->
  <q-item
    v-ripple
    clickable
    @click.prevent="
      modifierTacheAction({
        id: tache.id,
        updates: {terminee: tache.terminee === 0 ? 1 : 0}
      })
    "
    :class="tache.terminee ? 'bg-green-2' : 'bg-orange-2'"
  >

    <q-item-section side>
      <!-- class="no-pointer-events" désactive le click -->
      <!-- <q-checkbox
        class="no-pointer-events"
        model-value="tache.terminee"
        :value="tache.terminee"
        @update="
          modifierTacheAction({
            id: tache.id,
            updates: { terminee: !tache.terminee },
          })
        "
      /> -->
      <!-- !!0 donne false et !!1 dans true, la double négation transforme un entier en booléen -->
      <input
        type="checkbox"
        :checked="!!tache.terminee"
        class="no-pointer-events"
      />
      <!-- :value="tache.terminee" -->
      <!-- <q-checkbox v-model="check1" /> -->
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{ 'text-barre': tache.terminee }">{{
        tache.nom
      }}</q-item-label>
    </q-item-section>

    <q-item-section side v-if="tache.dateFin">
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" class="q-mr-xs" size="18px" />
        </div>
        <div class="column content-end">
          <q-item-label caption class="text-right">
            <!-- {{ tache.dateFin }} -->
            {{ dateFinDmy }}
            </q-item-label
          ><q-item-label caption class="text-right">
            <small>{{ tache.heureFin }}</small></q-item-label
          >
        </div>
      </div>
    </q-item-section>
    <q-item-section side>
      <q-btn
        dense
        flat
        round
        color="primary"
        icon="edit"
        @click.stop="afficherFormTache = true"
      />
    </q-item-section>
    <q-item-section side>
      <q-btn
        dense
        flat
        round
        color="negative"
        icon="delete"
        @click.stop="confirmerSuppression(tache.id)"
      />
    </q-item-section>
    <q-dialog v-model="afficherFormTache" persistent>
      <form-tache @fermer="afficherFormTache = false" bouton="Ajouter" :tacheAModifier="tache"
        >Ajouter une tache !</form-tache
      >
    </q-dialog>
  </q-item>
</template>

<script>
// import { mapActions } from "vuex";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import FormTache from "src/components/Taches/Dialogs/FormTache.vue";
import { formatDmy } from "src/functions/dmy";

export default {
  name: "Tache",
  props: {
    tache: {
      type: Object,
      required: true,
    },
  },
  components: {
    FormTache
  },

  setup(props) {
    const store = useStore();
    const q = useQuasar();

    const modifierTacheAction = (monJson) =>
      store.dispatch("taches/modifierTacheAction", monJson);

    const suppressionAction = (id) =>
      store.dispatch("taches/suppressionAction", id);

    const confirmerSuppression = function (id) {
      q.dialog({
        title: "Confirm",
        message: "Would you like to turn on the wifi?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        suppressionAction(id);
      });
    };

    const dateFinDmy = computed(() => formatDmy(props.tache.dateFin));

    let afficherFormTache = ref(false);

    return {
      modifierTacheAction,
      confirmerSuppression,
      afficherFormTache,
      dateFinDmy
    };
  },

  // methods: {
  //   ...mapActions("taches", ["modifierTacheAction", "suppressionAction"]),

  //   confirmerSuppression(id) {
  //     // appel du plugin dialog
  //     this.$q
  //       .dialog({
  //         title: "Confirm",
  //         message: "Would you like to turn on the wifi?",
  //         cancel: true,
  //         persistent: true,
  //       })
  //       .onOk(() => {
  //         this.suppressionAction(id);
  //       });
  //   },
  // },
};
</script>

<style></style>
