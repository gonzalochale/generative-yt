import SignOutButton from "@/components/auth/signout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDisclaimer } from "@/components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = async () => {
  const user = await getUser();
  return (
    <header className="w-full flex items-center justify-between select-none">
      <div className="w-full flex justify-start">
        <h1 className="font-semibold text-lg sm:text-xl tracking-tighter text-transparent bg-gradient-to-tr from-foreground to-muted-foreground bg-clip-text">
          GenerativeYT
        </h1>
      </div>
      <div className="max-sm:hidden w-full flex justify-center items-center gap-2">
        <p className="text-sm">Memory full</p>
        <TooltipProvider delayDuration={0.3}>
          <Tooltip>
            <TooltipTrigger>
              <IconDisclaimer className="text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-48">
              <p className="text-sm text-muted-foreground">
                Just kidding! We dont store any data in any form (or do we?)
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="w-full flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="hover:cursor-pointer w-8 h-8">
              <AvatarImage
                src={user?.user_metadata.avatar_url}
                alt={user?.user_metadata.full_name}
              />
              <AvatarFallback>
                {user?.user_metadata.full_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="p-0">
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
