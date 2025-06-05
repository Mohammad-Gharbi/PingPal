"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import Monitor from "@/components/Monitor"
import { SiStatuspage } from "react-icons/si"

interface Monitor {
  id: string
  name: string
  url: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()

  const [monitors, setMonitors] = useState<Monitor[]>([])
  const [form, setForm] = useState({ name: "", url: "" })

  const fetchMonitors = async () => {
    const res = await fetch("/api/monitors")
    const data = await res.json()
    setMonitors(data)
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchMonitors()
    }
  }, [status])

  const addMonitor = async () => {
    const res = await fetch("/api/monitors", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })

    const data = await res.json()

    if (res.ok) {
      setMonitors((prev) => [data, ...prev])
      setForm({ name: "", url: "" })
    }
  }

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <div className="text-2xl font-bold mb-4 flex flex-row justify-start items-center gap-2">
        <SiStatuspage />
        <p>PingStatus</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <Input
          type="text"
          placeholder="Name"
          className="border px-3 py-2 rounded flex-1"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          type="url"
          placeholder="https://example.com"
          className="border px-3 py-2 rounded flex-1"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />
        <Button
          onClick={addMonitor}
          className="px-4 py-2 rounded font-semibold"
        >
          Add
        </Button>
      </div>

      <ul className="space-y-3">
        {monitors.map((monitor: Monitor) => (
          <Monitor key={monitor.id} monitor={monitor} />
        ))}
      </ul>
    </main>
  )
}
