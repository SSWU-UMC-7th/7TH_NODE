// export const bodyToUser = (body) => {
//   const birth = new Date(body.birth);

//   return {
//     email: body.email,
//     name: body.name,
//     gender: body.gender,
//     birth,
//     address: body.address || "",
//     detailAddress: body.detailAddress || "",
//     phoneNumber: body.phoneNumber,
//     preferences: body.preferences,
//   };
// };

export const bodyToUser = (body) => {
  console.log("Received body:", body);
  
  const birth = new Date(body.birth);
  if (isNaN(birth)) {
    console.error("Invalid birth date format");
    throw new Error("Invalid birth date format");
  }

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: Array.isArray(body.preferences) ? body.preferences : [],
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferCategory = [...new Set(preferences.map((pref) => pref.name))];

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};