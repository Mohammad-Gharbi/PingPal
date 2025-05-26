import Link from "next/link"
import { Button } from "./ui/button"

export default function Nav() {
  return (
    <header className="fixed top-0 z-20 bg-opacity-80 dark:bg-opacity-0 backdrop-blur-xl w-full px-14 py-8 flex md:flex-row flex-col md:justify-between justify-center items-center md:gap-0 gap-8 md:items-baseline">
      <div className="text-3xl text-neutral-700 dark:text-neutral-300 font-bold">
        app.
      </div>
      <div className="hidden w-56 h-4 md:flex flex-row justify-between items-baseline">
        <Button asChild variant="ghost">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Create Account</Link>
        </Button>
      </div>
    </header>
  )
}
