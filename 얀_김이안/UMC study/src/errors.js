// 이메일 중복 에러
export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

// 미션 목록..? 미션? 확인 불가 에러
export class MissionNotFoundError extends Error {
  errorCode = "M001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 가게 없어 에러
export class StoreNotExistError extends Error {
  errorCode = "SE001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 리뷰 등록 불가 에러
export class ReivewError extends Error {
  errorCode = "R001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 가게 리뷰 불러오기 실패 에러
export class StoreReivewError extends Error {
  errorCode = "SR001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 가게 등록 실패 에러
export class StoreError extends Error {
  errorCode = "S001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 챌린지 등록 실패 에러
export class ChallengeError extends Error {
  errorCode = "C001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}