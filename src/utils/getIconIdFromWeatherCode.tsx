export const getIconIdFromWeatherCode = (code: number): string => {
  switch (true) {
    case code === 0:
      return "sun"; // ☀️ Ясне небо
    case code === 1:
      return "cloud-sun"; // 🌤 Частково хмарно
    case code === 2 || code === 3:
      return "cloud"; // ☁️ Хмарно/Похмуро
    case code === 45 || code === 48:
      return "fog"; // 🌫 Туман
    case code >= 51 && code <= 57:
      return "drizzle"; // 🌦 Мряка
    case code >= 61 && code <= 67:
      return "rain"; // 🌧 Дощ
    case code >= 71 && code <= 77:
      return "snow"; // ❄️ Сніг
    case code >= 80 && code <= 82:
      return "showers"; // 🌦 Зливи
    case code >= 85 && code <= 86:
      return "snow-showers"; // 🌨 Снігопад
    case code >= 95 && code <= 99:
      return "thunder"; // ⛈ Гроза
    default:
      return "unknown"; // Не відомо
  }
};
