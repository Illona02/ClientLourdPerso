<template>
  <div class="q-pa-md" style="max-width: 50%">
    <h5>Ajouter un nouveau salarié</h5>
    <q-form class="q-gutter-md">
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
    </q-form>
    <q-btn @click="Ajouter" class="full-width q-mt-md bg-cyan-10 text-white"
      >Ajouter le salarié</q-btn
    >
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';

export default {
  setup() {
    const dataApiService = ref();
    const dataApiSite = ref();

    const nom = ref(null);
    const prenom = ref(null);
    const telephone_fixe = ref(null);
    const telephone_portable = ref(null);
    const email = ref(null);

    const service = ref(null);
    const site = ref(null);

    const error = 'Veuillez remplir ce champ';
    const options = [dataApiService.value];

    onMounted(() => {
      loadDataService();
      loadDataSite();
    });

    function loadDataService() {
      api
        .get('/services')
        .then((response) => {
          dataApiService.value = response.data;
          console.log(dataApiService);
        })
        .catch(() => {
          alert('erreur');
        });
    }

    function loadDataSite() {
      api
        .get('/site')
        .then((response) => {
          dataApiSite.value = response.data;
          console.log(dataApiSite);
        })
        .catch(() => {
          alert('erreur');
        });
    }

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

      Ajouter() {
        api
          .put('/salaries', {
            nom: nom.value,
            prenom: prenom.value,
            telephone_fixe: telephone_fixe.value,
            telephone_portable: telephone_portable.value,
            email: email.value,
          })
          .then((response) => {
            console.log("Réponse de l'API :", response.data);
            alert('Salarié ajouté');
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
