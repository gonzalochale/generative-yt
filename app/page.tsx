import LoginButton from "@/components/auth/login-button";
import { getUser } from "@/lib/auth";
import { Chat } from "@/components/chat/chat";
import { nanoid } from "@/lib/utils";
import Header from "@/components/header";

const page = async () => {
  const user = await getUser();
  const id = nanoid();
  return (
    <main className="container w-full h-dvh flex flex-col justify-center items-center py-5">
      {user ? (
        <>
          <Header />
          <Chat id={id} />
        </>
      ) : (
        <LoginButton />
      )}
    </main>
  );
};

export default page;
