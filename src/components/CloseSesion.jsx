import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react"

export function CloseSesion({ urlIcon, fallbackInitial, CloseSesionAlert }) {

    return (
        <>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full p-0 hover:bg-transparent">
            <Avatar className="h-11 w-11 cursor-pointer ring-2 ring-white/20 hover:ring-white/40 transition-all">
                <AvatarImage src={urlIcon} alt="Avatar-img" />
                <AvatarFallback>{fallbackInitial || '?'}</AvatarFallback>
            </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => CloseSesionAlert?.()}>
            <LogOutIcon />
            Sign Out
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    </>
    
    )
}
