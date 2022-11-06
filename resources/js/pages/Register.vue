<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
const router = useRouter()
const store = useAuthStore()

interface IRegisterForm {
  isBusy: boolean
  name: string
  email: string
  password: string
  passwordConfirm: string
}

const form = ref<IRegisterForm>({
  isBusy: false,
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
})
const registerForm = ref()
const rules = {
  name: [
    (v: string) => !!v || 'Name is required',
    (v: string) => (v && v.length <= 10) || 'Name must be less than 10 characters',
  ],
  email: [(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
  password: [
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length >= 8 && v.length <= 30) || 'Password must be between 8 and 30',
  ],
}

const register = async () => {
  const { name, email, password, passwordConfirm } = form.value
  const { valid } = await registerForm.value.validate()
  if (!valid || form.value.isBusy) return
  form.value.isBusy = true
  try {
    await store.register({
      name,
      email,
      password,
      passwordConfirm,
    })
    router.push({ name: 'Home' })
  } catch (e) {
    console.log('Failed Register')
  } finally {
    form.value.isBusy = false
  }
}
</script>

<template>
  <v-container class="my-16 d-flex fill-height align-center">
    <v-row class="justify-center">
      <v-col cols="12" md="6">
        <v-form ref="registerForm" @submit.prevent="register()">
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                v-model="form.name"
                :rules="rules.name"
                prepend-icon="mdi-text-account"
                label="Name"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="form.email"
                :rules="rules.email"
                prepend-icon="mdi-email"
                label="Email"
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                :rules="rules.password"
                prepend-icon="mdi-lock"
                label="Password"
                type="password"
              ></v-text-field>
              <v-text-field
                v-model="form.passwordConfirm"
                :rules="rules.password"
                prepend-icon="mdi-lock"
                label="PasswordConfirm"
                type="password"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" :loading="form.isBusy">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
