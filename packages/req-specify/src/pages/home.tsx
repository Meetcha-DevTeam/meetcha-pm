import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useSpec } from "../hooks/useSpec";
import { SortControls, SortBy } from "../components/SortControls";
import type { SortByType } from "../components/SortControls";
import { SearchControls, SearchField } from "../components/SearchControls";
import type { SearchFieldType } from "../components/SearchControls";
import { SpecTable } from "../components/SpecTable";
import { ViewTabs, ViewMode, type ViewModeType } from "../components/ViewTabs";
import { SpecGraph } from "../components/SpecGraph";

export const HomePage = () => {
  const { specMap } = useSpec();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortByType>(SortBy.id);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState<SearchFieldType>(
    SearchField.id
  );
  const [viewMode, setViewMode] = useState<ViewModeType>(ViewMode.LIST);

  const specs = useMemo(() => {
    let specsArray = Array.from(specMap.values());

    // 검색 필터링
    if (searchTerm && searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      
      specsArray = specsArray.filter((spec) => {
        switch (searchField) {
          case SearchField.name:
            return spec.name.toLowerCase().includes(term);
          case SearchField.id:
            return spec.id.toLowerCase().includes(term);
          case SearchField.description:
            return spec.description.toLowerCase().includes(term);
          default:
            return true;
        }
      });
    }

    // 정렬
    switch (sortBy) {
      case SortBy.id:
        return specsArray.sort((a, b) => a.id.localeCompare(b.id));
      case SortBy.name:
        return specsArray.sort((a, b) => a.name.localeCompare(b.name));
      case SortBy.priority:
        return specsArray.sort((a, b) => a.priority - b.priority);
      default:
        return specsArray;
    }
  }, [specMap, sortBy, searchTerm, searchField]);

  const handleRowClick = (specId: string) => {
    navigate(`/spec/${specId}`);
  };

  const handleSearchChange = (term: string, field: SearchFieldType) => {
    setSearchTerm(term);
    setSearchField(field);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          요구사항 명세서
        </h1>
        <ViewTabs currentMode={viewMode} onModeChange={setViewMode} />
        
        {viewMode === ViewMode.LIST ? (
          <>
            <SearchControls
              searchTerm={searchTerm}
              searchField={searchField}
              onSearchChange={handleSearchChange}
            />
            <SortControls sortBy={sortBy} onSortChange={setSortBy} />
            <SpecTable specs={specs} onRowClick={handleRowClick} />
          </>
        ) : (
          <SpecGraph specs={specs} onNodeClick={handleRowClick} />
        )}
      </div>
    </div>
  );
};
