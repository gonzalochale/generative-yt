import { getUser } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export async function UserMessage({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  console.log(user);
  return (
    <div className="w-full group relative flex gap-3 items-center justify-end border">
      <div className="flex-1 text-right">{children}</div>
      <Avatar>
        <AvatarImage src={user?.user_metadata.url} alt="@generative-yt" />
        <AvatarFallback>G</AvatarFallback>
      </Avatar>
    </div>
  );
}
