from etc.meeting_class import Meeting
from etc.sort_time import sortBySpare, sortByDay, sortByTimePriority
from etc.utils import getTimeSequence

"""
해당 링크 명세 참고
https://grey-sedum-df2.notion.site/21d3a31c4bd98035a607c7d7990a11c8?source=copy_link
"""

# 시간 단위
# 이 코드는 30분 단위(원래 기획 스펙)으로 쪼갭니다. 상황에 따라 적당한 시간으로 쪼개주세요.
per = 30


def calculateMeetingTime(meeting: Meeting) -> int | None:
    """
    미팅 시간 산출, 참여자들의 가능한 시간을 취합해 미팅 시간을 정해준다.
    """
    # hit만큼 연속돼야 진행시간동안의 미팅이 성사됨(구현용 임시 변수)
    hit = meeting.duration / per
    # 어떤 시간 t부터 timeSequence[t]*per 만큼 모든 미팅 참여자가 미팅 참여 가능하다
    timeSequence = getTimeSequence(meeting, per, lambda cur, tot: cur == tot)

    # 우선순위1: 앞뒤로 여유시간이 제일 많다.
    timeBySpare = sorted(timeSequence.keys(), key=lambda x: timeSequence[x])
    spareCandidate = sortBySpare(timeBySpare, hit, per)

    # 우선순위2: 가장 이른 날짜가 돼야한다.
    earlyCandidate = sortByDay(spareCandidate)

    # 우선순위3: 하루중 가장 우선순위가 높은 시간을 산출한다.
    timeCandidate = sortByTimePriority(earlyCandidate)
    return timeCandidate[0] if timeCandidate else None

