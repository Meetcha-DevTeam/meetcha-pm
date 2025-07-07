import type { Spec } from "../types/base";

export const bottomNav: Spec = {
  id: "bottom-nav",
  name: "바텀 네비게이션",
  description: "서비스 메인기능 이동 네비게이션",
  priority: 1,
  scenarios: [
    "기본적으로 홈(일정) 페이지",
    "플로팅 버튼 존재",
    "미팅 기록 페이지 이동 가능",
    "(예정) 미팅 느낀점 페이지 이동 가능",
  ],
  design: "컴포넌트",
  export: [
    { id: "page-schedule", action: "홈(일정) 페이지 이동" },
    //{id:'page-meeting-record',action:'미팅 기록 페이지 이동'}
  ],
  children: ["button-floating"],
};

export const floatingButton: Spec = {
  id: "button-floating",
  name: "플로팅 버튼",
  description: "바텀 네비게이션 플로팅 버튼",
  priority: 1,
  scenarios: [
    "미팅 생성이 가능하다.",
    "미팅 참가위한 링크 입력이 가능하다.",
    "일정 생성 바텀시트를 띄올 수 있다.",
  ],
  export: [
    { id: "sheet-schedule-create" },
    { id: "page-meeting-create" },
    { id: "page-meeting-participate-1" },
  ],
  design:"버튼, 리스트",
};
