// src/errors.js
export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }//사용자 이메일 중복 오류 클래스
  
  export class MissionNotFoundError extends Error {
    errorCode = "M001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }//미션 조회 오류 클래스
  
  export class StoreNotFoundError extends Error {
    errorCode = "S001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }//가게 조회 오류 클래스
  
  export class ReviewAddError extends Error {
    errorCode = "R001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }//리뷰 추가 실패 오류 클래스
  
  export class ChallengeAddError extends Error {
    errorCode = "C001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }//챌린지 추가 실패 오류 클래스
  