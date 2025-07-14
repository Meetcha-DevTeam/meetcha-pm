import type { Spec } from "../types/base";

export const feelFilter:Spec = {
    id:"sheet-feel-filter",
    name:"느낀점 필터",
    description:"느낀점 필터 시트에서는 사용자가 작성 완료한 느낀점 목록을 필터링할 수 있다.",
    priority:4,
    scenarios:[
        "사용자는 미팅 제목, 미팅 시작 시간, 기여도, 프로젝트 명에 대해 정렬 가능하다.",
        "사용자는 정렬을 오름차순, 내림차순으로 가능하다.",
        "정렬 기준이 비어있는 미팅은 제일 뒤에 배치한다.",
        "정렬 기준이 같은 미팅들은 미팅 시작 시간에 대해 최신순으로 배치한다.",
        "사용자는 미팅 목록에 보여줄 프로젝트들을 선택 가능하다."
    ],
    design:"바텀 시트 (non-modal-mode)",
    input:["사용자의 프로젝트 목록"]
}