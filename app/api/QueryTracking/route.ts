import { prisma } from "../../../prisma/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url).searchParams;
  const time = url.get("time");
  const skip = Number(url.get("skip")) || 0;
  const take = Number(url.get("take")) || 0;
  try {
    const queriesCount = await prisma.queryTracking.count();
    const queries = await prisma.queryTracking.findMany({
      skip,
      take,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return Response.json({ count: queriesCount, queries }, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
