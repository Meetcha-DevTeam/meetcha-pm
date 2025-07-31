def sortBySpare(timeList: list[int], hit: int, per: int) -> list[int]:
    """
    앞뒤로 여유시간이 제일 많은 시간을 산출한다.
    timeList: 시간 리스트 * 연속시간 값대로 오름차순 정렬 선행
    hit: 미팅 진행 시간(단, 시간 단위)
    per: 시간 단위
    """
    ref = timeList[-1]
    if ref < hit:
        return None
    spareCandidate = []
    while timeList and timeList[-1] == ref:
        # mid + hit + mid = ref, 나머지 처리는 나중에 합시다.
        mid = (ref - hit) // 2
        # 앞뒤로 여유시간이 제일 많은 시간(연속한 중간 시간)
        spareCandidate.append(timeList.pop() + mid * per)
    return spareCandidate


def sortByDay(timeList: list[int]) -> list[int]:
    day = 24 * 60  # 하루 시간 단위
    timeList.sort(reverse=True)
    # 가장 이른 날짜 계산
    ref = timeList[-1] // day
    earlyCandidate = []
    while timeList and timeList[-1] // day == ref:
        earlyCandidate.append(timeList.pop())
    return earlyCandidate


def sortByTimePriority(timeList: list[int]) -> list[int]:
    # 12~16, 16~20, 20~24, 8~12, 0~4, 4~8시 순으로 우선순위가 높다.
    timePriority = [
        [60 * 12, 60 * 16 - 1],
        [60 * 16, 60 * 20 - 1],
        [60 * 20, 60 * 24 - 1],
        [60 * 8, 60 * 12 - 1],
        [60 * 0, 60 * 4 - 1],
        [60 * 4, 60 * 8 - 1],
    ]

    def getTimePriorityIndex(time: int) -> int:
        timeByMin = time % 60 * 24
        for i, (s, e) in enumerate(timePriority):
            if s <= timeByMin <= e:
                return i

    timeCandidate = sorted(timeList, key=lambda x: getTimePriorityIndex(x))
    return timeCandidate
