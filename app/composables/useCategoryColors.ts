const categoryColorMap: Record<
  string,
  { bg: string; text: string; border: string; icon?: string }
> = {
  fruit: {
    bg: 'bg-orange-200',
    text: 'text-orange-400',
    border: 'border-orange-200',
    icon: 'i-lucide-apple',
  },
  vegetable: {
    bg: 'bg-lime-200',
    text: 'text-lime-400',
    border: 'border-lime-200',
  },
  meat: {
    bg: 'bg-pink-200',
    text: 'text-pink-400',
    border: 'border-pink-200',
  },
  drink: {
    bg: 'bg-blue-200',
    text: 'text-blue-400',
    border: 'border-blue-200',
  },
  bakery: {
    bg: 'bg-yellow-200',
    text: 'text-yellow-400',
    border: 'border-yellow-200',
  },
  other: {
    bg: 'bg-gray-200',
    text: 'text-gray-400',
    border: 'border-gray-200',
  },
}

export function useCategoryColors() {
  const getCategoryClasses = (
    category: string,
    variant: keyof (typeof categoryColorMap)['fruit'] = 'bg',
  ) =>
    categoryColorMap[category]?.[variant] ||
    'bg-gray-200 text-gray-400 border-gray-300'

  return {
    categoryColorMap,
    getCategoryClasses,
  }
}
