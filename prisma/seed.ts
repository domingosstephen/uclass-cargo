import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Sample shipment: Genova → Shanghai via Suez
  const shipment = await prisma.shipment.upsert({
    where: { trackingNumber: "UCL-2024DEMO1" },
    update: {},
    create: {
      trackingNumber: "UCL-2024DEMO1",
      description: "Industrial Machinery Components — Demo Shipment",
      origin: "Genova, Italy",
      originLat: 44.4056,
      originLng: 8.9463,
      destination: "Shanghai, China",
      destinationLat: 31.2304,
      destinationLng: 121.4737,
      currentLocation: "Port Said, Egypt",
      currentLat: 31.2633,
      currentLng: 32.3019,
      status: "IN_TRANSIT",
      cargoType: "Machinery",
      weight: "12.5 tonnes",
      estimatedArrival: "28 Nov 2024",
      clientName: "Demo Client GmbH",
      clientEmail: "demo@example.com",
      events: {
        create: [
          {
            location: "Genova, Italy",
            lat: 44.4056,
            lng: 8.9463,
            description: "Cargo loaded at Port of Genova — vessel MSC Splendida",
            timestamp: new Date("2024-11-01T08:00:00Z"),
          },
          {
            location: "Port of Marseille, France",
            lat: 43.2965,
            lng: 5.3698,
            description: "Brief stopover at Marseille — additional containers loaded",
            timestamp: new Date("2024-11-02T14:00:00Z"),
          },
          {
            location: "Mediterranean Sea",
            lat: 37.5,
            lng: 18.0,
            description: "Vessel underway in Mediterranean Sea — all cargo secured",
            timestamp: new Date("2024-11-04T06:00:00Z"),
          },
          {
            location: "Port Said, Egypt",
            lat: 31.2633,
            lng: 32.3019,
            description: "Arrived Port Said — awaiting Suez Canal transit",
            timestamp: new Date("2024-11-06T10:00:00Z"),
          },
        ],
      },
    },
  });

  console.log("Seed complete! Demo tracking number:", shipment.trackingNumber);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
