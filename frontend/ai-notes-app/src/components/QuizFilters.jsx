function QuizFilters({
  category,
  setCategory,
  difficulty,
  setDifficulty,
  timeFilter,
  setTimeFilter,
  categories,
  fetchNotes
}) {
  return (
    <div className="quiz-filters">

      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >

        <option value="">
          All Categories
        </option>

        {categories.map((cat) => (
          <option
            key={cat}
            value={cat}
          >
            {cat}
          </option>
        ))}

      </select>

      {/* TIME */}
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

      {/* DIFFICULTY */}
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >

        <option value="easy">
          Easy
        </option>

        <option value="medium">
          Medium
        </option>

        <option value="hard">
          Hard
        </option>

      </select>

      <button onClick={fetchNotes}>
        Apply Filters
      </button>

    </div>
  );
}

export default QuizFilters;