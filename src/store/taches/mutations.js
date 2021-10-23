/*
export function someMutation (state) {
}
*/
// import { taches } from "./getters"

/*
state : état du magasin
payload : objet contenant toutes les données de l'opération à effectuer.
{
    id:3, // id de l'objet à modifier
    updates: { // action, ici mise à jour
        // liste des propriété modifiées avec valeur
        terminee: true
    }
}
*/
export function modifierTacheMutation(state, payload) {
  // Recherche la tâche et retourne sa position dans le tableau, son index
  const index = state.taches.findIndex((t) => t.id === payload.id);

  // Si une tâche a été trouvée
  if (index !== -1) {
    // On modifie l'objet trouvé avec les nouvelles valeurs
    Object.assign(state.taches[index], payload.updates);
  }
  console.log("MUTATIONS modifierTacheMutation", payload);
}

export function suppressionMutation(state, id) {
  state.taches = state.taches.filter((t) => t.id != id);
}

export function ajouterTacheMutation(state, tache) {
  state.taches.push(tache);
}

export function setTaches(state, taches) {
  state.taches = taches;
}

export function setTachesChargees(state, valeur) {
  state.tachesChargees = valeur;
}
