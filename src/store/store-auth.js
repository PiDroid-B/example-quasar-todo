import { api } from "boot/axios";
import { afficherMessageErreur } from "src/functions/message-erreur";
import { Loading, LocalStorage } from "quasar";

// Données du magasin
const state = {
  user: null,
  token: null,
};

// retourne les données du magasin
// fonctionne comme des propriétés calculées (restituer mais aussi calculer, trier, filtrer, formater...)
const getters = {};

// Méthodes qui manipulent les données (synchrone)
const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
};

// Méthodes qui font appel aux mutations (peuvent être async)
const actions = {
  enregistrerUtilisateur({ commit, dispatch }, payload) {
    Loading.show();
    api
      .post("/register", payload)
      .then(function (response) {
        console.log("CREATION OK", response);
        dispatch("setUserAction", response.data);
        Loading.hide();
      })
      .catch(function (error) {
        console.log(error.response);
        Loading.hide();
        afficherMessageErreur(
          "création du compote impossible !",
          Object.values(error.response.data)
        );
        throw error; // on lève une exception
      });
  },
  connecterUtilisateur({ commit, dispatch }, payload) {
    Loading.show();
    api
      .post("/login", payload)
      .then(function (response) {
        console.log("AUTH connexion ok", response);
        dispatch("setUserAction", response.data);
        Loading.hide();
      })
      .catch(function (error) {
        console.log(error.response);
        Loading.hide();
        afficherMessageErreur(
          "connexion impossible !",
          Object.values(error.response.data)
        );
        throw error; // on lève une exception
      });
    // dispatch("setUserAction", response.data);
    // Loading.hide();
  },
  deconnecterUtilisateur({ commit, state, dispatch }) {
    Loading.show();

    // on récupère this avant de rentrer dans api (car limité à ce scope)
    const that = this;
    //configuration du header avec token
    const config = {
      headers: { Authorization: "Bearer " + state.token },
    };
    // déconnexion
    api
      .post("/logout", {}, config)
      .catch(function (error) {
        afficherMessageErreur("Erreur lors de la déconnexion");
        throw error;
      })
      .finally(function () {
        // Réinitialise user et token
        commit("setUser", null);
        commit("setToken", null);
        // purge du localStorage
        LocalStorage.clear();
        // vie la liste des taches
        dispatch("taches/viderTaches", null, { root: true });
        // redirige vers la page de connexion
        that.$router.push("/connexion");
        Loading.hide();
        console.log("AUTH deconnexion ok");
      });
  },

  setUserAction({ commit, dispatch, state }, data) {
    console.log("AUTH setUserAction ", data)
    // stockage dans le state
    commit("setUser", data.user);
    commit("setToken", data.access_token);
    // stockage en local
    LocalStorage.set("user", state.user);
    LocalStorage.set("token", state.token);
    // récupération des taches via api
    dispatch("taches/getTachesApi", null, { root: true });
    this.$router.push("/");
  },
};

// Exporte les constantes et varialbes du fichier (peut être ainsi importer dans un autre js)
// namespace : true, ajout un namespace à notre objet retourné
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
