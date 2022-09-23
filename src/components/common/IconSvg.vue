<template>
    <svg aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script setup lang="ts">
defineProps<{
    iconName: string;
}>();
</script>
