import type { Spec } from "../types/base";

export const meetingParticipate: Spec = {
  id: "page-meeting-participate-0",
  name: "미팅 참여",
  description: "사용자는 생성된 미팅에 참여할 수 있다.",
  priority: 1,
  scenarios: [
    "사용자는 공유받은 링크로 접속한다, 또는 서비스에서 직접 입력한다.",
    "사용자는 닉네임을 설정 가능하다",
    "사용자는 미팅에 대한 간략한 정보를 확인 가능하다",
    "사용자는 자신의 기존 일정과 충돌을 피할 수 있다.",
    "사용자는 자신의 가능한 일정을 클랙 or 드래그로 기입할 수 있다.",
  ],
  design: "페이지",
  input: [
    { name: "미팅 제목", type: "string" },
    { name: "미팅 설명", type: "string", default: "설명이 없습니다." },
    {
      name: "기존 일정",
      type: "date",
      description: "사용자의 구글 캘린더 일정",
    },
  ],
  output: [
    { name: "닉네임", type: "string", default: "구글 닉네임" },
    { name: "참여 가능 시간", type: "Array<date>" },
  ],
  export: [{ id: "page-meeting-detail-0", action: "미팅 참여 성공" }],
};

export const meetingParticipateInput: Spec = {
  id: "page-meeting-participate-1",
  name: "미팅 참여 링크 입력",
  description: "사용자는 미팅 참여 링크를 입력할 수 있다.",
  priority: 3,
  scenarios: ["사용자는 미팅 참여 링크를 입력한다."],
  design: "페이지",
  input: [{ name: "미팅 참여 링크", type: "string" }],
  export: [
    { id: "page-meeting-participate-0", action: "링크 입력 성공" },
    { id: "page-meeting-participate-2", action: "이미 마감된 링크 입력" },
    { id: "page-meeting-participate-3", action: "잘못된 링크 입력 또는 에러" },
  ],
};

export const meetingParticipateEnd: Spec = {
  id: "page-meeting-participate-2",
  name: "미팅 참여 종료",
  description: "이미 참여 마감된 미팅 참여 시도",
  priority: 2,
  scenarios: ["유저가 참여 마감시간이 지난 미팅을 참여 하려한다"],
  design: "페이지",
  export: [{ id: "page-meeting-detail-1" }],
};

export const meetingParticipateWrong: Spec = {
  id: "page-meeting-participate-3",
  name: "미팅 참여 실패",
  description: "미팅 참여 실패",
  priority: 2,
  scenarios: ["모종의 에러가 발생한다", "유저는 잘못된 링크의 미팅을 참여한다"],
  design: "페이지",
  export: [{ id: "page-meeting-participate-1" }],
};

export const meetingParticipateRewrite: Spec = {
  ...meetingParticipate,
  id: "page-meeting-participate-4",
  name: "미팅 참여 수정",
  description:
    "미팅 참여 수정, 미탕 참가랑 ui와 기능 동일, 폼 기본값이 이전 입력정보로 채워짐",
  priority: 3,
  scenarios: ["사용자는 미팅 참여 수정을 할 수 있다."],
  design: "페이지",
};
