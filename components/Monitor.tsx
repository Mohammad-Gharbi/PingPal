"use client"

import { useEffect, useState } from "react"
import { RiCheckboxCircleFill } from "@remixicon/react"

import { Card } from "@/components/Card"
import { Tracker } from "@/components/Tracker"

interface Monitor {
  id: string
  name: string
  url: string
}

interface PingLog {
  id: string
  status: string
  responseMs: number
  checkedAt: string
}

interface CombinedData {
  tooltip: string
  color: string
}

interface Props {
  monitor: Monitor
}

type Status = "UP" | "DOWN"

const colorMapping: Record<Status, string> = {
  UP: "bg-emerald-500 dark:bg-emerald-500",
  DOWN: "bg-red-500 dark:bg-red-500",
}

// const data = [
//   {
//     tooltip: "23 Sep, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "24 Sep, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "25 Sep, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "26 Sep, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "27 Sep, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "28 Sep, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "29 Sep, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "30 Sep, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "1 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "2 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "3 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "4 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "5 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "6 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "7 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "8 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "9 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "10 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "11 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "12 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "13 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "14 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "15 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "16 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "17 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "18 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "19 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "20 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "21 Oct, 2023",
//     status: "DOWN",
//   },
//   {
//     tooltip: "22 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "23 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "24 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "25 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "26 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "27 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "28 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "29 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "30 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "31 Oct, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "1 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "2 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "3 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "4 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "5 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "6 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "7 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "8 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "9 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "10 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "11 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "12 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "13 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "14 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "15 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "16 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "17 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "18 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "19 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "20 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "21 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "22 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "23 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "24 Nov, 2023",
//     status: "DOWN",
//   },
//   {
//     tooltip: "25 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "26 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "27 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "28 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "29 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "30 Nov, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "1 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "2 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "3 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "4 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "5 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "6 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "7 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "8 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "9 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "10 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "11 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "12 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "13 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "14 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "15 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "16 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "17 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "18 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "19 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "20 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "21 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "22 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "23 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "24 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "25 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "26 Dec, 2023",
//     status: "UP",
//   },
//   {
//     tooltip: "27 Dec, 2023",
//     status: "UP",
//   },
// ]

// const combinedData = data.map((item) => {
//   return {
//     ...item,
//     color: colorMapping[item.status as Status],
//   }
// })

export default function Monitor({ monitor }: Props) {
  const [logs, setLogs] = useState<PingLog[]>([])
  const [combinedData, setCombinedData] = useState<CombinedData[]>([])

  const fetchLogs = async () => {
    try {
      const res = await fetch(`/api/monitors/${monitor.id}/logs`)
      const data = await res.json()
      setLogs(data.logs)
    } catch (err) {
      console.error("Error fetching logs", err)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [monitor.id])

  useEffect(() => {
    const data = logs.map((log) => {
      return {
        tooltip: new Date(log.checkedAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        color: colorMapping[log.status as Status],
      }
    })

    setCombinedData(data)
  }, [logs])

  return (
    <>
      <Card>
        <div className="flex items-center justify-between ">
          <h3 className="font-bold text-gray-900 dark:text-gray-50">
            {monitor.name}
          </h3>
          <span
            tabIndex={1}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm text-gray-700 ring-1 ring-inset ring-gray-200 dark:text-gray-300 dark:ring-gray-800"
          >
            <span
              className="-ml-0.5 size-2 rounded-full bg-emerald-500 dark:bg-emerald-500"
              aria-hidden={true}
            />
            {logs[logs.length - 1]?.status}
          </span>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <RiCheckboxCircleFill
              className="size-5 shrink-0 text-emerald-500 dark:text-emerald-500"
              aria-hidden={true}
            />
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
              {monitor.url.replace(/^https?:\/\//, "")}
            </p>
          </div>
        </div>
        <Tracker data={combinedData} className="mt-4 hidden w-full lg:flex" />
        <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
          <span className="block">30 days ago</span>
          <span>Today</span>
        </div>
      </Card>
    </>
  )
}
