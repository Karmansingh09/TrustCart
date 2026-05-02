function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">🔍</span>
      <input
        aria-label="Search products"
        className="search-input"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or category…"
        type="search"
        value={value}
      />
      {value && (
        <button
          aria-label="Clear search"
          className="search-clear"
          onClick={() => onChange('')}
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
