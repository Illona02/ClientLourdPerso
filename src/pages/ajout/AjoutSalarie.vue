<template>
  <div class="q-pa-md" style="max-width: 50%">
    <h5>Ajouter un nouveau salarié</h5>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        name="nom"
        filled
        v-model="nom"
        label="Nom du salarié"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || error]"
      />
      <q-input
        name="prenom"
        filled
        v-model="prenom"
        label="Prénom du salarié"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || error]"
      />
      <q-input
        name="telephone_fixe"
        filled
        v-model="telephone_fixe"
        label="Téléphone fixe du salarié"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || error]"
      />
      <q-input
        name="telephone_portable"
        filled
        v-model="telephone_portable"
        label="Téléphone portable du salarié"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || error]"
      />
      <q-input
        name="email"
        filled
        v-model="email"
        label="Email du salarié"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || error]"
      />
      <q-select
        name="site"
        filled
        v-model="site"
        :options="options"
        label="Site du salarié"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || error]"
      />

      <q-select
        name="service"
        filled
        v-model="service"
        :options="options"
        label="Service du salarié"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || error]"
      />

      <div>
        <q-btn label="Ajouter un salarié" type="submit" color="primary" />
        <q-btn
          label="Réinitialiser"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const nom = ref(null);
    const prenom = ref(null);
    const telephone_fixe = ref(null);
    const telephone_portable = ref(null);
    const email = ref(null);

    const service = ref(null);
    const site = ref(null);

    const error = 'Veuillez remplir ce champ';
    const options = ['Paris'];

    return {
      nom,
      prenom,
      telephone_fixe,
      telephone_portable,
      email,
      site,
      service,
      options,
      error,

      onSubmit() {
        alert('Salarié ajouté');
      },

      onReset() {
        nom.value = null;
        prenom.value = null;
        site.value = null;
        service.value = null;
      },
    };
  },
};

/*
      action="localhost:8080/projet_perso"
      method="post"
       */
</script>
