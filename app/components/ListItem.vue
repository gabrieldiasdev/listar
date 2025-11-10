<script setup lang="ts">
import type { UBadge } from '#components'

const { getCategoryClasses } = useCategoryColors()

interface Props {
  id: number
  name: string
  category: string
  bought: boolean
  deleteItem: (id: number) => void
  onToggleBought: (id: number, bought: boolean) => void
}

const props = defineProps<Props>()

const items = ref([
  [
    {
      label: 'Delete',
      icon: 'i-lucide-trash',
      onSelect: () => props.deleteItem(props.id),
    },
  ],
])

const checked = ref(props.bought)
</script>

<template>
  <div
    class="w-full bg-pink-50 has-aria-checked:opacity-50 has-aria-checked:bg-zinc-50 p-4 flex justify-between items-center border border-pink-200 has-aria-checked:border-pink-50 rounded-lg"
  >
    <UCheckbox
      color="primary"
      class="group"
      :label="props.name"
      v-model="checked"
      @change="onToggleBought(props.id, checked)"
    />
    <div class="flex items-center gap-2">
      <UBadge
        size="lg"
        :class="`rounded-full p-2 ${getCategoryClasses(props.category, 'bg')}`"
      >
        <UIcon
          :name="getCategoryClasses(props.category, 'icon')"
          size="16"
          :class="`${getCategoryClasses(props.category, 'text')}`"
        />
      </UBadge>
      <UDropdownMenu
        :disabled="checked"
        :items="items"
        size="xs"
        :ui="{
          content: 'bg-pink-500 ring-pink-200 min-w-auto',
          item: 'bg-pink-500 text-white w-min',
          itemLeadingIcon: 'text-rose-700',
        }"
      >
        <UIcon
          name="i-lucide-ellipsis-vertical"
          class="text-pink-500"
          size="20"
        />
      </UDropdownMenu>
    </div>
  </div>
</template>
