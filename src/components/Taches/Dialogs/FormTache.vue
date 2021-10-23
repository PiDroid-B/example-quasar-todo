<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6"><slot></slot></div>
      <!-- q-space va gérer l'espace à rajouter entre les deux item dans une class "row" -->
      <q-space />
      <!-- v-close-popup ferme l'élément flottant -->
      <q-btn dense flatn round icon="close" v-close-popup />
    </q-card-section>

    <q-form @submit="formSubmit">
      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="tache.nom"
          label="Nom"
          :rules="[(val) => !!val || 'Le nom est obligatoire']"
          autofocus
          clearable
        />
        <!-- attention deux v-model car celui de la saisie manuelle et celui de la popup de selection -->
        <!-- pour le formatage on remplace v-model="tache.dateFin" du q-input par :value de la  -->
        <q-input
          outlined
          clearable
          v-model="dateFinDmy"
          label="Date"
          class="q-mt-sm"
          readonly
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <!-- <q-date v-model="tache.dateFin" mask="DD/MM/YYYY"> -->
                <q-date v-model="tache.dateFin" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          outlined
          clearable
          v-if="tache.dateFin"
          v-model="tache.heureFin"
          label="Heure"
          class="q-mt-sm"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                @before-show="heureTemp = tache.heureFin"
                transition-show="scale"
                transition-hide="scale"
              >
                <!-- 
              rajouter format24h a q-time permet un choix au format 24H
              ou en utilisant le quasar language packs : https://quasar.dev/options/quasar-language-packs


             -->
                <q-time v-model="heureTemp" now-btn>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Annuler" color="primary" flat />
                    <q-btn
                      v-close-popup
                      label="OK"
                      color="primary"
                      flat
                      @click="tache.heureFin = heureTemp"
                    />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Ajouter" color="primary" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { formatDmy } from "src/functions/dmy";

export default {
  name: "FormTache",
  props: {
    bouton: {
      type: String,
      default: "OK",
    },
    tacheAModifier: {
      type: Object,
    },
  },
  emits: ["fermer"],
  setup(props, { emit }) {
    const store = useStore();

    let tache = ref({
      nom: "",
      dateFin: "",
      heureFin: "",
      terminee: 0,
    });
    // pour initialiser l'heure à l'ouverture
    let heureTemp = ref("");

    const formSubmit = function () {
      // attention : toujours passer la valeur d'une ref (source de bug sinon)
      // si la tache a un id alors modif sinon nouveau
      let t = tache.value;
      if (t.id) {
        const payload = {
          id: t.id,
          updates: t,
        };
        store.dispatch("taches/modifierTacheAction", payload);
      } else {
        store.dispatch("taches/ajouterTacheAction", tache.value);
      }
      emit("fermer");
    };

    onMounted(() => {
      if (props.tacheAModifier) {
        // On doit utiliser Object.assign(destination, source) pour faire une copie par valeur
        // En faisant une affectation classique obj1 = obj2, on fait une copie par référence.
        // Dans notre cas, le formulaire ne modifierait pas les valeurs de son propre objet,
        // mais celui du composant parent ce qui est interdit par Vue.
        tache.value = Object.assign({}, props.tacheAModifier);
      }
    });

    const dateFinDmy = computed(() => formatDmy(tache.value.dateFin));

    return {
      tache,
      heureTemp,
      formSubmit,
      dateFinDmy,
    };
  },
};
</script>

<style scoped>
.q-card {
  width: 400px;
  max-width: 80vw;
}
</style>
