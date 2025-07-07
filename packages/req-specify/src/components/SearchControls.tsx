import { useState } from "react";
import clsx from "clsx";

const SearchField = {
  id: "id",
  name: "name", 
  description: "description",
} as const;
type SearchField = keyof typeof SearchField;

const SearchFieldLabels = {
  [SearchField.id]: "ID",
  [SearchField.name]: "이름",
  [SearchField.description]: "설명",
} as const;

interface SearchControlsProps {
  searchTerm: string;
  searchField: SearchField;
  onSearchChange: (term: string, field: SearchField) => void;
}

export const SearchControls = ({ 
  searchTerm, 
  searchField, 
  onSearchChange 
}: SearchControlsProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearchChange(value, searchField);
  };

  const handleFieldChange = (field: SearchField) => {
    onSearchChange(localSearchTerm, field);
  };

  return (
    <div className="mb-4 flex items-center space-x-4">
      <span className="text-sm font-medium text-gray-700">검색:</span>
      
      {/* 검색 필드 선택 */}
      <div className="flex space-x-2">
        {Object.entries(SearchFieldLabels).map(([field, label]) => (
          <button
            key={field}
            onClick={() => handleFieldChange(field as SearchField)}
            className={clsx(
              "px-3 py-1 text-sm rounded-md transition-colors",
              searchField === field
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 검색 입력 */}
      <div className="flex-1 max-w-md">
        <input
          type="text"
          value={localSearchTerm}
          onChange={handleSearchChange}
          placeholder={`${SearchFieldLabels[searchField]}으로 검색...`}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export { SearchField };
export type { SearchField as SearchFieldType }; 