<template>
  <div class="flex flex-wrap" v-if="Object.keys(tags).length > 0">
    <span v-for="(tag, index) in Object.keys(tags).sort()" :key="index">
      <input
        :id="`tag-${index}-${componentId}`"
        type="checkbox"
        class="visually-hidden"
        v-model="tags[tag].selected"
      />
      <label
        :for="`tag-${index}-${componentId}`"
        class="rounded-4 leading-1.5 px-8 mr-4 mb-4 inline-block cursor-pointer"
        :class="{
          'bg-blue text-white': tags[tag].selected === true,
          'bg-lightgray hover:bg-darkgray': tags[tag].selected === false,
        }"
        >{{ formatter(tag, tags[tag].count) }}
      </label>
    </span>
  </div>
</template>

<style>
  input[type='checkbox']:focus + label {
    @apply outline-blue;
  }
</style>

<script>
  import groupBy from '~/node_modules/lodash-es/groupBy';
  import { nanoid } from 'nanoid';
  export default {
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
    watch: {
      selectedTags() {
        this.$emit('change', this.selectedTags);
      },
    },
    methods: {
      formatter(tag, count) {
        let string;
        if (count > 1) {
          string = `# ${tag} (${count})`;
        } else {
          string = `# ${tag}`;
        }
        return string;
      },
    },
    data() {
      return {
        tags: [],
        componentId: nanoid(10),
      };
    },
    async mounted() {
      const notesWithTags = await this.$content().only(['tags']).fetch();
      const unsortedTags = [];
      notesWithTags.forEach((note) => {
        if (note.tags !== undefined) {
          note.tags.split(', ').forEach((tag) => {
            unsortedTags.push(tag);
          });
        }
      });
      const sortedTags = groupBy(unsortedTags, (tag) => tag);

      Object.keys(sortedTags).forEach((key) => {
        sortedTags[key] = { count: sortedTags[key].length, selected: false };
      });

      this.tags = sortedTags;
    },
  };
</script>
