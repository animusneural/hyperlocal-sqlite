import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  // Categorii
  const [rest, bakery, cafe] = await db.$transaction([
    db.category.upsert({
      where: { slug: "restaurant-mic" },
      update: {},
      create: { slug: "restaurant-mic", name: "Restaurant mic" },
    }),
    db.category.upsert({
      where: { slug: "brutarie-artizanala" },
      update: {},
      create: { slug: "brutarie-artizanala", name: "Brutărie artizanală" },
    }),
    db.category.upsert({
      where: { slug: "cafenea-specialitate" },
      update: {},
      create: { slug: "cafenea-specialitate", name: "Cafenea de specialitate" },
    }),
  ]);

  // Venue de test
  await db.venue.upsert({
    where: { slug: "brutaria-x" },
    update: {},
    create: {
      slug: "brutaria-x",
      name: "Brutăria X",
      description: "Pâine cu maia, produse locale.",
      address: "Str. Exemplu 10, București",
      lat: 44.439,
      lng: 26.096,
      priceLevel: "MID",
      categoryId: bakery.id,
      images: {
        create: [{ url: "/venues/brutaria-x.jpg", alt: "Brutăria X" }],
      },
      hours: {
        create: [{ dayOfWeek: 1, open: "08:00", close: "18:00" }],
      },
      tags: {
        create: [
          {
            tag: {
              connectOrCreate: {
                where: { slug: "maia" },
                create: { slug: "maia", name: "Maia" },
              },
            },
          },
        ],
      },
    },
  });
} // <-- asta lipsea, închide funcția main

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });