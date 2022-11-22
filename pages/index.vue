<script setup lang="ts">
import { mdiAccount } from "@mdi/js";
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
const icon1 = ref(mdiAccount);
</script>

<template>
  <h1 class="text-h1 text-primary-darken-1">auth</h1>
  <h4>{{ screenSizeName }}</h4>
  <v-container>
    <v-sheet class="p-1">
      <v-btn variant="outlined" @click="userRegister"> register </v-btn>
      <v-btn variant="outlined" @click="userLogin"> login </v-btn>
    </v-sheet>
  </v-container>
  <v-container class="bg-stone-200 p-1 min-h-[128px]">
  <v-btn size="small" :prepend-icon="icon1" color="secondary" variant="outlined">
      submit
    </v-btn>
  </v-container>
</template>

<style scoped>
section {
  padding: 1rem;
}
</style>
