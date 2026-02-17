import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface StudentsActionsMenuProps {
  studentId: string
}

export const StudentsActionsMenu = ({ studentId }: StudentsActionsMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => console.log("Voir", studentId)}>
          Voir le profil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Modifier", studentId)}>
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Supprimer", studentId)}>
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}