<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section class="q-pa-md">
        <div class="text-h6 text-center">Connexion</div>
        <br />

        <q-form @submit="login">
          <q-input filled v-model="username" label="Nom d'utilisateur" dense />
          <br />
          <q-input
            filled
            v-model="password"
            label="Mot de passe"
            type="password"
            dense
          />
          <br />

          <q-btn
            type="submit"
            class="full-width q-mt-md bg-cyan-10 text-white"
            label="Se connecter"
            dense
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref(null);
const password = ref(null);

function login() {
  if (username.value == 'admin' && password.value == 'mdp') {
    router.push({ path: '/Admin' });
  } else {
    username.value = null;
    password.value = null;
  }
}
</script>
