import { Dialog } from "quasar";

export function afficherMessageErreur(message, erreurs) {
    // si un tableau d'erreur est envoyé, on crée une liste ul avec les erreurs
    if (Array.isArray(erreurs) && erreurs.length) {
        message += "<ul><li>" + erreurs.join("</li><li>") + "</li></ul>"
    }
    // créé et affiche la boite de dialogue
    Dialog.create({
        title: "Erreur",
        message: message,
        html: true // HTML utilisable dans le message
    })
}