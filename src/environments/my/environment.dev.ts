export const COUNTRY = {
  COUNTRY_CODE: 'my',
};

export const environment = {
  ...COUNTRY,
  production: true,
  SERVER_API_URL: 'https://api.smoss-dev.apac.bmw.cloud',
  CHAT_SERVER_URL: 'https://api.smoss-dev.apac.bmw.cloud',
  CHAT_ENVIRONMENT: 'dev',
  HEADER_ENVIRONMENT: 'uat',
  DEPLOY_ENVIRONMENT: 'UAT',
  DEBUG_INFO_ENABLED: false,
  i18n_LOCATION: `assets/i18n/${COUNTRY.COUNTRY_CODE}/`,
  INITIAL_LOAD_TITLE: 'BMW Malaysia Online Shop',
  SF_HOST: '',
  locale: '',
  channels: 'SMOSS',
  currency: 'MYR',
  author: 'ust-india',
  customerType: 'customer',
  GCDM_LOGOUT: 'https://customer-i.bmwgroup.com/oneid/logout.html',
  GCDM_LOGIN: 'https://customer-i.bmwgroup.com/oneid/#/login',
  GCDM_REGISTER: 'https://customer-i.bmwgroup.com/oneid/#/register',
  image_URL: 'https://static.smoss.apac.bmw.cloud',
  EVE_THUMBNAIL_PATH: 'https://static.smoss.apac.bmw.cloud/bmw-admin-portal/my_eve_images_non_production/',
};

export const ROUTE_CONFIG = {
  SUBSCRIPTION: false,
  ONLY_SUBSCRIPTION: false
}

export const details_config = {
  paymentDisclaimer: false,
  PPWDisclaimer: false,
  MRDPPriceTooltip: false,
  generalPriceTooltip: false,
  availability:false,
  availabilityTooltip:false,
  monthlyInstalment:true,
  monthlyInsNumFilter:true,
  monthlyInstalmentInfo:false,
  monthlyInstalmentAst:true,
  ucpFavDealer:false,
  vssDealerSelect:false,
  saveCartDependRFQ:false,
  preHeadingModel:false
}

export const home_config = {
  showNewCars:true,
  percentageDisplay : false,
  showInstalmentFilter : true,
  showUsedCars : true,
  showHomeLink : false,
  showDisclimar:false,
  showAllModels : true
}

export const SESSION_CONFIG = {
  timeOut : 600
};