import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit }) => (
  <form
    onSubmit={onSubmit}
    aria-label="Pesquisar cidade"
    style={{
      display: "flex",
      alignItems: "center",
      background: "linear-gradient(140deg, #ffffffff, #4cddf7ff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
      border: "4px solid #faf7f9ff",
      borderRadius: 20,
      padding: 0,
      width: "100%",
      maxWidth: "80vw",
      boxShadow: "1px 1px 0 #ccc7c7ff",
      position: "relative",
      top: "-5rem",
    }}
  >
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Digite a cidade"
      aria-label="Cidade"
      style={{
        flex: 1,
        border: "none",
        outline: "none",
        background: "linear-gradient(140deg, #ffffffff, #eff5f7ff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
        fontSize: 15,
        fontFamily: "monospace",
        letterSpacing: 0,
        padding: "6px 6px",
        borderRadius: 0,
        boxShadow: "1px 3px 0 transparent",
        fontWeight: 100,
        textTransform: "uppercase",
      }}
    />

    <button
      type="submit"
      aria-label="Pesquisar"
      style={{
        border: "none",
        background: "none",
        marginLeft: 10,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: 0,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "linear-gradient(140deg, #ffffffff, #fffaf1ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
          border: "3px solid #a5a4a1ff",
          position: "relative",
          right: 11,
        }}
      >
        <span
          style={{
            position: "absolute",
            bottom: 3,
            right: -7,
            width: 20,
            height: 3,
            background: "#7a7873ff",
            borderRadius: 2,
            transform: "rotate(45deg)",
          }}
        />

        <span
          style={{
            position: "absolute",
            top: 2,
            right: 3,
            width: 15,
            height: 15,
            borderRadius: "50%",
            background: "#ffffffff",
          }}
        />
      </span>
    </button>
  </form>
);

export default React.memo(SearchBar);
