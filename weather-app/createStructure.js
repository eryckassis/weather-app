const fs = require("fs-extra");

const structure = {
  public: {
    images: {},
    icons: {},
  },
  src: {
    components: {
      "WeatherCard.tsx": "",
      "SearchBar.tsx": "",
    },
    pages: {
      "_app.tsx": "",
      "index.tsx": "",
    },
    styles: {
      "globals.css": "",
      "WeatherCard.module.css": "",
      "SearchBar.module.css": "",
    },
    services: {
      "weatherApi.ts": "",
    },
    models: {
      "Weather.ts": "",
    },
    utils: {
      "formatDate.ts": "",
    },
    hooks: {
      "useWeather.ts": "",
    },
  },
  tests: {
    components: {
      "WeatherCard.test.tsx": "",
      "SearchBar.test.tsx": "",
    },
    services: {
      "weatherApi.test.ts": "",
    },
  },
  ".env.local": "",
  "next.config.js": "",
  "tsconfig.json": "",
  "package.json": "",
};

function criarEstrutura(dir, obj) {
  fs.ensureDirSync(dir);
  Object.entries(obj).forEach(([name, content]) => {
    const fullPath = dir ? `${dir}/${name}` : name;
    if (typeof content === "object") {
      criarEstrutura(fullPath, content);
    } else {
      fs.writeFileSync(fullPath, content);
    }
  });
}

criarEstrutura("weather-app", structure);
