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

export enum weatherCard {
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

export enum weatherIcons {
  'clear-day' = 'wi wi-day-sunny',
  'clear-night' = 'wi wi-night-clear',
  'partly-cloudy-day' = 'wi wi-day-cloudy',
  'partly-cloudy-night' = 'wi wi-night-alt-cloudy',
  'cloudy' = 'wi wi-cloudy',
  'rain' = 'wi wi-rain',
  'wind' = 'wi wi-strong-wind',
  'hail' = 'wi wi-hail',
}

export const LOCATIONS = {
  currentLocation: {
    key: 'currentLocation',
    title: 'Current Location',
    latitude: undefined,
    longitude: undefined,
    radarLink: 'http://www.bom.gov.au/products/IDR663.loop.shtml'
  },
  goldCoast: {
    key: 'goldCoast',
    title: 'Gold Coast',
    latitude: -28.0167,
    longitude: 153.4000,
    radarLink: 'http://www.bom.gov.au/products/IDR663.loop.shtml'
  },
  brisbane: {
    key: 'brisbane',
    title: 'Brisbane',
    latitude: -27.4698,
    longitude: 153.0251,
    radarLink: 'http://www.bom.gov.au/products/IDR663.loop.shtml'
  },
  sydney: {
    key: 'sydney',
    title: 'Sydney',
    latitude: -33.8708,
    longitude: 151.2073,
    radarLink: 'http://www.bom.gov.au/products/IDR713.loop.shtml',
  },
  melbourne: {
    key: 'melbourne',
    title: 'Melbourne',
    latitude: -37.8136,
    longitude: 144.9631,
    radarLink: 'http://www.bom.gov.au/products/IDR023.loop.shtml',
  },
  perth: {
    key: 'perth',
    title: 'Perth',
    latitude: -31.9505,
    longitude: 115.8605,
    radarLink: 'http://www.bom.gov.au/products/IDR703.loop.shtml#skip',
  },
  canberra: {
    key: 'canberra',
    title: 'Canberra',
    latitude: -35.2809,
    longitude: 149.1300,
    radarLink: 'http://www.bom.gov.au/products/IDR403.loop.shtml',
  },
};

export const MAIN_NAV = {
  todo: {key: 'todo', title: 'Todo', icon: 'format_list_numbered', link: routerMainPath.todo},
  weather: {key: 'weather', title: 'Weather', icon: 'filter_drama', link: routerMainPath.weather},
  shoppingList: {key: 'shoppingList', title: 'Shopping List', icon: 'shopping_cart', link: routerMainPath.shopping},
  fridgeInventory: {key: 'fridgeInventory', title: 'Fridge Inventory', icon: 'storage', link: routerMainPath.fridge},
  search: {key: 'search', title: 'Search', icon: 'search', link: routerMainPath.search},
};

export const WEATHER_TABS = {
  today: {title: 'Today', link: routerWeatherPath.today},
  week: {title: '7 Days', link: routerWeatherPath.week},
  radar: {title: 'Radar', link: routerWeatherPath.radar},
};




