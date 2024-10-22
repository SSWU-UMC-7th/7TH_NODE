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

  export const responseFromUser = (user) => {
    return {
      email: user.email,
      name: user.name,
      gender: user.gender,
      birth: user.birth ? user.birth.toISOString().split("T")[0] : "", // 'YYYY-MM-DD' 형식으로 변환
      address: user.address || "",
      detailAddress: user.detailAddress || "",
      phoneNumber: user.phoneNumber,
      preferences: user.preferences,
    };
  };