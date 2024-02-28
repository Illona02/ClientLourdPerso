<template>
  <div class="q-pa-md" style="max-width: 50%">
    <h5>Modifier un site</h5>
    <q-form class="q-gutter-md">
      <q-input
        name="ville"
        filled
        v-model="ville"
        label="Ville"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || error]"
      />
    </q-form>
    <q-btn @click="Modifier" class="full-width q-mt-md bg-cyan-10 text-white"
      >Modifier le site</q-btn
    >
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
    const dataApi = ref();

    onMounted(() => {
      if (selectedId) {
        loadDataId(selectedId);
      }
    });

    const ville = ref();
    const error = 'Veuillez remplir ce champ';

    function loadDataId() {
      api
        .get('/site/{id}?id=' + selectedId)
        .then((response) => {
          dataApi.value = response.data;
          ville.value = dataApi.value.ville;
        })
        .catch(() => {
          alert('erreur');
        });
    }

    return {
      ville,
      error,

      Modifier() {
        const villeModifiée = ville.value;

        api
          .put('/site', {
            id: selectedId,
            ville: villeModifiée,
          })
          .then(() => {
            alert('Site modifié avec succès');
          })
          .catch(() => {
            alert('erreur');
          });
      },
    };
  },
};
</script>
