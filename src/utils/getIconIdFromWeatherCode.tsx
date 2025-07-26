export const selectWeatherIcon = (weatherSelector: number): string => {
  switch (true) {
    case weatherSelector === 0:
      return "sun"; // ☀️ Ясне небо

    case weatherSelector >= 1 && weatherSelector <= 3:
      return "cloud"; // 🌤 Частково хмарно, хмарно

    case weatherSelector === 45 || weatherSelector === 48:
      return "fog"; // 🌫 Туман або іній

    case weatherSelector >= 51 && weatherSelector <= 55:
      return "drizzle"; // 🌦 Мряка

    case weatherSelector >= 56 && weatherSelector <= 57:
      return "freezing_drizzle"; // 🌧❄️ Мряка з морозом

    case weatherSelector >= 61 && weatherSelector <= 65:
      return "rain"; // 🌧 Дощ різної інтенсивності

    case weatherSelector >= 66 && weatherSelector <= 67:
      return "freezing_rain"; // ❄️🌧 Дощ з морозом

    case weatherSelector >= 71 && weatherSelector <= 75:
      return "snow"; // 🌨 Сніг

    case weatherSelector === 77:
      return "snow_grains"; // 🌨 Маленькі сніжинки

    case weatherSelector >= 80 && weatherSelector <= 82:
      return "rain_showers"; // 🌦 Зливи

    case weatherSelector === 85 || weatherSelector === 86:
      return "snow_showers"; // 🌨 Короткі снігові зливи

    case weatherSelector === 95:
      return "thunderstorm"; // ⛈ Гроза без граду

    case weatherSelector === 96 || weatherSelector === 99:
      return "thunderstorm_hail"; // ⛈❄️ Гроза з градом

    default:
      return "unknown";
  }
};
