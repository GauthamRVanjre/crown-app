import prisma from "@/prisma/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const userExists = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!userExists) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  try {
    let userDetails = await prisma.user.findUnique({
      where: {
        id: id,
      },

      select: {
        id: true,
        brokerName: true,
        email: true,
        investmentGoal: true,
        name: true,
        phoneNumber: true,
        riskTakingCapacity: true,
        investments: {
          where: {
            status: "approved",
          },
          select: {
            amount: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(userDetails), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error while getting user details" }),
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  let { isAdmin, phoneNumber, email } = await req.json();
  console.log(isAdmin, phoneNumber, email, id);

  const userExists = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!userExists) {
    return new Response(JSON.stringify({ message: "User does not exist" }), {
      status: 404,
    });
  }
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },

      data: {
        isAdmin,
        phoneNumber,
        email,
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "User details could not edited" }),
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(id);

  const userExists = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
    },
  });

  if (!userExists) {
    return new Response(JSON.stringify({ message: "User does not exist" }), {
      status: 404,
    });
  }

  try {
    const deletedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    });

    return new Response(
      JSON.stringify({ message: `${deletedUser.name} user is deleted` }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "User could not be deleted" }),
      {
        status: 500,
      }
    );
  }
}
