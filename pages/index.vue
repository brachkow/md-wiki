<template>
  <main>
    <Search v-model="searchQuery" class="mb-8" />
    <TagFilter
      class="mt-8 mb-4"
      @change="selectedTags = $event"
    />
    <div v-if="notes.length > 0">
      <ul>
        <li v-for="(note, index) in notes" :key="index">
          -
          <NuxtLink
            :to="note.path"
            class="text-blue underline hover:text-red transition-colors"
            >{{ note.title }}</NuxtLink
          >
        </li>
      </ul>
    </div>
    <div v-else>Нет результатов</div>
  </main>
</template>

<script>
  import Search from '../components/Search/Search.vue';
  import TagFilter from '../components/TagFilter/TagFilter.vue';
  export default {
    head() {
      return {
        title: 'Индекс',
      };
    },
    data() {
      return {
        notes: [],
        searchQuery: '',
        selectedTags: [],
      };
    },
    components: {
      Search,
      TagFilter,
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
            this.notes = await this.$content('notes').search(this.searchQuery).fetch();
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
  };
</script>
