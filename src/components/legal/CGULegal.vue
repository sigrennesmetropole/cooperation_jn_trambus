<script setup lang="ts">
import { UiCGULegal } from '@sigrennesmetropole/cooperation_jn_common_ui'
import { useConfigStore } from '@/stores/config'
let configStore = useConfigStore()
</script>

<template>
  <UiCGULegal>
    <li>
      <a
        :href="configStore.config?.trambus.links.fabrique_citoyenne_CGU_url"
        target="_blank"
        class="underline"
        >{{ configStore.config?.trambus.links.fabrique_citoyenne_CGU_url }}</a
      >: ce site permet la consultation des concertations citoyennes ouvertes /
      terminées sur le réseau Trambus
    </li>
  </UiCGULegal>
</template>
