import { PrismaClient, Product, User } from "@prisma/client";
import bcrypt from "bcrypt";

export const usersToSeed: User[] = [
  {
    id: 1,
    email: "john.admin@email.com",
    firstName: "John",
    lastName: "Doe",
    passwordHash: bcrypt.hashSync("Admin123456*", 10),
    emailValidated: true,
    role: "Administrator",
  },
  {
    id: 2,
    email: "jesus.user@email.com",
    firstName: "Jesus",
    lastName: "Perez",
    passwordHash: bcrypt.hashSync("User123456*", 10),
    emailValidated: true,
    role: "User",
  },
  {
    id: 3,
    email: "ricardo.user@email.com",
    firstName: "Ricardo",
    lastName: "Herrera",
    passwordHash: bcrypt.hashSync("User123456*", 10),
    emailValidated: true,
    role: "User",
  },
];

export const productsToSeed: Product[] = [
  {
    id: 1,
    name: "Milk",
    description: "It comes from the cow",
    price: 1.5,
    quantity: 100,
  },
  {
    id: 2,
    name: "Fish",
    description: "It comes from the ocean",
    price: 2.5,
    quantity: 150,
  },
  {
    id: 3,
    name: "Flips",
    description: "Chocolate flavoured",
    price: 3.5,
    quantity: 200,
  },
  {
    id: 4,
    name: " Read Meat",
    description: "It comes from cows",
    price: 4.5,
    quantity: 250,
  },
  {
    id: 5,
    name: "Strawberry",
    description: "A fruit that is red",
    price: 5.5,
    quantity: 300,
  },
];

const prisma = new PrismaClient();

interface MaxIdResult {
  maxid: number | null;
}
async function resetSequence(tableName: string, sequenceName: string) {
  const maxIdResult: MaxIdResult[] = await prisma.$queryRawUnsafe(
    `SELECT MAX(id) as maxid FROM "${tableName}"`
  );
  const nextId = (maxIdResult[0].maxid ?? 0) + 1;
  await prisma.$queryRawUnsafe(
    `ALTER SEQUENCE "${sequenceName}" RESTART WITH ${nextId}`
  );
}

async function main() {
  for (const user of usersToSeed) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }
  await resetSequence("User", "User_id_seq");

  for (const product of productsToSeed) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product,
    });
  }
  await resetSequence("Product", "Product_id_seq");
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
