// 중복 이메일 오류
export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 중복 가게 이름 오류
export class DuplicateStoreNameError extends Error {
  errorCode = "S001"; // 가게 관련 오류 코드 설정

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data; // 중복된 가게 정보를 포함할 수 있음
  }
}

// 가게가 존재하지 않는 오류
export class StoreNotFoundError extends Error {
  errorCode = "S002"; // 가게 관련 오류 코드 설정

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data; // 존재하지 않는 가게 정보를 포함
  }
}

// 리뷰 등록 실패 오류
export class ReviewCreationError extends Error {
  errorCode = "R001"; // 리뷰 관련 오류 코드 설정

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data; // 실패한 리뷰와 관련된 추가 정보를 포함
  }
}

// 미션 등록 실패 오류
export class MissionCreationError extends Error {
  errorCode = "M001"; // 미션 관련 오류 코드 설정

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data; // 실패한 미션과 관련된 추가 정보를 포함
  }
}

// 이미 도전 중인 미션 오류
export class MissionAlreadyInProgressError extends Error {
  errorCode = "M002"; // 미션 관련 오류 코드 설정

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data; // 중복 도전 중인 미션과 관련된 정보 포함 (예: 미션 ID, 사용자 ID 등)
  }
}

// 미션 도전 등록 실패 오류
export class MissionChallengeCreationError extends Error {
  errorCode = "M003"; // 미션 도전 관련 오류 코드 설정

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data; // 실패한 미션 도전과 관련된 추가 정보 포함 (예: 미션 ID, 사용자 ID 등)
  }
}
