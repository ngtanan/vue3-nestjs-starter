<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style lang="postcss" scoped>
@media (min-width: 1024px) {
  .about {
    @apply flex items-center;

    min-height: 100vh;
    color: var(--vt-c-white-mute);
    margin: theme("spacing.6");
  }
}
</style>
