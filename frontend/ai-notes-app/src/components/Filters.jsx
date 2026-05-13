function Filters({
  category,
  setCategory,
  timeFilter,
  setTimeFilter,
  fetchNotes
}) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Filter category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <select
        value={timeFilter}
        onChange={(e) => setTimeFilter(e.target.value)}
      >
        <option value="">
          All Time
        </option>

        <option value="today">
          Today
        </option>

        <option value="week">
          This Week
        </option>

        <option value="month">
          This Month
        </option>
      </select>

      <button onClick={fetchNotes}>
        Apply Filters
      </button>
    </div>
  );
}

export default Filters;