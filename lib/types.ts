import {
  TransactionStatus,
  investmentTypeEnum,
  riskTakingCapacityTypes,
} from "@prisma/client";

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

export type investmentType = {
  id: string;
  amount: number;
  transactionDate: string;
  transactionType: investmentTypeEnum;
  status: TransactionStatus;
  approvalNote: string;
  rejectionNote: string;
  updatedAt: string;
  client: {
    id: string;
    name: string;
  };
};
