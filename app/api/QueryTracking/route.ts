import { prisma } from "../../../prisma/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url).searchParams;
  const time = url.get("time");
  try {
    const queries = await prisma.queryTracking.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return Response.json(queries, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
