<template>
  <div class="container mx-auto py-16 px-8">
    <Navbar class="mb-8"/>
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
  import Navbar from '../components/Navbar/Navbar.vue';
  export default {
    components: {
      Navbar,
    },
  };
</script>
