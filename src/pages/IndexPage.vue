<template>
  <div
    class="q-pa-md"
    style="display: grid; grid-template-columns: 20% 1fr; grid-column-gap: 20px"
  >
    <!-- Carte -->
    <div>
      <q-card>
        <q-card-section>
          <q-input v-model="rechercheSalaries" label="Recherche par salarié" />

          <q-select
            v-model="selectedSite"
            :options="options_sites"
            emit-value
            map-options
            option-value="id"
            option-label="ville"
            label="Recherche par site"
          />

          <q-select
            v-model="selectedService"
            :options="options_services"
            emit-value
            map-options
            option-value="id"
            option-label="fonction"
            label="Recherche par service"
          />
          <br />

          <q-btn type="reset" @click="Reinitialiser">Réinitialiser</q-btn>
          <br />
        </q-card-section>
      </q-card>
    </div>

    <!-- Tableau -->
    <div>
      <q-table
        title="Salariés"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :pagination="pagination"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { api } from 'boot/axios';

onMounted(() => {
  loadData();
  loadDataService();
  loadDataSite();
});

const dataApiService = ref();
const dataApiSite = ref();
const rechercheSalaries = ref('');
const selectedSite = ref([]);
const selectedService = ref([]);
const idService = ref(null);
const idSite = ref(null);
const dataApi = ref();

async function loadData() {
  try {
    const response = await api.get('/all', {
      params: {
        nom: rechercheSalaries.value,
        service: idService.value,
        site: idSite.value,
      },
    });
    dataApi.value = response.data;
    console.log(dataApi);
  } catch (error) {
    console.log('Erreur :', error);
  }
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

watch(rechercheSalaries, () => {
  loadData();
});

watch(selectedSite, () => {
  idSite.value = selectedSite.value === null ? null : selectedSite.value;
  loadData();
});

watch(selectedService, () => {
  idService.value =
    selectedService.value === null ? null : selectedService.value;
  loadData();
});

const pagination = {
  rowsPerPage: 10,
};

const options_services = dataApiService;
const options_sites = dataApiSite;

const columns = [
  {
    name: 'nom',
    required: true,
    label: 'Nom',
    align: 'left',
    field: (row) => row.nom,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'prenom',
    required: true,
    label: 'Prenom',
    align: 'left',
    field: 'prenom',
    sortable: true,
  },
  {
    name: 'telephoneFixe',
    required: true,
    label: 'Téléphone Fixe',
    align: 'left',
    field: 'telephoneFixe',
    sortable: true,
  },
  {
    name: 'telephonePortable',
    required: true,
    label: 'Téléphone Portable',
    align: 'left',
    field: 'telephonePortable',
    sortable: true,
  },
  {
    name: 'email',
    required: true,
    label: 'Email',
    align: 'left',
    field: 'email',
    sortable: true,
  },
  {
    name: 'ville',
    align: 'center',
    label: 'Site',

    field: 'ville',
    sortable: true,
  },
  { name: 'fonction', label: 'Service', field: 'fonction', sortable: true },
];

const rows = dataApi;
/*
const rows = computed(() => {
  /*
  if (filtreSites.value.length > 0) {
    return dataApi.value.filter((row) => row.site === filtreSites.value);
  }

  if (filtreServices.value.length > 0) {
    return dataApi.value.filter((row) => row.service === filtreServices.value);
  }
  

  if (rechercheSalaries.value != '') {
    const recherche = rechercheSalaries.value.toLowerCase(); // Convertir en minuscules

    return dataApi.value.filter((row) =>
      row.nom.toLowerCase().startsWith(recherche)
    );
  }

  return dataApi;
});
*/

function Reinitialiser() {
  selectedService.value = null;
  selectedSite.value = null;
  rechercheSalaries.value = '';
  selectedNom.value = '';
}
</script>
