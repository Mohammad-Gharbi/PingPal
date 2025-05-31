import { Suspense } from "react"
import { LoginForm } from "./form"

export default function LoginPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-96 text-center">
          <div className="text-3xl font-bold mb-8">Login</div>
          <LoginForm />
        </div>
      </div>
    </Suspense>
  )
}
