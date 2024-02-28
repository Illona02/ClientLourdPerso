<template>
  <div class="q-pa-md" style="max-width: 50%">
    <h5>Modifier un salarié</h5>
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

      <div>
        <q-btn @click="Modifier" color="primary">Modifier le salarié</q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'boot/axios';

export default {
  setup() {
    const route = useRoute();
    const selectedId = route.query.selectedId;
    const dataApi = ref();

    onMounted(() => {
      if (selectedId) {
        loadData(selectedId);
      }
    });

    function loadData() {
      api
        .get('/salarie/' + selectedId)
        .then((response) => {
          dataApi.value = response.data;
          console.log(dataApi);
          //Integre les données
          nom.value = dataApi.value.nom;
          prenom.value = dataApi.value.prenom;
          telephone_fixe.value = dataApi.value.telephone_fixe;
          telephone_portable.value = dataApi.value.telephone_portable;
          email.value = dataApi.value.email;
          service.value = dataApi.value.service;
          site.value = dataApi.value.site;
        })
        .catch(() => {
          alert('erreur');
        });
    }

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

      Modifier() {
        const nomModif = nom.value;
        const prenomModif = prenom.value;
        const telephone_fixeModif = telephone_fixe.value;
        const telephone_portableModif = telephone_portable.value;
        const emailModif = email.value;

        api
          .put('/salaries', {
            id: selectedId,
            nom: nomModif,
            prenom: prenomModif,
            telephone_fixe: telephone_fixeModif,
            telephone_portable: telephone_portableModif,
            email: emailModif,
          })
          .then(() => {
            alert('Salarié modifié avec succès');
          })
          .catch(() => {
            alert('erreur');
          });
      },
    };
  },
};
</script>
