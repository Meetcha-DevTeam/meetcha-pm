import type { Spec } from "../types/base";

export const alterTimeVote: Spec = {
  id: "page-alter-time-vote",
  name: "대안 시간 투표",
  description:
    `시간 산출이 안됐을 때 MeetCha에서 미팅 시간들을 제안하며 투표가 가능하다. 
    미팅 상태는 참여중으로 바뀌며, min(후보 날짜)에 투표 마감이 되며 산출 완료로 상태 변경된다.`,
  priority: 2,
  scenarios: [
    "사용자는 내 일정을 간략히 확인 가능하다",
    "사용자는 진행시간을 일부 줄였을 때 가능한 시간을 확인 가능하다.",
    "사용자는 참여자를 일부 줄였을 때 가능한 시간을 확인 가능하다.",
    "사용자는 해당 시간을 꾹 누르면 무엇을 얼만큼 줄였고 언제인지 상세 확인이 가능하다.",
    "사용자는 해당 시간 블럭을 클릭하면 체크(또는 해제) 가능하다.",
  ],
  design: "페이지",
  input: [
    "google에서 얻어온 개인 일정",
    "진행 시간 일부 줄였을 때 가능한 시간들",
    "참여자 일부 줄였을 때 가능한 시간들",
  ],
  output: ["체크한 시간들"],
  export: [{ id: "page-meeting-detail-0", action: "미팅 상세 페이지 이동" }],
};
