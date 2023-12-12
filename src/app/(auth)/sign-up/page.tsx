import { Button, TextInput } from "@/components/base";

export default function SignUpPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 sm:p-24 bg-slate-50">
      <div className="container mx-auto w-full bg-slate-50 sm:w-96 border-0 border-slate-300 p-6 flex flex-col items-center w-full sm:border mb-4">
        <div className="text-center mb-6 text-4xl">Puros</div>
        <TextInput className="mb-2 w-full" placeholder="Email" />
        <TextInput className="mb-6 w-full" placeholder="Password" type="password" />
        <Button text="Sign up" className="w-full mb-4" />
      </div>
      <div className="container mx-auto w-full bg-slate-50 sm:w-96 border-0 border-slate-300 p-6 flex flex-col items-center w-full sm:border">
        <div className="text-sm text-slate-600">
          Have an account?{" "}
          <a className="text-blue-500 font-semibold" href="/sign-in">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
