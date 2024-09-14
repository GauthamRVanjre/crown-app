import prisma from "@/prisma/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const url = new URL(req.url).searchParams;
  const skip = Number(url.get("skip")) || 0;
  const take = Number(url.get("take")) || 0;

  try {
    const investmentCount = await prisma.investment.count({
      where: {
        clientId: id || "",
      },
    });
    const userInvestments = await prisma.investment.findMany({
      where: {
        clientId: id || "",
      },
      orderBy: {
        transactionDate: "desc",
      },
      skip,
      take,
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // console.log(userInvestments);
    return NextResponse.json(
      { count: investmentCount, userInvestments },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error getting investment details" },
      { status: 500 }
    );
  }
}
