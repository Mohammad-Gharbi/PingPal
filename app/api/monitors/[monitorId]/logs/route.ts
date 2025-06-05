import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { monitorId: string } }
) {
  const { monitorId } = params

  if (!monitorId) {
    return NextResponse.json({ error: "Missing monitor ID" }, { status: 400 })
  }

  const logs = await prisma.pingLog.findMany({
    where: { monitorId: monitorId },
    orderBy: { checkedAt: "desc" },
    take: 30,
  })

  return NextResponse.json({ logs })
}
