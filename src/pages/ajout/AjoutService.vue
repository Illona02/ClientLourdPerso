<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h5>Ajouter un nouveau service</h5>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        name="nomService"
        filled
        v-model="service"
        label="Nouveau service"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || error]"
      />

      <div>
        <q-btn label="Ajouter un service" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const service = ref(null);
    const error = 'Veuillez remplir ce champ';

    return {
      service,
      error,

      onSubmit() {
        alert('Service ajouté');
      },
    };
  },
};
/*
      action="localhost:8080/projet_perso"
      method="post"
      */
</script>
