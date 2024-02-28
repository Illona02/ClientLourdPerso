<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h5>Ajouter un nouveau service</h5>
    <q-form class="q-gutter-md">
      <q-input
        name="fonction"
        filled
        v-model="service"
        label="Nouveau service"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || error]"
      />

      <div>
        <q-btn @click="Ajouter" class="full-width q-mt-md bg-cyan-10 text-white"
          >Ajouter le service</q-btn
        >
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { api } from 'boot/axios';

export default {
  setup() {
    const service = ref(null);
    const error = 'Veuillez remplir ce champ';

    return {
      service,
      error,

      Ajouter() {
        api
          .put('/services', {
            fonction: service.value,
          })
          .then((response) => {
            console.log("Réponse de l'API :", response.data);
            alert('Service ajouté');
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
/*
      action="localhost:8080/projet_perso"
      method="post"
      */
</script>
