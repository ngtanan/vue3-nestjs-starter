<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import { logger } from '@awesome-boilerplate/shared'
logger('Hello from App.vue')
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    >

    <div class="wrapper">
      <HelloWorld msg="You did it! - Hello github actions" />

      <nav>
        <RouterLink to="/" class="text-3xl font-bold underline">
          <n-icon size="20" color="white">
            <Icon icon="mdi-light:home" />
          </n-icon>
          Home
        </RouterLink>
        <RouterLink to="/about" class="text-3xl font-bold underline">
          About
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="postcss">
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  font-weight: normal;
  padding: theme("spacing.4") theme("spacing.2");

  /* background-color: var(--vt-c-white); */
  .logo {
    display: block;
    margin: 0 auto 2rem;
  }
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

a,
.green {
  text-decoration: none;
  color: hsl(160deg 100% 37% / 100%);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsl(160deg 100% 37% / 20%);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;

    .logo {
      margin: 0 2rem 0 0;
    }
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
