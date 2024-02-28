<template>
  <div class="q-pa-md" style="max-width: 50%">
    <h5>Supprimer un service</h5>
    <q-form class="q-gutter-md">
      <q-input
        name="ville"
        filled
        v-model="ville"
        label="Ville"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || error]"
        readonly
      />
    </q-form>
    <q-btn @click="Supprimer" class="full-width q-mt-md bg-cyan-10 text-white"
      >Supprimer le site</q-btn
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
    const ville = ref();
    const dataApi = ref();

    onMounted(() => {
      if (selectedId) {
        loadDataId(selectedId);
      }
    });

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
      fonction,
      error,

      Supprimer() {
        api
          .delete('/site/' + selectedId)
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
