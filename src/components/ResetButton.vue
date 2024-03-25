<script setup>
    import { defineProps } from 'vue'

    const { handleReset } = defineProps(['handle-reset'])
</script>

<template>
    <!-- Button for resetting canvas to original state -->
    <div class="reset-btn text-center pa-4">
        <v-btn
            color="primary"
            icon="mdi-restart"
            text="Reset"
            @click="handleReset"
        ></v-btn>
  </div>
</template>

<style scoped>
    .reset-btn {
        right: 100px;
        position: absolute;
        top: 100px;
    }
</style>