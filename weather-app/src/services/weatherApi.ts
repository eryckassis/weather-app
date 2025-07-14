const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherByCity(city: string, lang = "pt_br") {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=${lang}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erro ao buscar dados do clima");
  return response.json();
}
