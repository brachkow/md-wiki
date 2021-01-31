<template>
  <div>
    <div v-if="notes.length > 0">
      <ul>
        <li v-for="(note, index) in notes" :key="index">
          -
          <NuxtLink :to="note.path" :class="`${styles.link}`">{{
            note.title
          }}</NuxtLink>
        </li>
      </ul>
    </div>
    <div v-else>Нет результатов</div>
  </div>
</template>

<script>
  import styles from '~/styles/styles.js';
  export default {
    props: ['searchQuery', 'selectedTags'],
    data() {
      return {
        notes: [],
        styles,
      };
    },
    async mounted() {
      this.notes = await this.$content().fetch();
    },
    methods: {
      async search() {
        if (this.searchQuery === '') {
          if (this.selectedTags.length > 0) {
            this.notes = await this.$content('notes')
              .where({ tags: { $contains: this.selectedTags } })
              .fetch();
          } else {
            this.notes = await this.$content('notes').fetch();
          }
        } else {
          if (this.selectedTags.length > 0) {
            this.notes = await this.$content('notes')
              .where({ tags: { $contains: this.selectedTags } })
              .search(this.searchQuery)
              .fetch();
          } else {
            this.notes = await this.$content('notes')
              .search(this.searchQuery)
              .fetch();
          }
        }
      },
    },
    watch: {
      searchQuery() {
        this.search();
      },
      selectedTags() {
        this.search();
      },
    },
    mounted() {
      console.log(styles.link);
    },
  };
</script>
