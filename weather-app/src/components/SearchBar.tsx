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
      background: "transparent",
      border: "4px solid #1d1f1fff",
      borderRadius: 18,
      padding: "5px 5px 5px 5px",
      width: 320,
      maxWidth: "92vw",
      boxShadow: "1px 1px 0 #222",
      position: "relative",
    }}
  >
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Pesquisar"
      style={{
        flex: 1,
        border: "none",
        outline: "none",
        background: "transparent",
        color: "#5ca16bff",
        fontSize: 18,
        fontFamily: "monospace",
        letterSpacing: 8,
        padding: "6px 6px",
        borderRadius: 0,
        boxShadow: "2px 3px 0 transparent",
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
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#ffb6d5",
          border: "3px solid #222",
          position: "relative",
        }}
      >
        {/* haste da lupa */}
        <span
          style={{
            position: "absolute",
            bottom: 4,
            right: -7,
            width: 10,
            height: 3,
            background: "#222",
            borderRadius: 2,
            transform: "rotate(45deg)",
          }}
        />
        {/* círculo rosa */}
        <span
          style={{
            position: "absolute",
            top: 5,
            left: 5,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#ffdbe9",
          }}
        />
      </span>
    </button>
  </form>
);

export default SearchBar;
