<script setup lang="ts">
import type { SupabaseClient } from '@supabase/supabase-js'
const supabaseClient = useSupabase() as SupabaseClient

const items = ref<any[]>([])
let channel: ReturnType<typeof supabaseClient.channel> | null = null

async function getListItems() {
  const { data, error } = await supabaseClient
    .from('list')
    .select(
      `
    id,
    bought,
    items ( name, category )
  `,
    )
    .order('bought', { ascending: true })

  if (!error) {
    items.value = data.map((item: any) => ({
      id: item.id,
      label: item.items.name,
      category: item.items.category,
      bought: item.bought,
    }))
  }
}

async function deleteListItem(id: number) {
  const { error } = await supabaseClient.from('list').delete().eq('id', id)

  if (error) {
    console.error('Erro ao deletar item da lista:', error)
    return
  }

  items.value = items.value.filter((item) => item.id !== id)
}

async function toggleBoughtListItem(id: number, bought: boolean) {
  const { error } = await supabaseClient
    .from('list')
    .update({
      bought,
    })
    .eq('id', id)

  if (error) {
    console.error('Erro ao comprar item da lista:', error)
    return
  }
}

onBeforeUnmount(() => {
  if (channel) supabaseClient.removeChannel(channel)
})

onMounted(async () => {
  await getListItems()

  channel = supabaseClient
    .channel('list-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'list',
      },
      async (payload) => {
        if (payload.eventType === 'INSERT') {
          await getListItems()
        }

        if (payload.eventType === 'DELETE') {
          items.value = items.value.filter((i) => i.id !== payload.old.id)
        }

        if (payload.eventType === 'UPDATE') {
          const index = items.value.findIndex((i) => i.id === payload.new.id)
          if (index !== -1) {
            items.value[index].bought = payload.new.bought
          }
        }
      },
    )
    .subscribe()
})
</script>

<template>
  <div class="h-full w-full flex flex-col justify-between items-center pt-16">
    <div class="w-full">
      <h1 class="text-2xl font-bold">Lista de compras</h1>
      <div
        class="mt-12 w-full flex flex-col items-center gap-2 max-h-[calc(100vh-248px)] overflow-y-auto"
      >
        <ListItem
          v-for="item in items"
          :key="item.id"
          :id="item.id"
          :name="item.label"
          :category="item.category"
          :bought="item.bought"
          :delete-item="deleteListItem"
          :on-toggle-bought="toggleBoughtListItem"
        />
      </div>
    </div>
    <div class="w-full flex justify-end items-center">
      <UDrawer>
        <UButton
          icon="i-lucide-plus"
          size="lg"
          class="bg-pink-500 text-white text-2xl rounded-full"
        />

        <template #content>
          <Drawer />
        </template>
      </UDrawer>
    </div>
  </div>
</template>
