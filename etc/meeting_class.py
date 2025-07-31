"""
추상화를 위한 클래스들
편의상 시간은 단순 숫자로 표현(유닉스 타임 생각하시면 됩니다, 실제 구현은 편한 방식으로 사용바랍니다.)
"""


class TimeRange:
    def __init__(self, start: int, end: int):
        self.start = start
        self.end = end


class Participant:
    def __init__(self, id: str, timeRanges: list[TimeRange]):
        self.id = id
        self.timeRanges = timeRanges


class Meeting:
    def __init__(
        self,
        id: str,
        participants: list[Participant],
        deadline: int,
        duration: int,
        meetingTime: int | None,
        alternativeTime: int | None,
        alternativeCandidates: list[int],
    ):
        """
        id: 미팅 고유 번호
        participants: 참가자들
        deadline: 미팅 마감 시간
        duration: 미팅 진행 시간
        meetingTime: 산출 미팅 시간
        alternativeTime: 산출 대체 시간
        alternativeCandidates: 대체 시간 후보들
        """
        self.id = id
        self.participants = participants
        self.deadline = deadline
        self.duration = duration
        self.meetingTime = meetingTime
        self.alternativeTime = alternativeTime
        self.alternativeCandidates = alternativeCandidates

