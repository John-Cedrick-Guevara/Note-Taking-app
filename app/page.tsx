import Link from "next/link";

export default function Home() {
  return (
    <main className="flex  items-center justify-center flex-col h-svh">
      <h1 className="text-5xl mb-5 text-center">Welcome to NoteTake</h1>

      <div className="flex justify-between gap-3 ">
        <button className="btn btn-outline btn-secondary">
          <Link href={"/signUp"}>Sign Up</Link>
        </button>
        <button className="btn btn-outline btn-secondary">
          <Link href={"/logIn"}>Log In</Link>
        </button>
      </div>
    </main>
  );
}
