<template>
  <q-layout view="hHh lpr fFf">
    <!-- layout = matrice de 3x3, la case du milieu étant le contenu du site
    la chaine se définit en 11 char (3 entetes, espace, 3 milieu, 3 footer)

    l/h   h/H   r/h
    l/L    p    r/R
    l/f   f/F   r/f

    h ou H : header
    l ou L : left
    r ou R : right
    f ou F : footer

    majuscule = fixe

    lHh Lpr lFf :
      colonne de gauche fixe (car l pour 1er de chaque groupe et L majuscule)
      Header fixe (car h pour 2eme chaque groupe et H majuscule
      pas de colonne à droite car n'est présent qu'au niveau du milieu droit
    -->
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" /> -->

        <!-- helper css de positioning : https://quasar.dev/style/positioning -->
        <q-toolbar-title class="absolute-center"> Todo </q-toolbar-title>
        <q-btn
          v-if="!user"
          to="/connexion"
          flat
          icon-right="account_circle"
          label="Se connecter"
          class="absolute-right"
        />
        <q-btn
          v-else
          @click="deconnecterUtilisateur"
          flat
          icon-right="account_circle"
          label="Se déconnecter"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <!-- 
    breakpoint == disparait en desous de la valeur (767px)
    width == largeur max (250px) 
    -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary"
      :breakpoint="767"
      :width="250"
    >
      <!-- list d'éléments quasar : https://quasar.dev/vue-components/list-and-list-items -->
      <q-list dark>
        <q-item-label header> Menu de navigation </q-item-label>

        <!-- élément d'une liste quasar, +clickable -->
        <!-- to="/" permet de rajouter la destination lors d'un click -->
        <!-- exact permet de surligné si le path est == '/' et non s'il contient '/'. En l'absence "/" sera toujours considéré comme actif car présent dans toutes les routes -->
        <!-- pour to="/params" on rajoute exact aussi afin que les sous-routes de params n'active pas cet item -->
        <!-- <q-item clickable to="/" exact> -->
        <!-- section d'un élément de liste (icone en prefixe) -->
        <!-- <q-item-section avatar> -->
        <!-- icon "list" issue de material design de google : https://material.io/resources/icons/?style=baseline -->
        <!-- <q-icon name="list" /> -->
        <!-- </q-item-section> -->
        <!-- section d'un élément de liste (tache) -->
        <!-- <q-item-section> -->
        <!-- définit le texte -->
        <!-- <q-item-label>Tâche</q-item-label> -->
        <!-- </q-item-section> -->
        <!-- </q-item> -->

        <q-item
          class="text-grey-6"
          v-for="lien in liens"
          :key="lien.id"
          clickable
          :to="lien.route"
          exact
        >
          <q-item-section avatar>
            <q-icon :name="lien.icone" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ lien.libelle }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-footer elevated>
      <q-tabs>
        <q-route-tab
          v-for="lien in liens"
          :key="lien.id"
          :icon="lien.icone"
          :label="lien.libelle"
          :to="lien.route"
          exact
        />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";


export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const store = useStore();

    const leftDrawerOpen = ref(false);

    const liens = [
      { id: 1, libelle: "Tâches", icone: "list", route: "/" },
      { id: 2, libelle: "Paramètres", icone: "settings", route: "/params" },
    ];

    const user = computed(() => store.state.auth.user);

    const deconnecterUtilisateur = function () {
      store.dispatch("auth/deconnecterUtilisateur");
    };

    return {
      leftDrawerOpen,
      // toggleLeftDrawer() {
      //   leftDrawerOpen.value = !leftDrawerOpen.value;
      // },
      liens,
      user,
      deconnecterUtilisateur,
    };
  },
});
</script>

<style scoped lang="scss">
/* Applique les règles de ce bloc uniquement aux écrans >= 768px */
@media screen and (min-width: 768px) {
  /* Cache les éléments avec la classe CSS q-footer */
  .q-footer {
    display: none;
  }
}

/* pour utiliser/modifier des couleurs par "variable" https://quasar.dev/style/color-palette */
/* et définir les couleurs par défaut #primary etc dans src/css/quasar.variables.scss https://quasar.dev/style/theme-builder */

// lien actif du menu latéral, classe css rajouté automatiquement par le composant
.q-drawer {
  .q-router-link--exact-active {
    color: white !important;
  }
}
</style>
