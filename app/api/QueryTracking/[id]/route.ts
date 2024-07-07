import { prisma } from "../../../../prisma/prisma";
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const queries = await prisma.queryTracking.findMany({
      where: {
        id: params.id,
      },
    });

    return Response.json(queries, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
