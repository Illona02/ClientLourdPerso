<template>
  <div
    class="fullscreen bg-cyan-9 text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oups. Rien ici...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="cyan"
        unelevated
        to="/"
        label="Revenir à l'accueil"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorNotFound',
});
</script>
