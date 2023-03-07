<script setup lang="ts">
import SkipLinks from '@/components/accessibility/SkipLinks.vue'
const links = [
  { id: 'travel-times', title: 'Temps de parcours théorique' },
  { id: 'line-descriptions', title: 'Les nouvelles lignes' },
  { id: 'head-toolbar', title: 'Barre de navigation carte' },
  { id: 'footer', title: 'Pied de page' },
]
</script>
<template>
  <SkipLinks :links="links" />
</template>
