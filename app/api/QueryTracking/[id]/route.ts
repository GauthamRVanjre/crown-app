import { prisma } from "../../../../prisma/prisma";
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const queries = await prisma.queryTracking.findMany({
      where: {
        createdById: params.id,
      },
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

    return Response.json(queries, { status: 200 });
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
