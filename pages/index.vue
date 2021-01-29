<template>
  <main>
    <input type="text" v-model="search" placeholder="Поиск"/>
    <ul>
      <li v-for="(note, index) in notes" :key="index">
        <a :href="note.path">{{ note.title }}</a>
      </li>
    </ul>
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
