<template>
  <div>
    <article>
      <header class="mb-24">
        <h1 class="text-32 mb-4 font-bold">{{ note.title }}</h1>
        <div class="inline-flex flex-wrap -mb-4" v-if="note.tags !== undefined">
          <span
            class="rounded-4 leading-1.5 px-8 mr-4 mb-4 bg-lightgray inline-block"
            v-for="(tag, index) in note.tags.split(', ')"
            :key="index"
            >{{ tag }}</span
          >
        </div>
      </header>
      <ToC :toc="note.toc" class="mb-16" v-if="note.toc.length > 0" />
      <nuxt-content :document="note" />
    </article>
    <RelatedList
      :currentTitle="note.title"
      :selectedTags="[...note.tags]"
      v-if="note.tags !== undefined"
    />
  </div>
</template>

<script>
  import RelatedList from '~/components/RelatedList/RelatedList.vue';
  import ToC from '~/components/ToC/ToC.vue';
  export default {
    components: {
      RelatedList,
      ToC,
    },
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

<style>
  .nuxt-content {
    @apply leading-1.5;
  }
  .nuxt-content * {
    @apply mb-8;
  }
  .nuxt-content h2 {
    @apply text-24 font-bold mb-8 mt-16;
  }
  .nuxt-content h3 {
    @apply text-16 font-bold mb-8 mt-16;
  }
  .nuxt-content a {
    @apply text-blue underline hover:text-red transition-colors;
  }
  .nuxt-content ol {
    counter-reset: ol;
  }
  .nuxt-content ul > li {
    @apply mb-4;
    list-style-type: disc;
    list-style-position: inside;
  }
  .nuxt-content ul > li:before {
    /*content: '- ';*/
  }
  .nuxt-content ol > li {
    @apply mb-4;
    list-style-type: decimal;
    list-style-position: inside;
  }
  .nuxt-content ol > li:before {
    /*counter-increment: ol;*/
    /*content: counters(ol, '.') '. ';*/
  }
  .nuxt-content-editor {
    @apply font-mono;
  }
  .nuxt-content *:not(pre) > code {
    @apply bg-lightgray rounded-4 px-4 font-mono;
  }
  .nuxt-content blockquote {
    @apply italic;
  }
</style>
