<script setup lang="ts">
import useProfileStore from '~/stores/profile';

const tags = [
    'Bodybuilding',
    'Crossfit',
    'Calisthenics',
    'Yoga',
    'Cardio',
    'Fitness',
    'Powerlifting',
    'Powerbuilding',
    'Strongman',
    'Zwemmen',
    'Vechtsporten',
    'Andere',
]

const profileStore = useProfileStore();
</script>

<template>
    <USelectMenu v-model="profileStore.addListingState.tags" :options="tags" multiple>
        <template #label>
            <span v-if="profileStore.addListingState.tags.length" class="truncate">{{ profileStore.addListingState.tags.join(', ') }}</span>
            <span v-else>Select tags</span>
        </template>
    </USelectMenu>
</template>