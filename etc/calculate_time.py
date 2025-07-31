from etc.meeting_class import Meeting

"""
해당 링크 명세 참고
https://grey-sedum-df2.notion.site/21d3a31c4bd98035a607c7d7990a11c8?source=copy_link
"""


# 시간 단위
# 이 코드는 30분 단위(원래 기획 스펙)으로 쪼갭니다. 상황에 따라 적당한 시간으로 쪼개주세요.
per = 30


def flattenParticipateTime(meeting: Meeting) -> dict[int, list[str]]:
    """
    **넘겨도됨, 필요시 보면 됩니다.**

    참여 가능 시간 평탄화: 각 시간 별로 어떤 참여자들이 가능한지 편리한 형태로 가공

    어떤 시간 t에 대해 t~t+per 까지 어떤 참여자들이 참여 가능한지 표현
    """
    timeList: dict[int, list[str]] = {}
    for participant in meeting.participants:
        for timeRange in participant.timeRanges:
            for time in range(timeRange.start, timeRange.end, per):
                if time not in timeList:
                    timeList[time] = []
                timeList[time].append(participant.id)
    return timeList


def getTimeSequence(meeting: Meeting) -> dict[int, int]:
    """
    **넘겨도됨, 필요시 보면 됩니다.**

    어떤 시간에 대해 몇시간 몇분 동안 모든 참여자가 참여 가능한지 계산
    key: 시간, value: 연속 시간 단위
    """
    timeList = flattenParticipateTime(meeting)
    # 참여자들이 모두 가능한 어떤 시간에 대해 몇시간 까지 연속되는지 계산

    def isSequence(start: int, end: int) -> bool:
        return end - start == per

    timeSequence = {}
    for time in timeList:
        if len(timeList[time]) == len(meeting.participants):
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


def calculateMeetingTime(meeting: Meeting) -> int | None:
    """
    미팅 시간 산출, 참여자들의 가능한 시간을 취합해 미팅 시간을 정해준다.
    """
    # hit만큼 연속돼야 진행시간동안의 미팅이 성사됨(구현용 임시 변수)
    hit = meeting.duration / per
    timeSequence = getTimeSequence(meeting)

    # 우선순위1: 앞뒤로 여유시간이 제일 많다.
    timeBySpare = sorted(timeSequence.keys(), key=lambda x: timeSequence[x])
    if not timeBySpare:
        return None
    # ref동안 가장 길게 연속됨
    ref = timeBySpare[-1]
    if ref < hit:
        return None
    spareCandidate = []
    while timeBySpare and timeBySpare[-1] == ref:
        # mid + hit + mid = ref, 나머지 처리는 나중에 합시다.
        mid = (ref - hit) // 2
        # 앞뒤로 여유시간이 제일 많은 시간(연속한 중간 시간)
        spareCandidate.append(timeBySpare.pop() + mid * per)

    # 우선순위2: 가장 이른 날짜가 돼야한다.
    day = 24 * 60  # 하루 시간 단위
    spareCandidate.sort(reverse=True)
    ref = spareCandidate[-1] // day
    earlyCandidate = []
    while spareCandidate and spareCandidate[-1] // day == ref:
        earlyCandidate.append(spareCandidate.pop())
    # 우선순위3: 하루중 가장 우선순위가 높은 시간을 산출한다.
    # 12~16, 16~20, 20~24, 8~12, 0~4, 4~8시 순으로 우선순위가 높다.
    timePriority = [
        [60 * 12, 60 * 16 - 1],
        [60 * 16, 60 * 20 - 1],
        [60 * 20, 60 * 24 - 1],
        [60 * 8, 60 * 12 - 1],
        [60 * 0, 60 * 4 - 1],
        [60 * 4, 60 * 8 - 1],
    ]
    def getTimePriorityIndex(time:int) -> int:
        timeByMin = time % 60*24
        for i, (s, e) in enumerate(timePriority):
            if s <= timeByMin <= e:
                return i
    timeCandidate = sorted(earlyCandidate, key=lambda x: getTimePriorityIndex(x))
    return timeCandidate[0] if timeCandidate else None
