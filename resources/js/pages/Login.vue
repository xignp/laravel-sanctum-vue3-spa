<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

interface ILoginForm {
  isBusy: boolean
  email: string
  password: string
}

const router = useRouter()
const store = useAuthStore()

const form = ref<ILoginForm>({
  isBusy: false,
  email: '',
  password: '',
})
const loginForm = ref()

const rules = {
  email: [(v: string) => !!v || 'E-mail is required'],
  password: [(v: string) => !!v || 'Password is required'],
}

const login = async () => {
  const { email, password } = form.value
  const { valid } = await loginForm.value.validate()
  if (!valid || form.value.isBusy) return
  form.value.isBusy = true
  try {
    await store.login({ email, password })
    router.push({ name: 'Home' })
  } catch (e) {
    console.log('Failed Login')
  } finally {
    form.value.isBusy = false
  }
}
</script>

<template>
  <v-container class="my-16 d-flex fill-height align-center">
    <v-row class="justify-center">
      <v-col cols="12" md="6">
        <v-form ref="loginForm" @submit.prevent="login()">
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                v-model="form.email"
                prepend-icon="mdi-email"
                label="Email"
                type="email"
                id="email"
                :rules="rules.email"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                prepend-icon="mdi-lock"
                label="Password"
                type="password"
                id="password"
                :rules="rules.password"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" :loading="form.isBusy">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
