export function YearSelector({ selectedYear, onYearChange, yearsData }) {
  return (
    <div className="year-selector">
      <label htmlFor="year-select" className="year-label">Filter by Year:</label>
      <select 
        id="year-select"
        value={selectedYear || 'all'} 
        onChange={(e) => onYearChange(e.target.value === 'all' ? null : e.target.value)}
        className="year-select"
      >
        <option value="all">All Years ({yearsData.total || 0})</option>
        {yearsData.years?.map((yearData) => (
          <option key={yearData.year} value={yearData.year}>
            {yearData.year} ({yearData.count})
          </option>
        ))}
      </select>
    </div>
  );
}
