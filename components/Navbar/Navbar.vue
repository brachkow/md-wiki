<template>
  <nav class="flex justify-between leading-1.5 inline-block">
    <div>
      <NuxtLink to="/" :class="`${styles.link}`">Индекс</NuxtLink>
    </div>
    <!-- <div>
      <router-link
        to="settings"
        :class="`${styles.link}`"
        >Настройки</router-link
      >
    </div> -->
  </nav>
</template>

<script>
  import styles from '~/styles/styles.js';
  export default {
    data() {
      return {
        styles,
      };
    },
  };
</script>
