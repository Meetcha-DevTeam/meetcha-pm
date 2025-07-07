import type { Spec } from "../types/base";

export const SchedulePage: Spec = {
  id: "page-schedule",
  name: "홈(내 일정)",
  description:
    "사용자는 자신의 일정을 확인, 생성, 수정 그리고 삭제가 가능하다. 일정은 구글캘린더와 완전 연동된다.",
  priority: 1,
  scenarios: [
    "사용자는 최초진입 또는 네비게이터로 진입",
    "주간 & 월간 방식 뷰",
    "빈 곳을 누르면 일정 생성",
    "일정 칸을 누르면 일정 확인 & 수정 & 삭제",
  ],
  input: ["사용자의 구글 일정 정보"],
  output: ["사용자의 구글 일정에 대한 액션"],
  children: ["sheet-schedule-create"],
  design:"페이지",
};

export const ScheduleCreate: Spec = {
  id: "sheet-schedule-create",
  name: "일정 생성",
  description: "사용자는 일정을 생성할 수 있다.",
  priority: 1,
  scenarios: ["사용자는 일정 생성 버튼을 누르거나 빈 곳을 누르면 일정 생성"],
  design: "바텀 시트 (modal-mode)",
  output: [
    { name: "이름", type: "string" },
    { name: "시작 시간", type: "date", default: "현재 시간" },
    { name: "종료 시간", type: "date", default: "현재 시간 + 2시간" },
    {
      name: "반복",
      type: "Enum('없음','매일','매주','격주','매달')",
      limit:"하나만 선택",
      default: "없음",
    },
  ],
};