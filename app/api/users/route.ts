import bcrypt from "bcrypt";
import prisma from "@/prisma/prisma";
import { resend } from "@/lib/utils/resend";
import { riskTakingCapacityTypes } from "@prisma/client";
import { NewUserRegistrationEmailTemplate } from "@/lib/EmailTemplates/NewUserRegistrationEmailTemplate";

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
  const { name, email, password, isAdmin, customerId } = await req.json();
  try {
    if (!name || !email || !password || !customerId) {
      return new Response(
        JSON.stringify({
          message: "body cannot be empty",
        }),
        {
          status: 422,
        }
      );
    }

    const customerIdExists = await prisma.user.findFirst({
      where: {
        customerId: customerId,
      },
    });

    if (customerIdExists) {
      return new Response(
        JSON.stringify({
          message: "CustomerId already exists",
        }),
        {
          status: 405,
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

    //  saving user to Database
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        isAdmin: isAdmin,
        customerId: customerId,
      },
    });

    // send an email notification to user with password and customerId
    const emailData = await resend.emails.send({
      from: `thecrownsoceity@gmail.com`,
      to: [email],
      subject: "Welcome to Crown Society: Your login Credentials",
      react: NewUserRegistrationEmailTemplate({ name, email, customerId }),
      text: "",
    });

    console.log(emailData);
    if (emailData.error) {
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });
      return new Response(
        JSON.stringify({ error: `Could not send user email: ${emailData}` }),
        { status: 503 }
      );
    }

    return new Response(JSON.stringify(emailData), { status: 201 });
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

export async function PUT(req: Request) {
  let { investmentGoal, phoneNumber, userId, brokerName, riskTakingCapacity } =
    await req.json();

  console.log("user id: " + userId);

  if (!userId) {
    return new Response(
      JSON.stringify({
        message: "User not found",
      }),
      {
        status: 404,
      }
    );
  }

  riskTakingCapacity = riskTakingCapacity as unknown as riskTakingCapacityTypes;

  if (investmentGoal && typeof investmentGoal !== "number") {
    return new Response(
      JSON.stringify({
        message: "Phone number and investment goal must be a number",
      }),
      {
        status: 401,
      }
    );
  }

  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
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
        id: userId,
      },

      data: {
        brokerName: brokerName,
        investmentGoal: investmentGoal,
        phoneNumber: phoneNumber,
        riskTakingCapacity: riskTakingCapacity,
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
