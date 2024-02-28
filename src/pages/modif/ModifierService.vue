<template>
  <div class="q-pa-md" style="max-width: 50%">
    <h5>Modifier un service</h5>
    <q-form class="q-gutter-md">
      <q-input
        name="fonction"
        filled
        v-model="fonction"
        label="Fonction"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || error]"
      />
    </q-form>
    <q-btn @click="Modifier" color="primary">Modifier le service</q-btn>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const selectedId = route.query.selectedId;
    const fonction = ref();
    const dataApi = ref();

    onMounted(() => {
      if (selectedId) {
        loadDataId(selectedId);
      }
    });

    const error = 'Veuillez remplir ce champ';

    function loadDataId() {
      api
        .get('/services/{id}?id=' + selectedId)
        .then((response) => {
          dataApi.value = response.data;
          fonction.value = dataApi.value.fonction;
        })
        .catch(() => {
          alert('erreur');
        });
    }

    return {
      fonction,
      error,

      Modifier() {
        const fonctionModifiée = fonction.value;

        api
          .put('/services', {
            id: selectedId,
            fonction: fonctionModifiée,
          })
          .then(() => {
            alert('Service modifié avec succès');
          })
          .catch(() => {
            alert('erreur');
          });
      },
    };
  },
};
</script>
