import { getUser } from "@/lib/auth";
import { Chat } from "@/components/chat/chat";
import { nanoid } from "@/lib/utils";
import Header from "@/components/header";
import { SampleChat } from "@/components/chat/sample-chat";

const page = async () => {
  const user = await getUser();
  const id = nanoid();

  return (
    <main className="container w-full h-dvh flex flex-col justify-center items-center py-5">
      <Header />
      {user ? <Chat id={id} /> : <SampleChat />}
    </main>
  );
};

export default page;
