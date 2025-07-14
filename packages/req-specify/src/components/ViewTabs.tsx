import React from 'react';

export enum ViewMode {
  LIST = 'list',
  GRAPH = 'graph'
}

export type ViewModeType = ViewMode.LIST | ViewMode.GRAPH;

interface ViewTabsProps {
  currentMode: ViewModeType;
  onModeChange: (mode: ViewModeType) => void;
}

export const ViewTabs: React.FC<ViewTabsProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => onModeChange(ViewMode.LIST)}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              currentMode === ViewMode.LIST
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            목록
          </button>
          <button
            onClick={() => onModeChange(ViewMode.GRAPH)}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              currentMode === ViewMode.GRAPH
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            그래픽
          </button>
        </nav>
      </div>
    </div>
  );
}; 