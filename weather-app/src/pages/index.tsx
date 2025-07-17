import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { getWeatherByCity } from "../services/weatherApi";

const HomePage = () => {
  const [city, setCity] = useState("São Paulo");
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState<any>(null);
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
        backgroundImage: "url('/images/dudububuchuva.jpg')",
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
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
        <span role="img" aria-label="clock" style={{ fontSize: 0 }}>
          🕒
        </span>
        <div>
          <button
            style={{
              marginRight: 8,
              padding: "0.3em 1em",
              borderRadius: "20px",
              border: "none",
              background: "#a2f0f0ff",
            }}
          ></button>
          <button
            style={{
              padding: "0.3em 1em",
              borderRadius: "20px",
              border: "none",
              background: "#a2f0f0ff",
              borderBottom: "0px solid #111",
            }}
          ></button>
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
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1,
            background: "linear-gradient(140deg, #ffffffff, #ffffffff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {loading || !weather
            ? "--"
            : new Date().getHours().toString().padStart(2, "0")}
          <br />
          {loading || !weather
            ? "--"
            : new Date().getMinutes().toString().padStart(2, "0")}
          <span
            style={{
              fontSize: 0,
              color: "#fffcfdff",
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
          }}
        >
          {new Date().toLocaleDateString("pt-br", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          })}
        </div>
        {/* Temperatura embaixo da data */}
        {weather && (
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              marginTop: 8,
              marginLeft: 60,
              textAlign: "center",
              background: "linear-gradient(150deg, #ffffffff, #ffffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              width: "100%",
            }}
          >
            {Math.round(weather.main.temp)}°C
          </div>
        )}
        {/* Location */}
        <div
          style={{
            fontSize: "50px",
            fontWeight: 700,
            marginBottom: 7,
            marginRight: 150,
            marginTop: "2rem",
            background: "linear-gradient(140deg, #fcfcfcff, #ffffffff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {loading || !weather ? (
            "Carregando localização..."
          ) : error ? (
            <span style={{ color: "red" }}>{error}</span>
          ) : weather ? (
            <>
              {weather.name},<br />
              {weather.sys?.state ? weather.sys.state + "," : ""}
              {weather.sys.country}
            </>
          ) : (
            "Localização não encontrada"
          )}
        </div>
        {/* SunInfo */}
        <div style={{ fontSize: 0, color: "#444" }}>
          Sun{" "}
          <span role="img" aria-label="sun">
            ☀️
          </span>{" "}
          {loading || !weather
            ? "--"
            : (() => {
                const sunrise = new Date(weather.sys.sunrise * 1000);
                const sunset = new Date(weather.sys.sunset * 1000);
                const diff = (weather.sys.sunset - weather.sys.sunrise) / 3600;
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
          <div
            style={{
              marginTop: 100,
              fontSize: 30,
              fontWeight: 700,
              background: "linear-gradient(130deg, #f8f0f0ff, #fffcfcff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            <strong></strong> {weather.weather[0].description}
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
