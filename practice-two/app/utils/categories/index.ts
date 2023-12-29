export const getImageCategory = (category: string) => {
  switch (category) {
    case 'beverages':
      return require('@assets/menu/beverages.png')
    case 'bread & bakery':
      return require('@assets/menu/bread.png')
    case 'vegetables':
      return require('@assets/menu/vegetables.png')
    case 'fruit':
      return require('@assets/menu/fruit.png')
    case 'egg':
      return require('@assets/menu/egg.png')
    case 'frozen veg':
      return require('@assets/menu/frozen.png')
    case 'homecare':
      return require('@assets/menu/homecare.png')
    case 'pet care':
      return require('@assets/menu/pet.png')

    default:
      return require('@assets/menu/beverages.png')
  }
}

export const isInCategory = (category: string) => {
  switch (category) {
    case 'beverages':
      return true
    case 'bread & bakery':
      return true
    case 'vegetables':
      return true
    case 'fruit':
      return true
    case 'egg':
      return true
    case 'frozen veg':
      return true
    case 'homecare':
      return true
    case 'pet care':
      return true

    default:
      return false
  }
}
