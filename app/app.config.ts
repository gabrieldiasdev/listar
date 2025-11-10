export default defineAppConfig({
  ui: {
    checkbox: {
      variants: {
        color: {
          primary: {
            base: 'ring-pink-500 text-white aria-checked:ring-green-300',
            indicator: 'bg-green-400 text-white',
            label:
              'font-bold text-sm text-foreground ml-2 group-has-aria-checked:text-gray-500 group-has-aria-checked:font-normal group-has-aria-checked:line-through',
          },
        },
      },
    },
    badge: {
      variants: {
        color: {
          orange: {
            base: 'bg-orange-200 text-orange-400',
          },
        },
      },
    },
    drawer: {
      slots: {
        content: 'bg-zinc-100 ring-0',
      },
    },
  },
})
