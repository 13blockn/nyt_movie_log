import type { FilterType } from "../types";

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterButtons = ({
  currentFilter,
  onFilterChange,
}: FilterButtonsProps) => {
  return (
    <div className="filter-buttons">
      <button
        className={`filter-btn ${currentFilter === "all" ? "active" : ""}`}
        onClick={() => onFilterChange("all")}
      >
        All Movies
      </button>
      <button
        className={`filter-btn ${currentFilter === "seen" ? "active" : ""}`}
        onClick={() => onFilterChange("seen")}
      >
        Seen
      </button>
      <button
        className={`filter-btn ${currentFilter === "unseen" ? "active" : ""}`}
        onClick={() => onFilterChange("unseen")}
      >
        Not Seen
      </button>
    </div>
  );
};
