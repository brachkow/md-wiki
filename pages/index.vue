<template>
  <main class="py-16">
    <input
      type="text"
      v-model="search"
      placeholder="Поиск"
      class="rounded-4 bg-lightgray leading-1.5 px-8 w-full mb-8"
    />
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

<script>
  export default {
    data() {
      return {
        notes: [],
        search: '',
      };
    },
    watch: {
      async search() {
        if (this.search === '') {
          this.notes = await this.$content().fetch();
        } else {
          this.notes = await this.$content().search(this.search).fetch();
        }
      },
    },
    async mounted(){
      this.notes = await this.$content().fetch();
    }
  };
</script>
