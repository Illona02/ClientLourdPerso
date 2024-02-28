<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="height: 70px" class="bg-cyan-10 text-white">
        <q-toolbar-title> Annuaire d'entreprise </q-toolbar-title>
        <div></div>
        <q-btn to="/">Visiteur</q-btn>
        <q-btn to="/Login">Admin</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import '../router/routes';
</script>
