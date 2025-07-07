import clsx from "clsx";

const SortBy = {
  id: "id",
  name: "name",
  priority: "priority",
} as const;
type SortBy = keyof typeof SortBy;

const SortByLabels = {
  [SortBy.id]: "ID순",
  [SortBy.name]: "이름순",
  [SortBy.priority]: "우선순위순",
} as const;

interface SortControlsProps {
  sortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
}

export const SortControls = ({ sortBy, onSortChange }: SortControlsProps) => {
  return (
    <div className="mb-4 flex items-center space-x-4">
      <span className="text-sm font-medium text-gray-700">정렬:</span>
      <div className="flex space-x-2">
        {Object.entries(SortByLabels).map(([field, label]) => (
          <button
            key={field}
            onClick={() => onSortChange(field as SortBy)}
            className={clsx(
              "px-3 py-1 text-sm rounded-md transition-colors",
              sortBy === field
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export { SortBy };
export type { SortBy as SortByType }; 