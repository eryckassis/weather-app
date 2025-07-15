import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit }) => (
  <form
    onSubmit={onSubmit}
    style={{
      display: "flex",
      alignItems: "center",
      background: "linear-gradient(140deg, #ffffffff, #4cddf7ff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
      border: "4px solid #f0cce1ff",
      borderRadius: 20,
      padding: "0px 0px 0px 0px",
      width: "100%",
      maxWidth: "80vw",
      boxShadow: "1px 1px 0 #efabf1ff",
      position: "relative",
    }}
  >
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder=""
      style={{
        flex: 1,
        border: "none",
        outline: "none",
        background: "linear-gradient(140deg, #ffffffff, #4cddf7ff)",
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
    {/* Ícone de lupa estilizado */}
    <button
      type="submit"
      style={{
        border: "none",
        background: "none",
        marginLeft: 10,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: 0,
      }}
      aria-label="Pesquisar"
    >
      <span
        style={{
          display: "inline-block",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "linear-gradient(140deg, #ffffffff, #4cddf7ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
          border: "3px solid #3ee7f3ff",
          position: "relative",
          right: 11,
        }}
      >
        {/* haste da lupa */}
        <span
          style={{
            position: "absolute",
            bottom: 3,
            right: -7,
            width: 20,
            height: 3,
            background: "#fd92f4ff",
            borderRadius: 2,
            transform: "rotate(45deg)",
          }}
        />
        {/* círculo rosa */}
        <span
          style={{
            position: "absolute",
            top: 2,
            right: 3,
            width: 15,
            height: 15,
            borderRadius: "50%",
            background: "#ffdbe9",
          }}
        />
      </span>
    </button>
  </form>
);

export default SearchBar;
