import prisma from "@/prisma/prisma";
import { investmentTypeEnum } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
  const url = new URL(req.url).searchParams;
  const skip = Number(url.get("skip"));
  const take = Number(url.get("take"));

  try {
    const investmentCount = await prisma.investment.count();

    const investmentData = await prisma.investment.findMany({
      skip,
      take,
    });

    return NextResponse.json(
      { data: investmentData, count: investmentCount },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { amount, transactionType, clientId } = await req.json();

  try {
    const investmentData = await prisma.investment.create({
      data: {
        amount: Number(amount),
        transactionType: transactionType as unknown as investmentTypeEnum,
        status: "pending",
        client: {
          connect: {
            id: clientId,
          },
        },
      },
    });
    return NextResponse.json({ data: investmentData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
