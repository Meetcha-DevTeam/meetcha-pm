from etc.meeting_class import Meeting
from etc.sort_time import sortByDay, sortBySpare, sortByTimePriority
from etc.utils import getTimeSequence

# 시간 단위
# 이 코드는 30분 단위(원래 기획 스펙)으로 쪼갭니다. 상황에 따라 적당한 시간으로 쪼개주세요.
per = 30


def getLessDurationMeetingTimes(meeting: Meeting) -> list[int]:
    # 어떤 시간 t부터 timeSequence[t]*per 만큼 모든 미팅 참여자가 미팅 참여 가능하다
    timeSequence = getTimeSequence(meeting, per, lambda cur, tot: cur == tot)

    # hit만큼 연속돼야 진행시간동안의 미팅이 성사됨(구현용 임시 변수), 지금 함수에선 hit이 meeting.duration보다 작음
    hit = max(timeSequence.values())
    # 미팅 시간을 줄여도 원래의 2/3은 넘어야함
    if hit < (2 * meeting.duration / 3) / per:
        return []

    # 우선순위1: 앞뒤로 여유시간이 제일 많다.
    timeBySpare = sorted(timeSequence.keys(), key=lambda x: timeSequence[x])
    spareCandidate = sortBySpare(timeBySpare, hit, per)

    # 우선순위2: 가장 이른 날짜가 돼야한다.
    earlyCandidate = sortByDay(spareCandidate)

    # 우선순위3: 하루중 가장 우선순위가 높은 시간을 산출한다.
    timeCandidate = sortByTimePriority(earlyCandidate)
    return timeCandidate


def getLessPartiMeetingTimes(meeting: Meeting) -> list[int]:
    # 가장 많은 참여자 구하기, 이분 탐색 이용
    # 기획 스펙상 참여자를 2/3보다 적게 못줄임
    left = 2 * len(meeting.participants) // 3
    right = len(meeting.participants)
    # 최대 참여자 수
    partiNum = left
    while left <= right:
        mid = (left + right) // 2
        timeSequence = getTimeSequence(meeting, per, lambda cur, _: cur >= mid)
        if timeSequence.keys():
            left = mid + 1
            partiNum = max(partiNum, mid)
        else:
            right = mid - 1

    # 이제 최소로 줄인 참여자 수에 대해 시간 산출과 동일한 우선순위 적용
    hit = meeting.duration / per
    timeSequence = getTimeSequence(meeting, per, lambda cur, _: cur == partiNum)

    # 우선순위1: 앞뒤로 여유시간이 제일 많다.
    timeBySpare = sorted(timeSequence.keys(), key=lambda x: timeSequence[x])
    spareCandidate = sortBySpare(timeBySpare, hit, per)

    # 우선순위2: 가장 이른 날짜가 돼야한다.
    earlyCandidate = sortByDay(spareCandidate)

    # 우선순위3: 하루중 가장 우선순위가 높은 시간을 산출한다.
    timeCandidate = sortByTimePriority(earlyCandidate)
    return timeCandidate


def getAlterTime(meeting: Meeting) -> dict[str,list[int]]:
    """
    Returns;
        result["duration"]: 미팅 시간을 줄였을때 시간, list[int]
        result["participant"]: 미팅 참여자를 줄였을때 시간, list[int]
    """
    return {
        "duration": getLessDurationMeetingTimes(meeting),
        "participant": getLessPartiMeetingTimes(meeting),
    }
