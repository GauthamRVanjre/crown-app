import { prisma } from "../../../prisma/prisma";

export async function GET(req: Request) {
  try {
    const queries = prisma.queryTracking.findMany({});

    return Response.json(queries, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
