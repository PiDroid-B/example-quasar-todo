// Données du magasin
const state = {

}


// retourne les données du magasin
// fonctionne comme des propriétés calculées (restituer mais aussi calculer, trier, filtrer, formater...)
const getters = {}


// Méthodes qui manipulent les données (synchrone)
const mutations = {
  }
  
// Méthodes qui font appel aux mutations (peuvent être async)
const actions = {
}

// Exporte les constantes et varialbes du fichier (peut être ainsi importer dans un autre js)
// namespace : true, ajout un namespace à notre objet retourné
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
