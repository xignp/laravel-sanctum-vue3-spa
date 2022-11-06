<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const store = useAuthStore()
const isAuth = computed(() => store.getAuth)
const userName = computed(() => store.getName)

const isShowDrawer = ref<boolean>(false)

const logout = async () => {
  try {
    await store.logout()
    router.push({ name: 'Login' })
  } catch (e) {
    console.log('Failed Logout')
  }
}
</script>

<template>
  <v-navigation-drawer v-model="isShowDrawer" disable-resize-watcher>
    <v-container>
      <div class="d-flex justify-space-between align-center">
        <v-list-item-title class="title">Menu</v-list-item-title>
        <v-btn @click="isShowDrawer = false" variant="text" icon="mdi-close"></v-btn>
      </div>

      <v-divider></v-divider>

      <template v-if="isAuth">
        <v-list nav>
          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props">{{ userName }}</v-list-item>
            </template>
            <v-list-item prepend-icon="mdi-logout" @click="logout()">
              <v-list-item-title>LOGOUT</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-item prepend-icon="mdi-home" to="/home">
            <v-list-item-title>HOME</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
      <template v-else>
        <v-list nav>
          <v-list-item prepend-icon="mdi-login" to="/login">
            <v-list-item-title>LOGIN</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list nav>
          <v-list-item prepend-icon="mdi-account-plus" to="/register">
            <v-list-item-title>REGISTER</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-container>
  </v-navigation-drawer>

  <v-app-bar color="primary" absolute>
    <v-app-bar-nav-icon @click="isShowDrawer = !isShowDrawer" class="d-sm-none"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <h1>
        <router-link to="/">SampleTitle</router-link>
      </h1>
    </v-toolbar-title>
    <v-spacer class="d-none d-md-block"></v-spacer>
    <v-toolbar-items class="d-none d-sm-block">
      <template v-if="isAuth">
        <v-btn to="/home" variant="text">HOME</v-btn>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" append-icon="mdi-menu-down">{{ userName }}</v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout()">
              <v-list-item-title>LOGOUT</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-btn to="/register" variant="text">REGISTER</v-btn>
        <v-btn to="/login" variant="text">LOGIN</v-btn>
      </template>
    </v-toolbar-items>
  </v-app-bar>
</template>
