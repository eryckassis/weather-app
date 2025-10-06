import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { getWeatherByCity } from "../services/weatherApi";

interface WeatherData {
  name: string;
  main: { temp: number };
  sys: { country: string; state?: string; sunrise: number; sunset: number };
  weather: { description: string }[];
}

const HomePage: React.FC = () => {
  const [city, setCity] = useState("Taubaté");
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getWeatherByCity(city)
      .then(setWeather)
      .catch(() => {
        setWeather(null);
        setError("Erro ao buscar dados do clima");
      })
      .finally(() => setLoading(false));
  }, [city]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!search.trim()) return;
    setCity(search.trim());
    setSearch("");
  }

  if (loading || !weather) {
    return (
      <main style={mainStyle}>
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSubmit={handleSearch}
        />
        <div style={infoStyle}>Carregando localização...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={mainStyle}>
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSubmit={handleSearch}
        />
        <div style={infoStyle}>
          <span style={{ color: "red" }}>{error}</span>
        </div>
      </main>
    );
  }

  function formatSunTime(unix: number) {
    const d = new Date(unix * 1000);
    return d
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/^0/, "");
  }

  function getSunDuration(sunrise: number, sunset: number) {
    const diff = (sunset - sunrise) / 3600;
    const hours = Math.floor(diff);
    const minutes = Math.round((diff - hours) * 60);
    return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
  }

  return (
    <main style={mainStyle}>
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSubmit={handleSearch}
      />

      <div style={topBarStyle}>
        <span role="img" aria-label="clock" style={{ fontSize: 0 }}></span>
        <div>
          <button style={buttonStyle}></button>
          <button
            style={{ ...buttonStyle, borderBottom: "0px solid #111" }}
          ></button>
        </div>
      </div>

      <div style={contentStyle}>
        <div style={clockStyle}>
          {new Date().getHours().toString().padStart(2, "0")}
          <br />
          {new Date().getMinutes().toString().padStart(2, "0")}
          <span style={{ fontSize: 0, color: "#fffcfdff", marginLeft: 8 }}>
            {new Date().getSeconds().toString().padStart(2, "0")}
          </span>
        </div>

        <div style={dateStyle}>
          {new Date().toLocaleDateString("pt-br", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}
        </div>

        <div style={tempStyle}>{Math.round(weather.main.temp)}°C</div>

        <div style={locationStyle}>
          {weather.name},<br />
          {weather.sys?.state ? weather.sys.state + "," : ""}
          {weather.sys.country}
        </div>

        <div style={{ fontSize: 0, color: "#444" }}>
          Sun{" "}
          <span role="img" aria-label="sun">
            ☀️
          </span>{" "}
          {getSunDuration(weather.sys.sunrise, weather.sys.sunset)}
          <br />
          {`${formatSunTime(weather.sys.sunrise)} - ${formatSunTime(weather.sys.sunset)}`}
        </div>

        <div style={descStyle}>
          <strong></strong> {weather.weather[0].description}
        </div>
      </div>
    </main>
  );
};

const mainStyle: React.CSSProperties = {
  minHeight: "100vh",
  minWidth: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: "url('/images/dudububuchuva.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#111",
  fontFamily: "Inter, Arial, sans-serif",
  position: "relative",
};

const topBarStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 400,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
};

const buttonStyle: React.CSSProperties = {
  marginRight: 8,
  padding: "0.3em 1em",
  borderRadius: "20px",
  border: "none",
  background: "#a2f0f0ff",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "min(90vw, 400px)",
};

const clockStyle: React.CSSProperties = {
  fontSize: 96,
  fontWeight: 700,
  lineHeight: 1,
  background: "linear-gradient(140deg, #ffffffff, #ffffffff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

const dateStyle: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  fontWeight: 600,
  fontSize: 29,
  marginLeft: 150,
  marginTop: "-8rem",
  padding: "2",
  background: "linear-gradient(140deg, #ffffffff, #ffffffff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

const tempStyle: React.CSSProperties = {
  fontSize: 40,
  fontWeight: 700,
  marginTop: 8,
  marginLeft: 60,
  textAlign: "center",
  background: "linear-gradient(150deg, #ffffffff, #ededed)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  width: "100%",
};

const locationStyle: React.CSSProperties = {
  fontSize: "50px",
  fontWeight: 700,
  marginBottom: 7,
  marginRight: 150,
  marginTop: "2rem",
  background: "linear-gradient(140deg, #fcfcfcff, #ffffffff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const descStyle: React.CSSProperties = {
  marginTop: 100,
  fontSize: 30,
  fontWeight: 700,
  background: "linear-gradient(130deg, #f8f0f0ff, #fffcfcff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

const infoStyle: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 600,
  marginTop: 40,
  color: "#888",
};

export default HomePage;
