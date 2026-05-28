import { useState, useEffect } from 'react';

export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'storm';

interface WeatherData {
  type: WeatherType;
  temperature: number;
  description: string;
  bgImage: string;
}

// Open-Meteo WMO weather code mapping
function getWeatherType(code: number): { type: WeatherType; description: string } {
  // 0: Clear sky
  if (code === 0) return { type: 'sunny', description: '晴天' };
  // 1-3: Partly cloudy / Overcast
  if (code >= 1 && code <= 3) return { type: 'cloudy', description: '多雲' };
  // 45, 48: Fog
  if (code === 45 || code === 48) return { type: 'cloudy', description: '有霧' };
  // 51-55: Drizzle
  if (code >= 51 && code <= 55) return { type: 'rainy', description: '毛毛雨' };
  // 56-57: Freezing drizzle
  if (code >= 56 && code <= 57) return { type: 'rainy', description: '雨' };
  // 61-65: Rain
  if (code >= 61 && code <= 65) return { type: 'rainy', description: '雨天' };
  // 66-67: Freezing rain
  if (code >= 66 && code <= 67) return { type: 'rainy', description: '雨' };
  // 71-77: Snow
  if (code >= 71 && code <= 77) return { type: 'rainy', description: '雪' };
  // 80-82: Rain showers
  if (code >= 80 && code <= 82) return { type: 'rainy', description: '陣雨' };
  // 85-86: Snow showers
  if (code >= 85 && code <= 86) return { type: 'rainy', description: '雪' };
  // 95-99: Thunderstorm
  if (code >= 95 && code <= 99) return { type: 'storm', description: '雷陣雨' };
  return { type: 'cloudy', description: '多雲' };
}

const bgMap: Record<WeatherType, string> = {
  sunny: '/bg-weather-sunny.jpg',
  cloudy: '/bg-weather-cloudy.jpg',
  rainy: '/bg-weather-rainy.jpg',
  storm: '/bg-weather-storm.jpg',
};

export function useWeather(): WeatherData {
  const [weather, setWeather] = useState<WeatherData>({
    type: 'sunny',
    temperature: 0,
    description: '載入中...',
    bgImage: bgMap.sunny,
  });

  useEffect(() => {
    // New Taipei City coordinates
    const lat = 25.012;
    const lon = 121.465;

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    )
      .then((res) => res.json())
      .then((data) => {
        const code = data.current_weather?.weathercode ?? 0;
        const temp = data.current_weather?.temperature ?? 0;
        const { type, description } = getWeatherType(code);
        setWeather({
          type,
          temperature: temp,
          description,
          bgImage: bgMap[type],
        });
      })
      .catch(() => {
        // Fallback to sunny
        setWeather({
          type: 'sunny',
          temperature: 28,
          description: '晴天',
          bgImage: bgMap.sunny,
        });
      });
  }, []);

  return weather;
}
