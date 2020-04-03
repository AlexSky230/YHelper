export enum routerMainPath {
  empty = '',
  full = 'full',
  fridge = 'fridge',
  home = '/todo',
  search = 'search',
  shopping = 'shopping',
  todo = 'todo',
  weather = 'weather',
  wildcard = '**'
}

export enum weatherPath {
  empty = '',
  week = 'week',
  radar = 'radar',
  today = 'today',
}

export enum routerWeatherPath {
  empty = '',
  week = 'week',
  radar = 'radar',
  today = 'today',
}

export const MainNav = {
  todo: { title: 'Todo', icon: 'checkmark-circle-outline', link: routerMainPath.todo },
  weather: { title: 'Weather', icon: 'thermometer-plus', link: routerMainPath.weather },
  shoppingList: { title: 'Shopping List', icon: 'shopping-cart', link: routerMainPath.shopping },
  fridgeInventory: { title: 'Fridge Inventory', icon: 'shopping-bag', link: routerMainPath.fridge },
  search: { title: 'Search', icon: 'search-outline', link: routerMainPath.search },
};


