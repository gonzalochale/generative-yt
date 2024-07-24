import LoginButton from "@/components/dashboard/login-button";
import SignOutButton from "@/components/dashboard/signout-button";
import { getUser } from "@/lib/auth";

export default async function Home() {
  const user = await getUser();
  return (
    <main className="w-full min-h-dvh flex gap-3 justify-center items-center">
      {user ? (
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-2xl">Welcome back, {user.email}!</h1>
          <SignOutButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </main>
  );
}
