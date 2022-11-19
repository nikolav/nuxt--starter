<script setup lang="ts">
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
</script>

<template>
  <h1>auth</h1>
  <v-btn variant="outlined" @click="userRegister"> register </v-btn>
  <v-btn variant="outlined" @click="userLogin"> login </v-btn>
</template>

<style scoped>
section {
  padding: 1rem;
}
</style>
