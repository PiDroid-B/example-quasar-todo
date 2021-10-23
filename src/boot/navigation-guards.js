import { LocalStorage } from "quasar";
import { afficherMessageErreur } from "src/functions/message-erreur";

// Récupère l'objet router représentant Vue router
export default ({ router }) => {
  // Avant de rediriger le visiteur
  router.beforeEach((to, from, next) => {
    const user = LocalStorage.getItem("user");
    // Si n'est pas connecté et ne va pas vers connexion alors on froce la redirection vers connexion
    if (!user && to.path !== "/connexion") {
      // Affiche un message d'erreur uniquement si utilisateur tente d'accéder
      // à une autre page après avoir été redirigé vers connexion une première fois
      if (from.path === "/connexion") {
        afficherMessageErreur("Page protégée, connexion requise !");
      }
      next("/connexion"); // Redirige vers connexion
    } else {
      next(); // continue la navigation normalement
    }
  });
};
