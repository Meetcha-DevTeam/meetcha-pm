from typing import Callable
from etc.meeting_class import Meeting


def flattenParticipateTime(meeting: Meeting, per: int) -> dict[int, list[str]]:
    """
    **넘겨도됨, 필요시 보면 됩니다.**

    참여 가능 시간 평탄화: 각 시간 별로 어떤 참여자들이 가능한지 편리한 형태로 가공

    어떤 시간 t에 대해 t~t+per 까지 어떤 참여자들이 참여 가능한지 표현
    key: 시간, value: 참여자들
    """
    timeList: dict[int, list[str]] = {}
    for participant in meeting.participants:
        for timeRange in participant.timeRanges:
            for time in range(timeRange.start, timeRange.end, per):
                if time not in timeList:
                    timeList[time] = []
                timeList[time].append(participant.id)
    return timeList


def getTimeSequence(meeting: Meeting, per: int, cmp: Callable[[int, int], bool]) -> dict[int, int]:
    """
    **넘겨도됨, 필요시 보면 됩니다.**

    어떤 시간에 대해 몇시간 몇분 동안 특정 조건을 만족하는 참여자가 참여 가능한지 계산

    key: 시간, value: 연속 시간 단위, cmp: (특정 시간에 가능한 참여자수, 총 미팅 참여자수) 비교 함수
    """
    timeList = flattenParticipateTime(meeting, per)

    def isSequence(start: int, end: int) -> bool:
        return end - start == per

    timeSequence = {}
    for time in timeList:
        if cmp(timeList[time], len(meeting.participants)):
            if time not in timeSequence:
                timeSequence[time] = 0
            timeSequence[time] += 1
    # 누적합을 이용해 어디까지 연속되는지 빠르게 계산
    sortedKeys = sorted(timeSequence.keys())
    for i in range(2, len(sortedKeys)):
        cur = sortedKeys[-i]
        nxt = sortedKeys[-i + 1]
        if isSequence(cur, nxt):
            timeSequence[cur] = timeSequence[cur] + timeSequence[nxt]

    return timeSequence
