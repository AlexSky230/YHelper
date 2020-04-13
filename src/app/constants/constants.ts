export enum appColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn',
}

export enum buttonIcons {
  add = 'plus',
  delete = 'trash-2-outline'
}

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

export enum routerWeatherPath {
  empty = '',
  week = 'week',
  radar = 'radar',
  today = 'today',
}

export const MainNav = {
  todo: { title: 'Todo', icon: 'format_list_numbered', link: routerMainPath.todo },
  weather: { title: 'Weather', icon: 'filter_drama', link: routerMainPath.weather },
  shoppingList: { title: 'Shopping List', icon: 'shopping_cart', link: routerMainPath.shopping },
  fridgeInventory: { title: 'Fridge Inventory', icon: 'storage', link: routerMainPath.fridge },
  search: { title: 'Search', icon: 'search', link: routerMainPath.search },
};


