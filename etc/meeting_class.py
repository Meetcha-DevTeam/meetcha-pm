"""
추상화를 위한 클래스들
편의상 시간은 단순 숫자로 표현(유닉스 타임 생각하시면 됩니다, 실제 구현은 편한 방식으로 사용바랍니다.)
"""


class TimeRange:
    def __init__(self, start: int, end: int):
        self.start = start
        self.end = end


class Participant:
    """
    편의상 만든 클래스로, 실제 참여자 데이터와 다름에 주의

    id: 참여자 고유 번호
    timeRanges: 미팅 참여시 기입한 참여자 가능 시간 범위들
    """
    def __init__(self, id: str, timeRanges: list[TimeRange]):
        self.id = id
        self.timeRanges = timeRanges


class Meeting:
    """
        편의상 만든 클래스로, 실제 미팅 데이터와 다름에 주의

        id: 미팅 고유 번호
        participants: 참가자들
        deadline: 미팅 마감 시간
        duration: 미팅 진행 시간
        meetingTime: 산출 미팅 시간
        alternativeTime: 산출 대체 시간
        alternativeCandidates: 대체 시간 후보들
        alternativeDeadline: 대체 시간 마감 시간
    """
    def __init__(
        self,
        id: str,
        participants: list[Participant],
        deadline: int,
        duration: int,
        meetingTime: int | None,
        alternativeTime: int | None,
        alternativeCandidates: list[int],
        alternativeDeadline: int,
        candidateDay: list[int],
    ):
        self.id = id
        self.participants = participants
        self.deadline = deadline
        self.duration = duration
        self.meetingTime = meetingTime
        self.alternativeTime = alternativeTime
        self.alternativeCandidates = alternativeCandidates
        self.alternativeDeadline = alternativeDeadline
        self.candidateDay = candidateDay

