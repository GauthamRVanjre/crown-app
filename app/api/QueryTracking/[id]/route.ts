import { prisma } from "../../../../prisma/prisma";
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(req.url).searchParams;
  const skip = Number(url.get("skip")) || 0;
  const take = Number(url.get("take")) || 0;
  try {
    const queriesCount = await prisma.queryTracking.count({
      where: {
        createdById: params.id,
      },
    });
    const queries = await prisma.queryTracking.findMany({
      where: {
        createdById: params.id,
      },
      skip,
      take,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return Response.json({ count: queriesCount, queries }, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { status } = await req.json();

  try {
    const updatedQuery = await prisma.queryTracking.update({
      where: {
        id: id,
      },
      data: {
        queryStatus: status,
      },
    });

    return Response.json(updatedQuery, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
