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
            <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
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
