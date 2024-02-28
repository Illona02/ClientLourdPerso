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
        name="ville"
        filled
        v-model="ville"
        :options="options_sites"
        emit-value
        map-options
        option-value="id"
        option-label="ville"
        label="Site du salarié"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || error]"
      />

      <q-select
        name="fonction"
        filled
        v-model="fonction"
        :options="options_services"
        emit-value
        map-options
        option-value="id"
        option-label="fonction"
        label="Service du salarié"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || error]"
      />

      <div>
        <q-btn
          @click="Modifier"
          class="full-width q-mt-md bg-cyan-10 text-white"
          >Modifier le salarié</q-btn
        >
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
    const dataApiService = ref();
    const dataApiSite = ref();

    const options_services = dataApiService;
    const options_sites = dataApiSite;

    onMounted(() => {
      if (selectedId) {
        loadData(selectedId);
      }
      loadDataService();
      loadDataSite();
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
          fonction.value = dataApi.value.service_id;
          ville.value = dataApi.value.site_id;
        })
        .catch(() => {
          alert('erreur');
        });
    }

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

    const nom = ref(null);
    const prenom = ref(null);
    const telephone_fixe = ref(null);
    const telephone_portable = ref(null);
    const email = ref(null);

    const fonction = ref(null);
    const ville = ref(null);

    const error = 'Veuillez remplir ce champ';

    return {
      nom,
      prenom,
      telephone_fixe,
      telephone_portable,
      email,
      ville,
      fonction,
      options_services,
      options_sites,
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
