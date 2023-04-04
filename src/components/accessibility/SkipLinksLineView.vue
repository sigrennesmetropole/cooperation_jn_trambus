<script setup lang="ts">
import SkipLinks from '@/components/accessibility/SkipLinks.vue'
const links = [
  { id: 'new-travel-times', title: 'Nouveaux temps de parcours' },
  { id: 'stations-list', title: 'Liste des nouvelles stations' },
  { id: 'head-toolbar', title: 'Barre de navigation carte' },
  { id: 'footer', title: 'Pied de page' },
]
</script>
<template>
  <SkipLinks :links="links" />
</template>
