<template>
  <div
    class="q-pa-md"
    style="display: grid; grid-template-columns: 20% 1fr; grid-column-gap: 10px"
  >
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
            option-label="label"
            label="Recherche par site"
          />

          <q-select
            v-model="selectedService"
            :options="options_services"
            emit-value
            map-options
            option-value="id"
            option-label="label"
            label="Recherche par service"
          />
          <br />

          <q-btn type="reset" @click="Reinitialiser" class="q-mr-sm"
            >Réinitialiser</q-btn
          >
          <br />
        </q-card-section>
      </q-card>
      <br />

      <!-- ajouter-->
      <q-card>
        <q-card-section>
          <div class="text-h6">Ajouter</div>
        </q-card-section>
        <q-card-section
          class="q-pt-md q-pl-md q-pr-md"
          style="display: flex; justify-content: space-between"
        >
          <q-btn
            class="bg-cyan-9 text-white"
            @click="AjoutSalarie"
            style="margin-bottom: 10px"
            >Salarié</q-btn
          >
          <q-btn
            class="bg-cyan-9 text-white"
            @click="AjoutSite"
            style="margin-bottom: 10px"
            >Site</q-btn
          >
          <q-btn
            class="bg-cyan-9 text-white"
            @click="AjoutService"
            style="margin-bottom: 10px"
            >Service</q-btn
          >
        </q-card-section>
      </q-card>
      <br />
      <!-- modifier-->
      <q-card>
        <q-card-section>
          <div class="text-h6">Modifier</div>
        </q-card-section>
        <q-card-section
          class="q-pt-md q-pl-md q-pr-md"
          style="display: flex; justify-content: space-between"
        >
          <q-btn
            class="bg-cyan-9 text-white"
            @click="ModifierSalarie"
            style="margin-bottom: 10px"
            >Salarié</q-btn
          >
          <q-btn
            class="bg-cyan-9 text-white"
            @click="ModifierSite"
            style="margin-bottom: 10px"
            >Site</q-btn
          >
          <q-btn
            class="bg-cyan-9 text-white"
            @click="ModifierService"
            style="margin-bottom: 10px"
            >Service</q-btn
          >
        </q-card-section>
      </q-card>
      <br />
      <!-- Supprimer-->
      <q-card>
        <q-card-section>
          <div class="text-h6">Supprimer</div>
        </q-card-section>
        <q-card-section
          class="q-pt-md q-pl-md q-pr-md"
          style="display: flex; justify-content: space-between"
        >
          <q-btn
            class="bg-cyan-9 text-white"
            @click="SuppSalarie"
            style="margin-bottom: 10px"
            >Salarié</q-btn
          >
          <q-btn
            class="bg-cyan-9 text-white"
            @click="SuppSite"
            style="margin-bottom: 10px"
            >Site</q-btn
          >
          <q-btn
            class="bg-cyan-9 text-white"
            @click="SuppService"
            style="margin-bottom: 10px"
            >Service</q-btn
          >
        </q-card-section>
      </q-card>
    </div>

    <div style="display: flex">
      <div style="flex: 1; margin-right: 10px">
        <q-table
          title="Salariés"
          :rows="rows"
          :columns="columns"
          row-key="id"
          ss
          :pagination="pagination"
          selection="single"
          v-model:selected="selected"
        />
      </div>
      <div style="flex: 1">
        <q-table
          title="Services"
          :rows="rowsServices"
          :columns="columnsServices"
          row-key="id"
          :pagination="pagination"
          selection="single"
          v-model:selected="selectedService"
        />
        <br />
        <q-table
          title="Sites"
          :rows="rowsSites"
          :columns="columnsSites"
          row-key="id"
          :pagination="pagination"
          selection="single"
          v-model:selected="selectedSite"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';

onMounted(() => {
  loadData();
  loadDataService();
  loadDataSite();
});

const dataApiAll = ref();
const dataApiService = ref();
const dataApiSite = ref();

const router = useRouter();

const selected = ref([]);
const selectedSite = ref([]);
const selectedService = ref([]);

const selectedId = ref();
const selectedNom = ref('');

async function loadData() {
  try {
    const response = await api.get('/all', {
      params: {
        nom: rechercheSalaries.value,
        service: idService.value,
        site: idSite.value,
      },
    });
    dataApiAll.value = response.data;
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

const AjoutSalarie = () => {
  router.push({ path: '/AjoutSalarie' });
};

const AjoutSite = () => {
  router.push({ path: '/AjoutSite' });
};

const AjoutService = () => {
  router.push({ path: '/AjoutService' });
};

const ModifierSalarie = () => {
  if (selected.value.length > 0) {
    selectedId.value = selected.value[0].id;
    router.push({
      path: '/ModifierSalarie',
      query: { selectedId: selectedId.value },
    });
  } else {
    console.log('Aucun élément sélectionné');
  }
};

const ModifierService = () => {
  if (selectedService.value.length > 0) {
    selectedId.value = selectedService.value[0].id;
    router.push({
      path: '/ModifierService',
      query: { selectedId: selectedId.value },
    });
  } else {
    console.log('Aucun élément sélectionné');
  }
};

const ModifierSite = () => {
  if (selectedSite.value.length > 0) {
    selectedId.value = selectedSite.value[0].id;
    router.push({
      path: '/ModifierSite',
      query: { selectedId: selectedId.value },
    });
  } else {
    console.log('Aucun élément sélectionné');
  }
};

const SuppService = () => {
  if (selectedService.value.length > 0) {
    selectedId.value = selectedService.value[0].id;
    router.push({
      path: '/SupprimerService',
      query: { selectedId: selectedId.value },
    });
  } else {
    console.log('Aucun élément sélectionné');
  }
};

const rechercheSalaries = ref('');
const idService = ref(null);
const idSite = ref(null);

const pagination = {
  rowsPerPage: 10,
};

const options_services = [
  { id: 1, label: 'Comptabilité' },
  { id: 2, label: 'Production' },
  { id: 3, label: 'Accueil' },
  { id: 4, label: 'Informatique' },
  { id: 5, label: 'Commercial' },
  { id: 6, label: 'Transport' },
  { id: 7, label: 'Juridique' },
];

const options_sites = [
  { id: 1, label: 'Paris' },
  { id: 2, label: 'Nantes' },
  { id: 3, label: 'Toulouse' },
  { id: 4, label: 'Nice' },
  { id: 5, label: 'Lille' },
];

const columns = [
  {
    name: 'nom',
    required: true,
    label: 'Nom',
    align: 'left',
    field: 'nom',
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
    label: 'Ville',

    field: 'ville',
    sortable: true,
  },
  { name: 'fonction', label: 'Fonction', field: 'fonction', sortable: true },
];

const rows = dataApiAll;

const columnsServices = [
  {
    name: 'fonction',
    required: true,
    label: 'Fonction',
    align: 'left',
    field: 'fonction',
    sortable: true,
  },
];

const rowsServices = dataApiService;

const columnsSites = [
  {
    name: 'ville',
    required: true,
    label: 'Ville',
    align: 'left',
    field: 'ville',
    sortable: true,
  },
];

const rowsSites = dataApiSite;

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

function Reinitialiser() {
  selectedService.value = '';
  selectedSite.value = '';
  rechercheSalaries.value = '';
  selectedNom.value = '';
}
</script>
