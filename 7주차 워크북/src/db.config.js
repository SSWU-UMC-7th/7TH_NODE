import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
import dotenv from "dotenv";

dotenv.config();


export const addUser = async (data) => {
  // email 중복 확인
  const existingUser = await prisma.users.findFirst({
    where: { email: data.email },
  });
  
  // 이메일이 이미 존재할 경우 null 반환
  if (existingUser) {
    return null;
  }

  // 사용자 생성 및 user_id 반환
  return (await prisma.users.create({
    data: {
      user_name: data.user_name,
      password: data.password,
      email: data.email,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress, // Prisma에서 필드 이름을 mapping 처리해주므로 camelCase 그대로 사용 가능
      phoneNumber: data.phoneNumber,
    },
  })).user_id;
};
