import { RegisterForm } from "./form"

export default function RegisterPage() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-96 text-center">
          <div className="text-3xl font-bold mb-8">Sign up</div>
          <RegisterForm />
        </div>
      </div>
    </>
  )
}
