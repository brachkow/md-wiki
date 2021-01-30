<template>
  <main>
    <Search v-model="searchQuery" class="mb-8" />
    <TagFilter class="mt-8 mb-4" @change="selectedTags = $event" />
    <List :searchQuery="searchQuery" :selectedTags="selectedTags" />
  </main>
</template>

<script>
  import Search from '../components/Search/Search.vue';
  import TagFilter from '../components/TagFilter/TagFilter.vue';
  import List from '../components/List/List.vue';

  export default {
    head() {
      return {
        title: 'Индекс',
      };
    },
    data() {
      return {
        searchQuery: '',
        selectedTags: [],
      };
    },
    components: {
      Search,
      TagFilter,
      List,
    },
  };
</script>
