import { prisma } from "@/lib/prisma"

export async function PingMonitors() {
  const monitors = await prisma.monitor.findMany()

  const results = await Promise.allSettled(
    monitors.map(async (monitor) => {
      const start = Date.now()

      try {
        const res = await fetch(monitor.url, { method: "GET" })

        await prisma.pingLog.create({
          data: {
            status: "UP",
            responseMs: Date.now() - start,
            checkedAt: new Date(),
            monitorId: monitor.id,
          },
        })
      } catch (err) {
        await prisma.pingLog.create({
          data: {
            status: "DOWN",
            responseMs: Date.now() - start,
            checkedAt: new Date(),
            monitorId: monitor.id,
          },
        })
      }
    })
  )

  console.log(
    `Pinged ${monitors.length} monitors at ${new Date().toISOString()}`
  )
}
