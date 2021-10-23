// déjà implémenté par le q-input + <q-date v-model="tache.dateFin" mask="DD/MM/YYYY"> 

/*
Pourrait être appelé comme ceci

import { formatDmy } from "src/functions/dmy";

const dateFinDmy = computed(() => formatDmy(tache.value.dateFin));
*/

import { date } from "quasar";

export function formatDmy(value) {
  console.log("formatDmy", value)
  if (date.isValid(value)) {
    const dateLocale = new Date(value);
    return date.formatDate(dateLocale, "DD/MM/YY");
  }
  // si date invalide on retour la valeur sans modification
  return value;
}
