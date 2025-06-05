import Link from "next/link"
import { Button } from "./ui/button"
import { SiStatuspage } from "react-icons/si"

export default function Hero() {
  return (
    <div className="pt-48 md:px-0 px-8 flex flex-col items-center justify-center gap-4">
      <div className="text-center text-neutral-900 dark:text-neutral-50 text-6xl md:text-8xl font-bold flex flex-row justify-start items-center gap-2">
        <SiStatuspage />
        PingStatus
      </div>
      <div className="text-lg text-center max-w-[35em] text-neutral-700 dark:text-neutral-300 font-medium">
        A lightweight website uptime monitoring tool.
      </div>
      <div className="pt-8">
        <Button asChild className="font-medium text-lg" size="lg">
          <Link href="/login">Get Started</Link>
        </Button>
      </div>
    </div>
  )
}
