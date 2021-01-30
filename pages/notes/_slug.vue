<template>
  <article>
    <h1>{{ note.title }}</h1>
    <nuxt-content :document="note" />
  </article>
</template>

<script>
  export default {
    head() {
      return {
        title: this.note.title,
      };
    },
    async asyncData({ $content, route }) {
      const note = await $content('notes/' + route.params.slug).fetch();
      return {
        note,
      };
    },
  };
</script>