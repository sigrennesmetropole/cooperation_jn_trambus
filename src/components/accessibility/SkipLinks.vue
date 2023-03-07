<script setup lang="ts">
// https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/liens-d-evitement/

const props = defineProps<{
  links: { id: string; title: string }[]
}>()
</script>
<template>
  <nav role="navigation" aria-label="Accès rapide">
    <ul>
      <li v-for="link in props.links" :key="link.id">
        <a :href="'#' + link.id" class="fr-link bg-white p-1">
          {{ link.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
.fr-link {
  position: absolute;
  z-index: 100;
  transform: translateY(-1000%);
}

.fr-link:focus {
  transform: translateY(0%);
}
</style>
