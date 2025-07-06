import type { Spec } from "../types/base";

export const meetingCreate: Spec = {
  id: "page-meeting-create",
  name: "미팅 생성",
  description: "사용자는 미팅을 생성할 수 있다.",
  priority: 1,
  scenarios: [
    "사용자는 어떤 미팅을 생성한다.",
    "사용자는 해당 미팅의 생성자가 된다.",
    "해당 미팅은 참여 마감까지 참여자를 받을 수 있다.",
    "사용자는 해당 미팅 참여 페이지로 이동한다.",
  ],
  output: [
    { name: "제목", type: "string", required: true },
    { name: "설명", type: "string" },
    {
      name: "진행 시간",
      type: "time",
      required: true,
      limit: "1분 이상, 11시간 59분 이하",
      description: "참여자는 해당 시간 동안 미팅 진행",
    },
    {
      name: "후보 날짜",
      type: "Array<date>",
      required: true,
      limit: "현재 시간 이후, 최소 1개, 최대 10개",
      description: "해당 날짜 안에서 시간을 취합",
    },
    {
      name: "참여 마감 시간",
      type: "date",
      required: true,
      limit: "현재 시간 <= 참여 마감 시간 <= min(후보날짜)",
      default:"max(min(후보날짜) - 1day,현재 시간)"
    },
    {
      name: "프로젝트",
      type: "project",
    },
  ],
  design: "페이지",
  children: ["sheet-project"],
  export: [{ id: "page-meeting-participate-0", action: "생성 성공" }],
};
