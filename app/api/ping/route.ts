import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const monitors = await prisma.monitor.findMany()

  const results = await Promise.allSettled(
    monitors.map(async (monitor) => {
      const start = Date.now()

      try {
        const res = await fetch(monitor.url, { method: "GET" })

        return await prisma.pingLog.create({
          data: {
            status: "UP",
            responseMs: Date.now() - start,
            checkedAt: new Date(),
            monitorId: monitor.id,
          },
        })
      } catch (err) {
        return await prisma.pingLog.create({
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

  return NextResponse.json({ ok: true, results })
}
