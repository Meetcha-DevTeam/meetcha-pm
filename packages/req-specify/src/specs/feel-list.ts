import type { Spec } from "../types/base";

export const feelList: Spec = {
  id: "page-feel-list",
  name: "느낀점 목록",
  description: `미팅 종료 상태인 미팅 목록을 확인할 수 있다.`,
  priority: 2,
  scenarios: [
    "사용자는 특정 주기별(6개월, 1년, 전체 기간) 미팅 분석 정보 확인이 가능하다.",
    "사용자는 느낀점 작성안한 목록을 확인할 수 있다.",
    "사용자는 느낀점 작성안한 미팅에 대해 느낀점 작성 페이지로 이동 가능하다.",
    "사용자는 이미 작성한 느낀점 목록을 확인할 수 있다.",
    "필터를 이용해 이미 작성한 느낀점 목록을 선택해 볼 수 있다.",
    "사용자는 이미 작성한 느낀점에 대해 느낀점 상세 페이지로 이동 가능하다.",
  ],
  design: "페이지",
  input: [
    "주기별 미팅 횟수 총합",
    "주기별 최다 수행 역할",
    "주기별 평균 기여도",
    "느낀점 작성안한 미팅 제목, 시작 시간",
    "느낀점 작성완료한 미팅 제목, 프로젝트, 느낀점, 역할, 기여도",
  ],
  children:["sheet-feel-filter"],
  export: [
    { id: "page-feel-create", action: "느낀점 미작성 목록 항목 클릭" },
    { id: "page-feel-detail", action: "느낀점 작성완료 목록 항목 클릭" },
  ],
};
