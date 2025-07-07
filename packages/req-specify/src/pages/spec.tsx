import { useParams, useNavigate } from "react-router-dom";
import { useSpec } from "../hooks/useSpec";
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { ScenariosCard } from "../components/ScenariosCard";
import { DataCard } from "../components/DataCard";
import { RelatedSpecsCard } from "../components/RelatedSpecsCard";

export const SpecPage = () => {
  const { specId } = useParams();
  const navigate = useNavigate();
  const { specMap, importMap, parentMap } = useSpec();

  const spec = specId ? specMap.get(specId) : null;

  if (!spec) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            명세서를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 mb-4">
            요청하신 ID의 명세서가 존재하지 않습니다.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 관련 명세서들 가져오기
  const parentSpec = parentMap.get(specId!)
    ? specMap.get(parentMap.get(specId!)!) || null
    : null;
  const childSpecs = spec.children
    ? spec.children
        .map((id) => specMap.get(id))
        .filter((spec): spec is NonNullable<typeof spec> => spec !== undefined)
    : [];
  const importSpecs = importMap.get(specId!)
    ? importMap
        .get(specId!)!
        .map((id) => specMap.get(id))
        .filter((spec): spec is NonNullable<typeof spec> => spec !== undefined)
    : [];
  const exportSpecs = spec.export
    ? spec.export
        .map((edge) => specMap.get(edge.id))
        .filter((spec): spec is NonNullable<typeof spec> => spec !== undefined)
    : [];

  const handleSpecClick = (specId: string) => {
    navigate(`/spec/${specId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            목록으로 돌아가기
          </button>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {spec.name}
                </h1>
                <p className="text-gray-600 text-lg">{spec.description}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  우선순위: {spec.priority}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  ID: {spec.id}
                </span>
              </div>
            </div>
            
            {spec.design && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">
                  디자인 특이사항
                </h3>
                <p className="text-yellow-700">{spec.design}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽 컬럼 */}
          <div className="space-y-6">
            <ScenariosCard scenarios={spec.scenarios} />
            {spec.input && <DataCard title="입력 데이터" data={spec.input} />}
            {spec.output && <DataCard title="출력 데이터" data={spec.output} />}
          </div>

          {/* 오른쪽 컬럼 */}
          <div className="space-y-6">
            <RelatedSpecsCard
              parentSpec={parentSpec}
              childSpecs={childSpecs}
              importSpecs={importSpecs}
              exportSpecs={exportSpecs}
              exportEdges={spec.export || []}
              onSpecClick={handleSpecClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
