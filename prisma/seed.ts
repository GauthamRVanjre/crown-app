// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const descriptionField = async () => {
  try {
    const user = await prisma.queryTracking.updateMany({
      data: {
        Description: "Your new description here", // Set the desired description
      },
    });

    console.log("Updated description for records: " + user.count);
  } catch (error) {
    console.log(error);
  }
};

const isActiveFieldForUsers = async () => {
  try {
    const user = await prisma.user.updateMany({
      data: {
        isActive: true,
      },
    });

    console.log("Updated active state for records: " + user.count);
  } catch (error) {
    console.log(error);
  }
};

// 1. seed file run in development mode
// 2. fetch required data
// 3.find a way to run seed file in production mode
// 4. merge inot production

async function main() {
  // await seedUser();
  // await adminUser();
  await isActiveFieldForUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
