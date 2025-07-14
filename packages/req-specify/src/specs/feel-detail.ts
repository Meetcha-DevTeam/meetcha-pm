import type { Spec } from "../types/base";

export const feelDetail: Spec = {
  id: "page-feel-detail",
  name: "느낀점 상세",
  description: "느낀점 상세 페이지에서는 사용자가 느낀점을 확인할 수 있다.",
  priority: 2,
  scenarios: [
    "사용자는 프로젝트와 함께 미팅에 대한 간략한 정보 확인이 가능하다",
    "사용자는 느낀점에 대한 전체 정보를 확인 가능하다",
    "TODO: 느낀점 수정 가능, 느낀점 생성 페이지와 UI 동일"
  ],
  design: "페이지",
  input: [
    "미팅 제목",
    "미팅 설명",
    "미팅 시작 시간",
    "미팅 프로젝트",
    "기여도",
    "역할",
    "느낀 점",
    "한 일",
    "할 일",
  ],
};
