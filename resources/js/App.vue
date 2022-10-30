<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <v-app>
    <Header />
    <v-container class="my-16">
      <router-view />
    </v-container>
    <Footer />
  </v-app>
</template>
