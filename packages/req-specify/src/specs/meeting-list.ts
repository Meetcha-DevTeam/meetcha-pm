import type { Spec } from "../types/base";

export const meetingList: Spec = {
  id: "page-meeting-list",
  name: "미팅 목록",
  description: "미팅 목록을 확인 가능하다.",
  priority: 1,
  scenarios: [
    "참여 마감 이전인 미팅 목록 확인: 참여 마감시간, 미팅 제목",
    "미팅 종료 이전인 미팅 목록 확인: 산출시간, 상세 상태, 미팅 제목",
    "참여 마감 이전인 미팅 항목 클릭시 참여 정보 수정 가능"
  ],
  design: "페이지",
  input: [{ name: "미팅 목록", type: "Array<미팅>" }],
  export: [
    { id: "page-meeting-participate-4", action: "참여 마감 이전 항목 클릭" },
    { id: "page-meeting-detail-1", action: "항목 클릭" },
    { id: "page-alter-time-vote", action: "항목 클릭" },
  ],
};
