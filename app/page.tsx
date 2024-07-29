import Chat from "@/components/dashboard/chat";
import LoginButton from "@/components/dashboard/login-button";
import SignOutButton from "@/components/dashboard/signout-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { getUser } from "@/lib/auth";

export default async function Home() {
  const user = await getUser();

  return (
    <main className="container w-full min-h-dvh flex flex-col gap-3 justify-start items-center py-10">
      {user ? (
        <>
          <header className="flex gap-10 p-2 items-center border rounded-[1.25rem] bg-card">
            <div className="flex items-center gap-1">
              <Avatar>
                <AvatarImage
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata.full_name}
                />
                <AvatarFallback>
                  {user.user_metadata.full_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Label>{user.user_metadata.full_name}</Label>
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <SignOutButton />
            </div>
          </header>
          <div className="flex flex-col flex-wrap max-w-2xl border"></div>
          <Chat />
        </>
      ) : (
        <section className="w-full h-full flex flex-1 items-center justify-center">
          <LoginButton />
        </section>
      )}
    </main>
  );
}
