import type { Spec } from "../types/base";

export const ProjectSheet: Spec = {
  id: "sheet-project",
  name: "프로젝트",
  description: "사용자는 프로젝트를 선택할 수 있다.",
  priority: 2,
  scenarios: [
    "사용자는 프로젝트를 추가할 수 있다",
    "프로젝트를 설정한 새로운 미팅에 참가하면 새 프로젝트가 개인에게 추가된다.",
    "각 프로젝트 항목을 수정 & 삭제할 수 있다",
    "프로젝트 목록을 스크롤할 수 있다.",
  ],
  design: "바텀 시트 (non-modal-mode)",
  input: ["프로젝트 목록"],
  output: [{ name: "프로젝트 명", type: "string", required: true }],
};
