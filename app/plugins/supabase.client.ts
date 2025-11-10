import { createClient } from '@supabase/supabase-js'

let supabaseClient: ReturnType<typeof createClient> | null = null

export default defineNuxtPlugin(() => {
  if (!supabaseClient) {
    const runtimeConfig = useRuntimeConfig()
    supabaseClient = createClient(
      runtimeConfig.public.supabaseUrl,
      runtimeConfig.public.supabasePublishableKey,
    )
  }

  return {
    provide: {
      supabase: supabaseClient,
    },
  }
})
