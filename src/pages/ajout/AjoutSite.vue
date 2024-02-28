<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h5>Ajouter un nouveau site</h5>
    <q-form class="q-gutter-md">
      <q-input
        name="ville"
        filled
        v-model="site"
        label="Nouveau site"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || error]"
      />

      <div>
        <q-btn @click="Ajouter" color="primary">Ajouter le salarié</q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { api } from 'boot/axios';

export default {
  setup() {
    const site = ref(null);
    const error = 'Veuillez remplir ce champ';

    return {
      site,
      error,

      Ajouter() {
        api
          .put('/site', {
            ville: site.value,
          })
          .then((response) => {
            console.log("Réponse de l'API :", response.data);
            alert('Site ajouté');
          })
          .catch((error) => {
            console.error(
              "Erreur lors de l'envoi des données à l'API :",
              error
            );
            // Gérez les erreurs d'envoi à l'API
          });
      },
    };
  },
};
</script>
