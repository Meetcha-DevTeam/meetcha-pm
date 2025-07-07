import { useParams } from "react-router-dom";
import { useSpec } from "../hooks/useSpec";

export const SpecPage = () => {
  const { specId } = useParams();
  const specMap = useSpec();

  const spec = specId ? specMap.get(specId) : null;
  
  if (!spec) return <div>이런!</div>;
  return (
    <div>
      <h1>명세서 상세 페이지</h1>
      <p>여기에 특정 명세서의 상세 내용이 표시됩니다.</p>
    </div>
  );
};
