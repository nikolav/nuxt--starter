<script setup lang="ts">
import { useDisplay } from "vuetify";
// @@
const userRegister = async () => {
  const user = await $fetch("/api/auth/register", {
    method: "post",
    body: {
      email: "admin@nikolav.rs",
      password: "122333",
    },
  });
  console.log({ user });
};
// @@
const userLogin = async () => {
  const auth = await $fetch("/api/auth/authenticate", {
    method: "post",
    body: {
      email: "admin@nikolav.rs",
      password: "122333",
    },
  });
  console.log({ auth });
};
// @@
const { name: screenSizeName } = useDisplay();
</script>

<template>
  <h1>auth</h1>
  <h4>{{ screenSizeName }}</h4>
  <v-sheet class="p-1">
    <v-btn variant="outlined" @click="userRegister"> register </v-btn>
    <v-btn variant="outlined" @click="userLogin"> login </v-btn>
  </v-sheet>
</template>

<style scoped>
section {
  padding: 1rem;
}
</style>
