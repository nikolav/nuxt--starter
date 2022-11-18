<script setup lang="ts">
const userRegister = async () => {
  const user = await $fetch("/api/auth/register", {
    method: "post", 
    body: {
      email: "user4@nikolav.rs",
      password: "122333"
    }
  });
  console.log({ user });
}
</script>

<template>
<h1>
  auth
</h1>
<v-btn variant="outlined" @click="userRegister">
  register
</v-btn>
</template>

<style scoped>
section {
  padding: 1rem;
}
</style>
