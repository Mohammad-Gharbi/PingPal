import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name, url } = await req.json()
  if (!name || !url) {
    return NextResponse.json({ erros: "Missing fields" }, { status: 400 })
  }

  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {},
    create: {
      email: session.user.email,
      name: session.user.name || "Anonymous",
    },
  })

  const monitor = await prisma.monitor.create({
    data: {
      name,
      url,
      userId: user.id,
    },
  })

  return NextResponse.json(monitor)
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { monitors: true },
  })

  return NextResponse.json
}
