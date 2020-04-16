export enum appColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn',
}

export enum buttonIcons {
  add = 'add',
  delete = 'trash-2-outline',
  clear = 'close',
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

export const LOCATIONS = {
  currentLocation: {title: 'Current Location', latitude: -28.0167, longitude: 153.4000},
  goldCoast: {title: 'Gold Coast', latitude: -28.0167, longitude: 153.4000},
  brisbane: {title: 'Brisbane', latitude: -27.4698, longitude: 153.0251},
  sydney: {title: 'Sydney', latitude: -33.8708, longitude: 151.2073},
  melbourne: {title: 'Melbourne', latitude: -37.8136, longitude: 144.9631},
  perth: {title: 'Perth', latitude: -31.9505, longitude: 115.8605},
  canberra: {title: 'Canberra',  latitude: -35.2809, longitude: 149.1300},
};

export const MAIN_NAV = {
  todo: { title: 'Todo', icon: 'format_list_numbered', link: routerMainPath.todo },
  weather: { title: 'Weather', icon: 'filter_drama', link: routerMainPath.weather },
  shoppingList: { title: 'Shopping List', icon: 'shopping_cart', link: routerMainPath.shopping },
  fridgeInventory: { title: 'Fridge Inventory', icon: 'storage', link: routerMainPath.fridge },
  search: { title: 'Search', icon: 'search', link: routerMainPath.search },
};


