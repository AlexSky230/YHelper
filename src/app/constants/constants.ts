export enum ButtonIcons {
  add = 'add',
  addToCart = 'add_shopping_cart',
  clear = 'close',
  delete = 'delete_outline',
  done = 'done',
  addToList = 'playlist_add',
  edit = 'edit',
  expandMore = 'expand_more',
  expandLess = 'expand_less',
  info = 'info',
  filterList = 'filter_list',
  toFridge = 'move_to_inbox',
  remove = 'remove',
}

export enum RouterMainPath {
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

export enum RouterWeatherPath {
  empty = '',
  week = 'week',
  radar = 'radar',
  today = 'today',
}

export enum CoreLabels {
  add = 'ADD',
  all = 'all',
  activeShelfItem = 'activeShelfItem',
  addItem = 'Add Item...',
  addTask = 'Add task...',
  allDone = 'All done!',
  category = 'Category: ',
  close = 'CLOSE',
  fridgeItems = 'fridgeItems',
  googleSearch = 'Google search...',
  leftToGo = '  left to go...',
  linkPlaceholder = 'https://www.',
  shoppingItems = 'shoppingItems',
  shoppingItemsOld = 'shoppingItemsOld',
  toDo = 'To Do',
}

export enum NamesForService {
  forecast = 'Forecast',
  forecastTime = 'ForecastTime',
  lastSavedLocation = 'lastSavedLocation',
}
export enum WeatherCard {
  chanceOfRain = 'Chance of rain: ',
  coldest = 'Coldest during night: ',
  degree = '°',
  humidity = 'Humidity: ',
  hottest = 'Hottest during day: ',
  metersPerSec = ' m/s',
  percent = '%',
  rainIntensity = 'Rain intensity: ',
  uv = 'UV index: ',
  windSpeed = 'Wind speed: ',
}

export enum WeatherIcons {
  'clear-day' = 'wi wi-day-sunny',
  'clear-night' = 'wi wi-night-clear',
  'partly-cloudy-day' = 'wi wi-day-cloudy',
  'partly-cloudy-night' = 'wi wi-night-alt-cloudy',
  'cloudy' = 'wi wi-cloudy',
  'rain' = 'wi wi-rain',
  'wind' = 'wi wi-strong-wind',
  'hail' = 'wi wi-hail',
}

export const CORE_ITEMS = {
  vegetables: {
    key: 'vegetables',
    title: 'Vegetables and Fruits',
    color: '#57b053',
    isBought: undefined,
    quantity: undefined,
    id : undefined,
    order: 1
  },
  meat: {
    key: 'meat',
    title: 'Meat and Fish',
    color: '#eb4334',
    isBought: undefined,
    quantity: undefined,
    id : undefined,
    order: 2
  },
  dairy: {
    key: 'dairy',
    title: 'Dairy Products',
    color: '#dce8f0',
    isBought: undefined,
    quantity: undefined,
    id : undefined,
    order: 3
  },
  drinks: {
    key: 'drinks',
    title: 'Drinks',
    color: '#58c7ef',
    isBought: undefined,
    quantity: undefined,
    id : undefined,
    order: 4
  },
  bread: {
    key: 'bread',
    title: 'Bread and Eggs',
    color: '#f8ab3e',
    isBought: undefined,
    quantity: undefined,
    id : undefined,
    order: 5
  },
  frozen: {
    key: 'frozen',
    title: 'Frozen Food',
    color: '#ae74e6',
    isBought: undefined,
    quantity: undefined,
    id : undefined,
    order: 6
  },
  default: {
    key: 'other',
    title: 'Other',
    color: '#9e9e9e',
    isBought: undefined,
    quantity: undefined,
    id : undefined,
    order: 9
  },
};

export const LOCATIONS = {
  currentLocation: {
    key: 'currentLocation',
    title: 'Current Location',
    latitude: null,
    longitude: null,
    radarLink: 'http://www.bom.gov.au/products/IDR663.loop.shtml',
    index: 0,
  },
  goldCoast: {
    key: 'goldCoast',
    title: 'Gold Coast',
    latitude: -28.0167,
    longitude: 153.4000,
    radarLink: 'http://www.bom.gov.au/products/IDR663.loop.shtml',
    index: 1,
  },
  brisbane: {
    key: 'brisbane',
    title: 'Brisbane',
    latitude: -27.4698,
    longitude: 153.0251,
    radarLink: 'http://www.bom.gov.au/products/IDR663.loop.shtml',
    index: 2,
  },
  sydney: {
    key: 'sydney',
    title: 'Sydney',
    latitude: -33.8708,
    longitude: 151.2073,
    radarLink: 'http://www.bom.gov.au/products/IDR713.loop.shtml',
    index: 3,
  },
  melbourne: {
    key: 'melbourne',
    title: 'Melbourne',
    latitude: -37.8136,
    longitude: 144.9631,
    radarLink: 'http://www.bom.gov.au/products/IDR023.loop.shtml',
    index: 4,
  },
  perth: {
    key: 'perth',
    title: 'Perth',
    latitude: -31.9505,
    longitude: 115.8605,
    radarLink: 'http://www.bom.gov.au/products/IDR703.loop.shtml#skip',
    index: 5,
  },
  canberra: {
    key: 'canberra',
    title: 'Canberra',
    latitude: -35.2809,
    longitude: 149.1300,
    radarLink: 'http://www.bom.gov.au/products/IDR403.loop.shtml',
    index: 6,
  },
};

export const MAIN_NAV = {
  todo: {key: 'todo', title: 'Todo', icon: 'format_list_numbered', link: RouterMainPath.todo},
  weather: {key: 'weather', title: 'Weather', icon: 'filter_drama', link: RouterMainPath.weather},
  shoppingList: {key: 'shoppingList', title: 'Shopping List', icon: 'shopping_cart', link: RouterMainPath.shopping},
  fridgeInventory: {key: 'fridgeInventory', title: 'Fridge Inventory', icon: 'storage', link: RouterMainPath.fridge},
  search: {key: 'search', title: 'Search', icon: 'search', link: RouterMainPath.search},
};

export const WEATHER_TABS = {
  today: {key: 'today', title: 'Today', link: RouterWeatherPath.today},
  week: {key: 'week', title: '7 Days', link: RouterWeatherPath.week},
  radar: {key: 'radar', title: 'Radar', link: RouterWeatherPath.radar},
};




