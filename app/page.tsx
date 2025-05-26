import Hero from "@/components/Hero"
import { ModeToggle } from "@/components/ModeToggle"
import Nav from "@/components/Nav"

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Nav />
      <Hero />
    </div>
  )
}
