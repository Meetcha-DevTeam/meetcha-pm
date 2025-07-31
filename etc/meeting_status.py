from etc.alter_time import getAlterTime
from etc.calculate_time import calculateMeetingTime
from etc.meeting_class import Meeting

def getResultAlterTime(alterTimes: dict[str,list[int]]) -> int:
    """
    **mocked function**

    실제론 유저 투표 결과에 따라 정해짐, 단순히 값 반환 + 추상화 위함
    """
    return alterTimes["duration"][0] if alterTimes["duration"] else alterTimes["participant"][0]

def getMeetingStatus(meeting: Meeting,currentTime:int) -> str:
    """
    미팅 상태 반환 함수

    meeting: 처리할 미팅
    currentTime: 현재 시간
    """
    if (currentTime < meeting.deadline):
        return "참여 중"
    calcTime = calculateMeetingTime(meeting)
    if (calcTime):
        if (currentTime < calcTime + meeting.duration):
            return "산출 완료"
        else:
            return "미팅 종료"
    alterTimes = getAlterTime(meeting)
    if (len(alterTimes["duration"]) + len(alterTimes["participant"]) == 0):
        return "미팅 종료"
    if (currentTime < min(meeting.candidateDay)):
        # 이건 따로 상태를 만들까 생각중인데 우선 문제되면
        return "참여 중"
    resultAlterTime = getResultAlterTime(alterTimes)
    if (currentTime < resultAlterTime):
        return "산출 완료"
    else:
        return "미팅 종료"