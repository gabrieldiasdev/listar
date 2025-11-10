<script setup lang="ts">
import { useCategoryColors } from '~/composables/useCategoryColors'
import type { SupabaseClient } from '@supabase/supabase-js'

const { getCategoryClasses } = useCategoryColors()
const supabaseClient = useSupabase() as SupabaseClient

const searchValue = ref('')
const categoryValue = ref('')
const selectedItems = ref<string[]>([])

const categories = ref<string[]>([])
const items = ref<any[]>([])

async function getItems() {
  const { data, error } = await supabaseClient.from('items').select('*')
  const { data: list, error: listError } = await supabaseClient
    .from('list')
    .select('item_id')

  if (error || listError) {
    console.error('Erro ao buscar items:', error)
    return
  }

  items.value = data
    .filter((item: any) => !list.find((i: any) => i.item_id === item.id))
    .map((item: any) => ({
      label: item.name,
      value: item.id,
      category: item.category,
      ui: {
        item: `${getCategoryClasses(item.category, 'bg')} ${getCategoryClasses(
          item.category,
          'border',
        )}`,
      },
    }))

  const uniqueCategories = Array.from(
    new Set(data.map((item: any) => item.category).filter(Boolean)),
  )

  categories.value = uniqueCategories
}

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const matchesSearch =
      !searchValue.value ||
      item.label.toLowerCase().includes(searchValue.value.toLowerCase())

    const matchesCategory =
      !categoryValue.value || item.category === categoryValue.value

    return matchesSearch && matchesCategory
  })
})

function addItemsToList() {
  selectedItems.value.map(async (item) => {
    await supabaseClient.from('list').insert({ item_id: item })

    items.value = items.value.filter((i) => i.value !== item)
    selectedItems.value = []
  })
}

onMounted(() => {
  getItems()
})
</script>

<template>
  <div
    class="h-[66vh] w-full flex flex-col justify-between items-center p-6 gap-6"
  >
    <div class="w-full flex justify-between items-center gap-3">
      <UInput
        v-model="searchValue"
        placeholder="Busque por itens..."
        :ui="{
          base: 'bg-pink-50 border border-pink-200 ring-0 py-4 px-3 focus-visible:ring-pink-500 text-foreground text-xs placeholder:text-foreground font-normal',
        }"
        class="w-1/2"
      />
      <USelect
        v-model="categoryValue"
        :items="categories"
        placeholder="Categoria"
        class="bg-pink-50 border border-pink-200 ring-0 py-4 px-3 focus-visible:ring-pink-500 text-foreground text-xs font-normal focus:ring-pink-500 w-1/2"
        :ui="{
          placeholder: 'text-foreground',
          trailingIcon: 'text-foreground',
          content: 'bg-pink-50 ring-pink-200',
          item: 'text-foreground hover:before:bg-pink-500',
          itemWrapper: 'hover:before:bg-pink-500',
        }"
      />
    </div>
    <div class="w-full h-full overflow-y-scroll">
      <UCheckboxGroup
        v-model="selectedItems"
        indicator="hidden"
        variant="card"
        :items="filteredItems"
        :ui="{
          item: 'py-2 has-data-[state=checked]:border-pink-500',
          label: 'text-foreground text-sm font-normal',
        }"
      />
    </div>
    <div class="w-full flex items-center gap-3 h-16">
      <UButton
        disabled
        class="w-full h-full justify-center text-white font-medium text-base/tight bg-pink-500 active:bg-pink-600 disabled:bg-pink-500/50"
        >Criar novo item</UButton
      >
      <UButton
        @click="addItemsToList"
        class="w-full h-full justify-center text-white font-medium text-sm/tight bg-green-400 active:bg-green-500 disabled:bg-green-400/50"
        :disabled="selectedItems.length === 0"
        >Adicionar itens selecionados à lista</UButton
      >
    </div>
  </div>
</template>
