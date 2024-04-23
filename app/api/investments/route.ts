import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { amount, transactionDate, transactionType, clientId } =
    await req.json();

  try {
    const investmentData = await prisma.investment.create({
      data: {
        amount,
        transactionDate: transactionDate,
        transactionType: transactionType,
        status: "pending",
        client: {
          connect: {
            id: clientId,
          },
        },
      },
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 200 });
  }
}
