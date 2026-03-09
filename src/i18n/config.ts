import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ru: {
    translation: {
      // Navigation
      home: "Главная",
      catalog: "Каталог",
      sell: "Продать авто",
      favorites: "Избранное",
      profile: "Профиль",
      admin: "Админ",
      search: "Поиск",
      addListing: "Добавить",

      // Entry Modal
      welcomeTitle: "Добро пожаловать в Lux Auto",
      welcomeSubtitle:
        "Ваш путь в мир самых эксклюзивных роскошных автомобилей",
      whatIsYourGoal: "Какова ваша цель сегодня?",
      buyLuxuryCar: "Купить роскошный автомобиль",
      sellLuxuryCar: "Продать роскошный автомобиль",
      explorePremiumCars:
        "Исследуйте нашу эксклюзивную коллекцию премиальных автомобилей",
      listLuxuryVehicle:
        "Разместите свой роскошный автомобиль для нашей элитной аудитории",

      // Auth
      signIn: "Войти",
      signUp: "Регистрация",
      signOut: "Выйти",
      signInWithGoogle: "Войти через Google",
      continueWithGoogle: "Продолжить с Google",
      emailPlaceholder: "Email адрес",
      passwordPlaceholder: "Пароль",
      dontHaveAccount: "Нет аккаунта?",
      alreadyHaveAccount: "Уже есть аккаунт?",
      createAccount: "Создать аккаунт",

      // Sell Flow
      createListing: "Создать объявление",
      listingDetails: "Детали объявления",
      carBrand: "Марка автомобиля",
      model: "Модель",
      year: "Год",
      mileage: "Пробег",
      price: "Цена",
      engineType: "Тип двигателя",
      transmission: "Трансмиссия",
      exteriorColor: "Цвет кузова",
      interiorColor: "Цвет салона",
      description: "Описание",
      uploadImages: "Загрузить фото",
      location: "Местоположение",
      contactDetails: "Контактные данные",
      submit: "Отправить",
      publishListing: "Опубликовать",
      sellSignInText:
        "Пожалуйста, войдите чтобы разместить ваш люксовый автомобиль",
      sellSubtitle:
        "Разместите ваш люксовый автомобиль для нашей эксклюзивной аудитории",
      vehicleInformation: "Информация об автомобиле",
      brandExample: "например Rolls-Royce",
      modelExample: "например Phantom VIII",
      cityCountry: "Город, страна",
      descriptionPlaceholder: "Подробно опишите ваш автомобиль...",
      phoneOrEmail: "Телефон или email",
      select: "Выберите...",
      automatic: "Автомат",
      manual: "Механика",
      semiAutomatic: "Полуавтомат",
      clickUploadImages: "Нажмите чтобы загрузить изображения",
      uploadHighRes: "Загрузите изображения высокого качества (PNG, JPG, JPEG)",
      publishing: "Публикация...",
      signedInSuccess: "Успешный вход!",
      signInFailed: "Ошибка входа",
      signInRequired: "Войдите чтобы создать объявление",
      uploadOneImage: "Загрузите хотя бы одно изображение",
      listingPublished: "Объявление успешно опубликовано!",
      listingFailed: "Ошибка создания объявления",

      // Buy Flow
      luxuryCatalog: "Каталог люкс",
      filterBy: "Фильтр",
      priceRange: "Диапазон цен",
      allBrands: "Все марки",
      viewDetails: "Подробнее",
      contactSeller: "Связаться с продавцом",
      scheduleViewing: "Запланировать показ",
      addToFavorites: "В избранное",
      removeFromFavorites: "Удалить из избранного",
      specifications: "Характеристики",
      sellerContact: "Контакт продавца",

      // Admin
      userManagement: "Управление пользователями",
      listingModeration: "Модерация объявлений",
      analytics: "Аналитика",
      totalListings: "Всего объявлений",
      activeUsers: "Активных пользователей",
      approve: "Одобрить",
      reject: "Отклонить",
      remove: "Удалить",
      featureOnHomepage: "На главную",
      adminDashboard: "Админ Панель",
      managePlatform: "Управление платформой Lux Auto",
      approved: "Одобрено",
      pending: "В ожидании",
      platformAnalytics: "Аналитика платформы",
      totalPlatformValue: "Общая стоимость объявлений",
      averageListingPrice: "Средняя цена объявления",
      feature: "Сделать Featured",
      unfeature: "Убрать Featured",
      featured: "Рекомендовано",
      confirmDeleteListing: "Вы уверены, что хотите удалить это объявление?",
      listingDeleted: "Объявление удалено",

      // Common
      loading: "Загрузка...",
      noResults: "Ничего не найдено",
      required: "Обязательно",
      optional: "Необязательно",
      save: "Сохранить",
      cancel: "Отмена",
      delete: "Удалить",
      edit: "Редактировать",
      back: "Назад",
      next: "Далее",

      // Validation
      minPrice: "Минимальная цена $100,000",
      requiredField: "Это поле обязательно",

      // Languages
      language: "Язык",
      english: "English",
      russian: "Русский",
      kyrgyz: "Кыргызча",

      //Favorites
      favoritesSubtitle: "Ваша коллекция роскошных автомобилей",
      noFavorites: "Пока нет избранных",
      startCollection: "Начните создавать коллекцию автомобилей",
      exploreCatalog: "Открыть каталог",
      accountSubtitle: "Управляйте своим аккаунтом Lux Auto",

      //Catalog
      catalogSubtitle:
        "Исследуйте нашу эксклюзивную коллекцию роскошных автомобилей",
      searchPlaceholder: "Поиск по марке, модели или описанию...",
      filters: "Фильтры",
      resetAll: "Сбросить",
      vehiclesFound: "автомобилей найдено",
      adjustFilters: "Попробуйте изменить фильтры или поиск",

      //Profile
      welcome: "Добро пожаловать в Lux Auto",
      signInPrompt:
        "Войдите, чтобы получить доступ к коллекции элитных автомобилей",
      successSignIn: "Вход выполнен успешно!",
      failedSignIn: "Не удалось войти",
      termsAndPrivacy:
        "Войдя, вы соглашаетесь с нашими Условиями использования и Политикой конфиденциальности",
      manageAccount: "Управляйте своей учетной записью Lux Auto",
      memberSince: "Член с",
      listings: "Объявления",
      viewSavedVehicles: "Просмотреть сохраненные автомобили",
      listYourCar: "Добавить автомобиль",
      createNewListing: "Создать новое объявление",
      manageUsersListingsAnalytics:
        "Управление пользователями, объявлениями и аналитикой",

      //Home
      luxuryRedefined: "РОСКОШЬ НОВОГО УРОВНЯ",
      discoverLuxury:
        "Откройте для себя самые эксклюзивные роскошные автомобили мира.",
      excellencePerfection: "Где совершенство встречается с идеалом.",
      exploreCollection: "Посмотреть коллекцию",
      getStarted: "Начать",
      curatedExcellence: "Отборное совершенство",
      curatedExcellenceDesc:
        "Каждый автомобиль тщательно отобран по нашим строгим стандартам роскоши и производительности.",
      verifiedAuthenticity: "Подтверждённая подлинность",
      verifiedAuthenticityDesc:
        "Полная документация и проверка для каждого автомобиля.",
      eliteService: "Элитный сервис",
      eliteServiceDesc: "Персональный сервис для идеального опыта покупки.",
      featuredCollection: "Избранная коллекция",
      featuredCollectionDesc: "Отобранные шедевры автомобильного искусства",
      viewFullCollection: "Посмотреть всю коллекцию",
      readyLuxury: "Готовы к элитной роскоши?",
      joinCommunity:
        "Присоединяйтесь к нашему сообществу любителей роскошных автомобилей.",
      getStartedToday: "Начать сейчас",
      featured: "ИЗБРАННОЕ",
    },
  },
  en: {
    translation: {
      // Navigation
      home: "Home",
      catalog: "Catalog",
      sell: "Sell Your Car",
      favorites: "Favorites",
      profile: "Profile",
      admin: "Admin",
      search: "Search",
      addListing: "Add Listing",

      // Entry Modal
      welcomeTitle: "Welcome to Lux Auto",
      welcomeSubtitle:
        "Your gateway to the world's most exclusive luxury automobiles",
      whatIsYourGoal: "What is your goal today?",
      buyLuxuryCar: "Buy a Luxury Car",
      sellLuxuryCar: "Sell a Luxury Car",
      explorePremiumCars:
        "Explore our exclusive collection of premium automobiles",
      listLuxuryVehicle: "List your luxury vehicle with our elite clientele",

      // Auth
      signIn: "Sign In",
      signUp: "Sign Up",
      signOut: "Sign Out",
      signInWithGoogle: "Sign In with Google",
      continueWithGoogle: "Continue with Google",
      emailPlaceholder: "Email address",
      passwordPlaceholder: "Password",
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: "Already have an account?",
      createAccount: "Create Account",

      // Sell Flow
      createListing: "Create Listing",
      listingDetails: "Listing Details",
      carBrand: "Car Brand",
      model: "Model",
      year: "Year",
      mileage: "Mileage",
      price: "Price",
      engineType: "Engine Type",
      transmission: "Transmission",
      exteriorColor: "Exterior Color",
      interiorColor: "Interior Color",
      description: "Description",
      uploadImages: "Upload Images",
      location: "Location",
      contactDetails: "Contact Details",
      submit: "Submit",
      publishListing: "Publish Listing",
      sellSignInText:
        "Please sign in to list your luxury vehicle with Lux Auto",
      sellSubtitle: "List your luxury vehicle with our exclusive clientele",
      vehicleInformation: "Vehicle Information",
      brandExample: "e.g., Rolls-Royce",
      modelExample: "e.g., Phantom VIII",
      cityCountry: "City, Country",
      descriptionPlaceholder: "Describe your luxury vehicle in detail...",
      phoneOrEmail: "Phone or email",
      select: "Select...",
      automatic: "Automatic",
      manual: "Manual",
      semiAutomatic: "Semi-Automatic",
      clickUploadImages: "Click to upload images",
      uploadHighRes: "Upload high-resolution images (PNG, JPG, JPEG)",
      publishing: "Publishing...",
      signedInSuccess: "Successfully signed in!",
      signInFailed: "Failed to sign in",
      signInRequired: "Please sign in to create a listing",
      uploadOneImage: "Please upload at least one image",
      listingPublished: "Listing published successfully!",
      listingFailed: "Failed to create listing",

      // Buy Flow
      luxuryCatalog: "Luxury Catalog",
      filterBy: "Filter By",
      priceRange: "Price Range",
      allBrands: "All Brands",
      viewDetails: "View Details",
      contactSeller: "Contact Seller",
      scheduleViewing: "Schedule Viewing",
      addToFavorites: "Add to Favorites",
      removeFromFavorites: "Remove from Favorites",
      specifications: "Specifications",
      sellerContact: "Seller Contact",

      // Admin
      userManagement: "User Management",
      listingModeration: "Listing Moderation",
      analytics: "Analytics",
      totalListings: "Total Listings",
      activeUsers: "Active Users",
      approve: "Approve",
      reject: "Reject",
      remove: "Remove",
      featureOnHomepage: "Feature on Homepage",
      adminDashboard: "Admin Dashboard",
      managePlatform: "Manage your Lux Auto platform",
      approved: "Approved",
      pending: "Pending",
      platformAnalytics: "Platform Analytics",
      totalPlatformValue: "Total Platform Value",
      averageListingPrice: "Average Listing Price",
      feature: "Feature",
      unfeature: "Unfeature",
      featured: "Featured",
      confirmDeleteListing: "Are you sure you want to delete this listing?",
      listingDeleted: "Listing deleted",

      // Common
      loading: "Loading...",
      noResults: "No results found",
      required: "Required",
      optional: "Optional",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      back: "Back",
      next: "Next",

      // Validation
      minPrice: "Minimum price is $100,000",
      requiredField: "This field is required",

      // Languages
      language: "Language",
      english: "English",
      russian: "Russian",
      kyrgyz: "Kyrgyz",

      //Favorites
      favoritesSubtitle: "Your luxury car collection",
      noFavorites: "No favorites yet",
      startCollection: "Start building your car collection",
      exploreCatalog: "Explore catalog",
      accountSubtitle: "Manage your Lux Auto account",

      //Catalog
      catalogSubtitle: "Explore our exclusive collection of luxury automobiles",
      searchPlaceholder: "Search by brand, model, or description...",
      filters: "Filters",
      resetAll: "Reset All",
      vehiclesFound: "vehicles found",
      adjustFilters: "Try adjusting your filters or search terms",

      //Profile
      welcome: "Welcome to Lux Auto",
      signInPrompt:
        "Sign in to access your exclusive luxury automobile collection",
      successSignIn: "Successfully signed in!",
      failedSignIn: "Failed to sign in",
      termsAndPrivacy:
        "By signing in, you agree to our Terms of Service and Privacy Policy",
      manageAccount: "Manage your Lux Auto account",
      memberSince: "Member since",
      listings: "Listings",
      viewSavedVehicles: "View your saved luxury vehicles",
      listYourCar: "List Your Car",
      createNewListing: "Create a new luxury vehicle listing",

      // Home
      luxuryRedefined: "LUXURY REDEFINED",
      discoverLuxury: "Discover the world's most exclusive luxury automobiles.",
      excellencePerfection: "Where excellence meets perfection.",
      exploreCollection: "Explore Collection",
      getStarted: "Get Started",
      curatedExcellence: "Curated Excellence",
      curatedExcellenceDesc:
        "Every vehicle is hand-selected to meet our stringent standards of luxury and performance.",
      verifiedAuthenticity: "Verified Authenticity",
      verifiedAuthenticityDesc:
        "Complete documentation and verification for every luxury automobile in our collection.",
      eliteService: "Elite Service",
      eliteServiceDesc:
        "Personalized concierge service to ensure your acquisition experience is seamless.",
      featuredCollection: "Featured Collection",
      featuredCollectionDesc:
        "Handpicked masterpieces of automotive excellence",
      viewFullCollection: "View Full Collection",
      readyLuxury: "Ready to Experience Elite Luxury?",
      joinCommunity:
        "Join our exclusive community of luxury automobile enthusiasts.",
      getStartedToday: "Get Started Today",
      featured: "FEATURED",
    },
  },

  ky: {
    translation: {
      // Navigation
      home: "Башкы",
      catalog: "Каталог",
      sell: "Унаа сатуу",
      favorites: "Тандалмалар",
      profile: "Профиль",
      admin: "Админ",
      search: "Издөө",
      addListing: "Кошуу",

      // Entry Modal
      welcomeTitle: "Lux Auto'ко кош келиңиз",
      welcomeSubtitle: "Дүйнөнүн эң эксклюзивдүү люкс автомобилдерине жол",
      whatIsYourGoal: "Бүгүн максатыңыз эмне?",
      buyLuxuryCar: "Люкс унаа сатып алуу",
      sellLuxuryCar: "Люкс унаа сатуу",
      explorePremiumCars:
        "Биздин премиум унаалардын эксклюзивдүү коллекциясын карап көрүңүз",
      listLuxuryVehicle:
        "Люкс унааңызды биздин элиталык кардарларга сунуштаңыз",

      // Auth
      signIn: "Кирүү",
      signUp: "Катталуу",
      signOut: "Чыгуу",
      signInWithGoogle: "Google аркылуу кирүү",
      continueWithGoogle: "Google менен улантуу",
      emailPlaceholder: "Email дареги",
      passwordPlaceholder: "Сыр сөз",
      dontHaveAccount: "Аккаунтуңуз жокпу?",
      alreadyHaveAccount: "Аккаунтуңуз барбы?",
      createAccount: "Аккаунт түзүү",

      // Sell Flow
      createListing: "Жарыя түзүү",
      listingDetails: "Жарыя маалыматы",
      carBrand: "Унаа маркасы",
      model: "Модель",
      year: "Жылы",
      mileage: "Жүрүш",
      price: "Баасы",
      engineType: "Кыймылдаткыч түрү",
      transmission: "Трансмиссия",
      exteriorColor: "Тышкы түсү",
      interiorColor: "Салон түсү",
      description: "Сүрөттөмө",
      uploadImages: "Сүрөт жүктөө",
      location: "Жайгашуу жери",
      contactDetails: "Байланыш маалыматы",
      submit: "Жөнөтүү",
      publishListing: "Жарыялоо",
      sellSignInText: "Люкс унааңызды жайгаштыруу үчүн кирүү керек",
      sellSubtitle: "Унааңызды биздин эксклюзивдүү кардарларга сунуштаңыз",
      vehicleInformation: "Унаа маалыматы",
      brandExample: "мисалы Rolls-Royce",
      modelExample: "мисалы Phantom VIII",
      cityCountry: "Шаар, өлкө",
      descriptionPlaceholder: "Унааңызды толук сүрөттөп бериңиз...",
      phoneOrEmail: "Телефон же email",
      select: "Тандаңыз...",
      automatic: "Автомат",
      manual: "Механика",
      semiAutomatic: "Жарым автомат",
      clickUploadImages: "Сүрөттөрдү жүктөө үчүн басыңыз",
      uploadHighRes: "Жогорку сапаттагы сүрөттөрдү жүктөңүз (PNG, JPG, JPEG)",
      publishing: "Жарыяланууда...",
      signedInSuccess: "Ийгиликтүү кирдиңиз!",
      signInFailed: "Кирүүдө ката",
      signInRequired: "Жарыя түзүү үчүн кирүү керек",
      uploadOneImage: "Кеминде бир сүрөт жүктөңүз",
      listingPublished: "Жарыя ийгиликтүү жарыяланды!",
      listingFailed: "Жарыя түзүүдө ката кетти",

      // Buy Flow
      luxuryCatalog: "Люкс каталог",
      filterBy: "Чыпка",
      priceRange: "Баа диапазону",
      allBrands: "Бардык маркалар",
      viewDetails: "Толук маалымат",
      contactSeller: "Сатуучу менен байланышуу",
      scheduleViewing: "Көрсөтмө пландоо",
      addToFavorites: "Тандалмаларга кошуу",
      removeFromFavorites: "Тандалмалардан өчүрүү",
      specifications: "Мүнөздөмөлөр",
      sellerContact: "Сатуучунун байланышы",

      // Admin
      userManagement: "Колдонуучуларды башкаруу",
      listingModeration: "Жарыяларды модерациялоо",
      analytics: "Аналитика",
      totalListings: "Бардык жарыялар",
      activeUsers: "Активдүү колдонуучулар",
      approve: "Бекитүү",
      reject: "Четке кагуу",
      remove: "Өчүрүү",
      featureOnHomepage: "Башкы бетке",
      adminDashboard: "Админ панел",
      managePlatform: "Lux Auto платформасын башкаруу",
      approved: "Макулдашылган",
      pending: "Күтүп жатат",
      platformAnalytics: "Платформа аналитикасы",
      totalPlatformValue: "Жалпы жарнак баасы",
      averageListingPrice: "Орточо жарнак баасы",
      feature: "Featured кылуу",
      unfeature: "Featured алып салуу",
      featured: "Featured",
      confirmDeleteListing: "Бул жарнакты чындап өчүргүңүз келеби?",
      listingDeleted: "Жарнак өчүрүлдү",

      // Common
      loading: "Жүктөлүүдө...",
      noResults: "Эч нерсе табылган жок",
      required: "Милдеттүү",
      optional: "Милдеттүү эмес",
      save: "Сактоо",
      cancel: "Жокко чыгаруу",
      delete: "Өчүрүү",
      edit: "Түзөтүү",
      back: "Артка",
      next: "Кийинки",

      // Validation
      minPrice: "Минималдуу баа $100,000",
      requiredField: "Бул талаа милдеттүү",

      // Languages
      language: "Тил",
      english: "English",
      russian: "Русский",
      kyrgyz: "Кыргызча",

      //Catalog
      catalogSubtitle: "Биздин эксклюзивдүү люкс унаалар коллекциясын көрүңүз",
      searchPlaceholder: "Марка, модель же сүрөттөмө боюнча издөө...",
      filters: "Фильтрлер",
      resetAll: "Баарын тазалоо",
      vehiclesFound: "унаа табылды",
      adjustFilters: "Фильтрлерди же издөөнү өзгөртүп көрүңүз",

      //Favorites
      favoritesSubtitle: "Сиздин люкс унаалар коллекцияңыз",
      noFavorites: "Азырынча тандалгандар жок",
      startCollection: "Унаалар коллекциясын түзө баштаңыз",
      exploreCatalog: "Каталогду ачуу",
      accountSubtitle: "Lux Auto аккаунтуңузду башкарыңыз",

      //Profile
      welcome: "Lux Auto'го кош келиңиз",
      signInPrompt: "Эксклюзивдүү автоунааларга кирүү үчүн кириңиз",
      successSignIn: "Кирүү ийгиликтүү болду!",
      failedSignIn: "Кирүү ишке ашкан жок",
      termsAndPrivacy:
        "Киргенде, Саясатыбызга жана Купуялуулук саясатына макул болосуз",
      manageAccount: "Lux Auto аккаунтуңузду башкаруу",
      memberSince: "Катталган күнү",
      listings: "Жарнактар",
      viewSavedVehicles: "Сакталган автоунааларды көрүү",
      listYourCar: "Автоунааны сатуу",
      createNewListing: "Жаңы жарнак түзүү",
      manageUsersListingsAnalytics:
        "Колдонуучуларды, жарнактарды жана аналитиканы башкаруу",

      // Home
      luxuryRedefined: "ЛЮКС ЖАҢЫ ДЕҢГЭЭЛДЕ",
      discoverLuxury: "Дүйнөдөгү эң эксклюзивдүү люкс унааларды табыңыз.",
      excellencePerfection: "Кемчиликсиздик менен мыктылык бир жерде.",
      exploreCollection: "Коллекцияны көрүү",
      getStarted: "Баштоо",
      curatedExcellence: "Тандалган мыктылык",
      curatedExcellenceDesc:
        "Ар бир унаа люкс жана сапат стандарттарына ылайык тандалган.",
      verifiedAuthenticity: "Чыныгы экени текшерилген",
      verifiedAuthenticityDesc:
        "Ар бир унаа үчүн толук документтер жана текшерүү бар.",
      eliteService: "Элиталык сервис",
      eliteServiceDesc:
        "Сатып алуу тажрыйбаңызды жеңил кылуу үчүн жеке кызмат.",
      featuredCollection: "Тандалган коллекция",
      featuredCollectionDesc: "Авто дүйнөсүнүн эң мыкты унаалары",
      viewFullCollection: "Толук коллекция",
      readyLuxury: "Элиталык люкска даярсызбы?",
      joinCommunity: "Люкс унаа сүйүүчүлөрүнүн коомчулугуна кошулуңуз.",
      getStartedToday: "Бүгүн баштаңыз",
      featured: "ТАНДАЛГАН",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
