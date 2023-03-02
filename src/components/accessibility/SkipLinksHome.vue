<script setup lang="ts">
import SkipLinks from '@/components/accessibility/SkipLinks.vue'
const links = [
  { id: 'reseau-trambus', title: 'Réseau trambus' },
  { id: 'travel-times', title: 'Temps de parcours théorique' },
  { id: 'line-descriptions', title: 'Les nouvelles lignes' },
  { id: 'planning-project', title: 'Planning du projet' },
  { id: 'footer', title: 'Pied de page' },
]
</script>
<template>
  <SkipLinks :links="links" />
</template>
