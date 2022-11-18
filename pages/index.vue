<script setup lang="ts">

const apiStatus = async () => {
  const res = await $fetch("/api/status", {
    method: "post", 
    body: {
      message: "asd"
    }
  });

  console.log({ res });
}
</script>

<template>
  <section class="**prose">
    <v-btn @click="apiStatus" variant="outlined">api-status</v-btn>
  </section>
</template>

<style scoped>
section {
  padding: 1rem;
}
</style>
