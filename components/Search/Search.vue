<template>
  <input
    type="text"
    placeholder="Поиск"
    class="rounded-4 bg-lightgray leading-1.5 px-8 w-full"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  />
</template>

<script>
  export default {
    props: ['value'],
  };
</script>
