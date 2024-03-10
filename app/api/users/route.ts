import bcrypt from "bcrypt";
import prisma from "@/prisma/prisma";

export async function GET(req: Request) {
  try {
    await prisma.$connect();
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: `${error}` }), {
      status: 401,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  const { name, email, password, isAdmin } = await req.json();
  try {
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({
          message: "body cannot be empty",
        }),
        {
          status: 422,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const emailExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return new Response(
        JSON.stringify({
          message: "email already exists",
        }),
        {
          status: 405,
        }
      );
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        isAdmin: isAdmin,
      },
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: `Something went wrong ${error}`,
      }),
      {
        status: 401,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
