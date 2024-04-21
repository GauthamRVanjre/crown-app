import { riskTakingCapacityTypes } from "@prisma/client";

export type userTypes = {
  id: string;
  name: string;
  email: string;
  password: string | undefined;
  isAdmin: boolean;

  brokerName: string;
  investmentGoal: string;
  phoneNumber: string;
  riskTakingCapacity: riskTakingCapacityTypes;
};
