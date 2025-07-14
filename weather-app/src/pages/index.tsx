import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { getWeatherByCity } from "../services/weatherApi";

const HomePage = () => {
  const [city, setCity] = useState("Los Angeles");
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getWeatherByCity(city)
      .then(setWeather)
      .catch(() => setWeather(null))
      .finally(() => setLoading(false));
  }, [city]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      setCity(search.trim());
      setSearch("");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/images/dudububu.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#111",
        fontFamily: "Inter, Arial, sans-serif",
        position: "relative",
      }}
    >
      {/* Barra de Pesquisa estilizada */}
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSubmit={handleSearch}
      />

      {/* Top bar: clock icon and format toggle */}
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
        }}
      >
        <span role="img" aria-label="clock" style={{ fontSize: 24 }}>
          🕒
        </span>
        <div>
          <button
            style={{
              marginRight: 8,
              padding: "0.3em 1em",
              borderRadius: "20px",
              border: "none",
              background: "#eee",
            }}
          >
            12h
          </button>
          <button
            style={{
              padding: "0.3em 1em",
              borderRadius: "20px",
              border: "none",
              background: "#fff",
              borderBottom: "2px solid #111",
            }}
          >
            24h
          </button>
        </div>
      </div>

      {/* Main Info */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "min(90vw, 400px)",
        }}
      >
        {/* Clock */}
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1 }}>
          {loading || !weather
            ? "--"
            : new Date().getHours().toString().padStart(2, "0")}
          <br />
          {loading || !weather
            ? "--"
            : new Date().getMinutes().toString().padStart(2, "0")}
          <span
            style={{
              fontSize: 32,
              color: "#bbb",
              marginLeft: 8,
            }}
          >
            {loading || !weather
              ? "--"
              : new Date().getSeconds().toString().padStart(2, "0")}
          </span>
        </div>
        {/* DateInfo */}
        <div
          style={{
            fontSize: 24,
            margin: "0.5em 0 1.5em 0",
          }}
        >
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          })}
        </div>
        {/* Location */}
        <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>
          {loading || !weather ? (
            "Carregando localização..."
          ) : (
            <>
              {weather.name},<br />
              {weather.sys?.state ? weather.sys.state + "," : ""}
              <br />
              {weather.sys.country}
            </>
          )}
        </div>
        {/* SunInfo */}
        <div style={{ fontSize: 16, color: "#444" }}>
          Sun{" "}
          <span role="img" aria-label="sun">
            ☀️
          </span>{" "}
          {loading || !weather
            ? "--"
            : (() => {
                const sunrise = new Date(weather.sys.sunrise * 1000);
                const sunset = new Date(weather.sys.sunset * 1000);
                const diff = (weather.sys.sunset - weather.sys.sunrise) / 3600; // horas
                const hours = Math.floor(diff);
                const minutes = Math.round((diff - hours) * 60);
                return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
              })()}
          <br />
          {loading || !weather
            ? "--:-- - --:--"
            : (() => {
                const sunrise = new Date(weather.sys.sunrise * 1000);
                const sunset = new Date(weather.sys.sunset * 1000);
                const fmt = (d: Date) =>
                  d
                    .toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                    .replace(/^0/, "");
                return `${fmt(sunrise)} - ${fmt(sunset)}`;
              })()}
        </div>
        {/* Weather info */}
        {weather && (
          <div style={{ marginTop: 16, fontSize: 18 }}>
            <strong>Clima:</strong> {weather.weather[0].description} <br />
            <strong>Temp:</strong> {weather.main.temp}°C
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
