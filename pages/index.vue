<template>
  <main class="py-16 px-8">
    <Search v-model="searchQuery" class="mb-8"/>
    <div class="mt-8 mb-4 flex flex-wrap" v-if="Object.keys(tags).length > 0">
      <span v-for="(tag, index) in Object.keys(tags)" :key="index">
        <input
          :id="`tag-${index}`"
          type="checkbox"
          class="visually-hidden"
          v-model="tags[tag].selected"
        />
        <label
          :for="`tag-${index}`"
          class="rounded-4 leading-1.5 px-8 mr-4 mb-4 inline-block cursor-pointer"
          :class="{
            'bg-blue text-white': tags[tag].selected === true,
            'bg-lightgray hover:bg-darkgray': tags[tag].selected === false,
          }"
          ># {{ tag }} ({{ tags[tag].count }})
        </label>
      </span>
    </div>
    <div v-if="notes.length > 0">
      <ul>
        <li v-for="(note, index) in notes" :key="index">
          -
          <router-link
            :to="note.path"
            class="text-blue underline hover:text-red transition-colors"
            >{{ note.title }}</router-link
          >
        </li>
      </ul>
    </div>
    <div v-else>Нет результатов</div>
  </main>
</template>

<style>
  input[type='checkbox']:focus + label {
    @apply outline-blue;
  }
</style>

<script>
  import groupBy from '../node_modules/lodash-es/groupBy';
  import Search from '../components/Search/Search.vue';
  export default {
    data() {
      return {
        notes: [],
        tags: [],
        searchQuery: '',
      };
    },
    components: {
      Search,
    },
    computed: {
      selectedTags() {
        const selectedTags = [];
        Object.keys(this.tags).forEach((tag) => {
          if (this.tags[tag].selected === true) {
            selectedTags.push(tag);
          }
        });
        return selectedTags;
      },
    },
    async mounted() {
      const notesWithTags = await this.$content().only(['tags']).fetch();
      const unsortedTags = [];
      notesWithTags.forEach((note) => {
        note.tags.split(', ').forEach((tag) => {
          unsortedTags.push(tag);
        });
      });
      const sortedTags = groupBy(unsortedTags, (tag) => tag);

      Object.keys(sortedTags).forEach((key) => {
        sortedTags[key] = { count: sortedTags[key].length, selected: false };
      });

      this.tags = sortedTags;
      this.notes = await this.$content().fetch();
    },
    methods: {
      async search() {
        if (this.searchQuery === '') {
          if (this.selectedTags.length > 0) {
            this.notes = await this.$content()
              .where({ tags: { $contains: this.selectedTags } })
              .fetch();
          } else {
            this.notes = await this.$content().fetch();
          }
        } else {
          if (this.selectedTags.length > 0) {
            this.notes = await this.$content()
              .where({ tags: { $contains: this.selectedTags } })
              .search(this.searchQuery)
              .fetch();
          } else {
            this.notes = await this.$content().search(this.searchQuery).fetch();
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
