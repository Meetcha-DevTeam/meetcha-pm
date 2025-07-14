import type { Spec } from "../types/base";

export const feelCreate: Spec = {
  id: "page-feel-create",
  name: "느낀점 작성",
  description: `느낀점 작성 페이지에서는 사용자가 미팅에 대한 느낀점을 작성할 수 있다.`,
  priority: 2,
  scenarios: [
    "사용자는 느낀점을 작성하는 미팅 정보를 간략히 확인 가능하다",
    "사용자는 느낀점 폼을 작성해 느낀점 생성이 가능하다.",
    "느낀점 폼을 성공적으로 작성시 느낀점 상세 페이지로 이동한다.",
  ],
  design: "페이지",
  input: ["미팅 제목", "미팅 설명", "미팅 시작 시간"],
  children:["sheet-project"],
  output: [
    { name: "기여도", type: "number", limit: "0~100", required: true },
    { name: "역할", type: "string", limit: "10자", required: true },
    { name: "느낀점", type: "text", required: true },
    { name: "한 일", type: "string" },
    { name: "할 일", type: "string" },
    { name: "프로젝트", type: "project" },
  ],
  export: [{ id: "page-feel-detail", action: "느낀점 작성 성공" }],
};
