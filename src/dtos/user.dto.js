export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

// responseFromUser 함수
export const responseFromUser = ({ user, preferences }) => {
  // 중복 제거 및 이름 배열로 변환
  const preferCategory = [...new Set(preferences.map((pref) => pref.name))];

  return {
    email: user.email,
    name: user.name,
    preferCategory, // 중복이 제거된 카테고리 배열
  };
};
