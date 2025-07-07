import type { Spec } from "../types/base";

const detailBase: Pick<Required<Spec>, "scenarios" | "input" | "export"> = {
  scenarios: [
    "사용자는 미팅에 대한 상세 정보를 확인 가능하다.",
    "사용자는 프로젝트를 확인 및 변경 가능하다.",
    "사용자는 해당 미팅에 참여한 참가자들을 확인 가능하다",
    "사용자는 해당 미팅에 대한 참여 링크를 공유 가능하다",
  ],
  input: [
    "미팅 제목, 설명, 제목, 진행시간, 프로젝트명",
    { name: "상태", type: "Enum('참여중','산출 완료','미팅 종료')" },
  ],
  export:[
    {id:'page-participant-list',action:'참여자 목록 확인'}
  ]
};

export const meetingDetailParticipating: Spec = {
  id: "page-meeting-detail-0",
  name: "미팅 상세 - 참여중",
  description: "현재 시간이 미팅 참여 시간 이전일 때 상세",
  priority: 1,
  scenarios: [
    ...detailBase.scenarios,
    "참여자는 미팅 참여 마감시간을 확인 가능하다."
  ],
  input: [...detailBase.input,"미팅 참여 마감 시간"],
  design:"페이지",
  export:[...detailBase.export]
};

export const meetingDetailCompleted: Spec = {
  id: "page-meeting-detail-1",
  name: "미팅 상세 - 성공",
  description: "참여가 마감됐고, 시간이 성공적으로 산출된 미팅의 상세",
  priority: 1,
  scenarios: [...detailBase.scenarios, "참여자는 미팅 산출 시간을 확인 가능하다."],
  input: [...detailBase.input, "미팅 산출 시간"],
  design:"페이지",
  export:[...detailBase.export]
};

export const participantList:Spec = {
    id:'page-participant-list',
    name:'참여자 목록',
    description:'참여자 목록을 확인 가능하다.',
    priority:10,
    scenarios:[
        "참여자는 미팅 제목을 확인 가능하다.",
        "참여자는 참여자 목록을 확인 가능하다.",
    ],
    input:[
        "미팅 제목",
        {name:'참여자 목록',type:'Array<{username:string, profile:image}>'},
    ],
    design:'페이지',
}