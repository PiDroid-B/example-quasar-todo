import { Loading } from "quasar";
import { api } from "src/boot/axios";
import { afficherMessageErreur } from "src/functions/message-erreur";

// export function modifierTacheAction(context, payload) {
//   context.commit
export function modifierTacheAction({ commit, rootState }, payload) {
  console.log("ACTION modifierTacheAction", payload);
  // Loading.show() affiche un spinner (attente visuelle)
  Loading.show();
  const config = {
    headers: { Authorization: "Bearer " + rootState.auth.token },
  };

  api
    .put("/taches/" + payload.id, payload.updates, config)
    .then(function (response) {
      // Afffecte au payload les données retournée par l'API
      payload.updates = response.data;
      commit("modifierTacheMutation", payload);
    })
    .catch(function (error) {
      afficherMessageErreur(
        "Modification de tâche impossible !",
        Object.values(error.response.data)
      );
      throw error;
    })
    .finally(Loading.hide());

  // commit("modifierTacheMutation", payload);
  // //   alert("Tache modifiée !");
}

export function suppressionAction({ commit, rootState }, id) {
  console.log("ACTION suppressionAction");
  // Loading.show() affiche un spinner (attente visuelle)
  Loading.show();
  const config = {
    headers: { Authorization: "Bearer " + rootState.auth.token },
  };

  api
    .delete("/taches/" + id, config)
    .then(function (response) {
      // Afffecte au payload les données retournée par l'API
      commit("suppressionMutation", id);
    })
    .catch(function (error) {
      afficherMessageErreur(
        "Suppression de tâche impossible !",
        Object.values(error.response.data)
      );
      throw error;
    })
    .finally(Loading.hide());
  
  // commit("suppressionMutation", id);
}

export function ajouterTacheAction({ commit, rootState }, tache) {
  console.log(
    "ACTION ajouterTacheAction taches (taches, nv tache)",
    rootState.taches.taches,
    tache
  );
  // Loading.show() affiche un spinner (attente visuelle)
  Loading.show();
  const config = {
    headers: { Authorization: "Bearer " + rootState.auth.token },
  };

  api
    .post("/taches", tache, config)
    .then(function (response) {
      commit("ajouterTacheMutation", response.data);
    })
    .catch(function (error) {
      afficherMessageErreur(
        "Création tâche impossible",
        Object.values(error.response.data)
      );
      throw error;
    })
    .finally(Loading.hide());

  // // sans appel à l'api
  // let uId = 1;
  // // si le tableau contient des éléments
  // if (state.taches.length) {
  //   // récupère id max et lui ajoute 1
  //   uId = Math.max(...state.taches.map((tache) => tache.id)) + 1;
  // }

  // // on affecte le nouvel id à la tache
  // tache.id = uId;
  // // et on pousse vers mutation
  // commit("ajouterTacheMutation", tache);
}

export function getTachesApi({ commit, rootState }) {
  commit("setTachesChargees", false);
  const config = {
    headers: { Authorization: "Bearer " + rootState.auth.token },
  };
  api
    .get("/taches", config)
    .then(function (response) {
      console.log("ACTION getTachesApi response", response);
      // timeout sleep timer pour tester (attend 3000 ms avant d'exécuter le code)
      // setTimeout(() => {
      commit("setTaches", response.data);
      commit("setTachesChargees", true);
      console.log("ACTION getTachesApi OK", response.data);
      // },3000);
    })
    .catch(function (error) {
      afficherMessageErreur("Erreur lors de la récupération des tâches !");
      throw error;
    });
}

export function viderTaches({ commit }) {
  commit("setTaches", []);
  commit("setTachesChargees", false);
}
