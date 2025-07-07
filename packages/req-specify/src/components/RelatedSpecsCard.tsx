import { SpecCard } from "./SpecCard";
import type { Spec, Edge } from "../types/base";

interface RelatedSpecsCardProps {
  parentSpec: Spec | null;
  childSpecs: Spec[];
  importSpecs: Spec[];
  exportSpecs: Spec[];
  exportEdges: Edge[];
  onSpecClick: (specId: string) => void;
}

export const RelatedSpecsCard = ({
  parentSpec,
  childSpecs,
  importSpecs,
  exportSpecs,
  exportEdges,
  onSpecClick,
}: RelatedSpecsCardProps) => {
  return (
    <SpecCard title="관계 명세서">
      {/* 상위 명세서 */}
      {parentSpec && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">상위 명세서</h3>
          <div
            className="bg-blue-50 border border-blue-200 rounded-md p-4 cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => onSpecClick(parentSpec.id)}
          >
            <div className="font-medium text-blue-900">
              {parentSpec.name}
              <span className="text-xs text-blue-600 ml-2">({parentSpec.id})</span>
            </div>
            <div className="text-sm text-blue-700 mt-1">
              {parentSpec.description}
            </div>
          </div>
        </div>
      )}

      {/* 하위 명세서들 */}
      {childSpecs.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">하위 명세서</h3>
          <div className="space-y-2">
            {childSpecs.map((childSpec) => (
              <div
                key={childSpec.id}
                className="bg-green-50 border border-green-200 rounded-md p-3 cursor-pointer hover:bg-green-100 transition-colors"
                onClick={() => onSpecClick(childSpec.id)}
              >
                <div className="font-medium text-green-900">
                  {childSpec.name}
                  <span className="text-xs text-green-600 ml-2">({childSpec.id})</span>
                </div>
                <div className="text-sm text-green-700 mt-1">
                  {childSpec.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 이 명세서를 사용하는 명세서들 */}
      {importSpecs.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            이 명세서를 사용하는 명세서들
          </h3>
          <div className="space-y-2">
            {importSpecs.map((importSpec) => (
              <div
                key={importSpec.id}
                className="bg-purple-50 border border-purple-200 rounded-md p-3 cursor-pointer hover:bg-purple-100 transition-colors"
                onClick={() => onSpecClick(importSpec.id)}
              >
                <div className="font-medium text-purple-900">
                  {importSpec.name}
                  <span className="text-xs text-purple-600 ml-2">({importSpec.id})</span>
                </div>
                <div className="text-sm text-purple-700 mt-1">
                  {importSpec.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 이 명세서에서 이동할 수 있는 명세서들 */}
      {exportSpecs.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            이 명세서에서 이동할 수 있는 명세서들
          </h3>
          <div className="space-y-2">
            {exportEdges.map((edge, index) => {
              const exportSpec = exportSpecs[index];
              return (
                <div
                  key={edge.id}
                  className="bg-orange-50 border border-orange-200 rounded-md p-3 cursor-pointer hover:bg-orange-100 transition-colors"
                  onClick={() => onSpecClick(edge.id)}
                >
                  <div className="font-medium text-orange-900">
                    {exportSpec.name}
                    <span className="text-xs text-orange-600 ml-2">({exportSpec.id})</span>
                  </div>
                  <div className="text-sm text-orange-700 mt-1">
                    {exportSpec.description}
                  </div>
                  {edge.action && (
                    <div className="text-xs text-orange-600 mt-1">
                      <span className="font-medium">액션:</span> {edge.action}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </SpecCard>
  );
}; 