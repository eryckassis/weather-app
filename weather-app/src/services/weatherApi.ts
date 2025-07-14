const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeatherByCity(city: string, lang = "pt_br") {
  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=${lang}`,
  );
  if (!response.ok) {
    throw new Error("Não foi possível obter os dados do tempo");
  }
  return response.json();
}
