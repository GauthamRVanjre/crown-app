import prisma from "@/prisma/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  //   console.log("id: ", params.id);
  const { id } = params;

  try {
    const userInvestments = await prisma.investment.findMany({
      where: {
        clientId: id || "",
      },
      include: {
        client: {
          select: {
            id: true,
          },
        },
      },
    });

    // const userInvestments: string[] = [];

    console.log(userInvestments);
    return NextResponse.json(JSON.stringify(userInvestments), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error getting investment details" },
      { status: 500 }
    );
  }
}
