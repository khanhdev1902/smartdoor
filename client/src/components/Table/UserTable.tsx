import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { User } from "@/types/User";
import { SquarePen } from "lucide-react";

interface UserTableProps {
  users: User[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setForm: React.Dispatch<React.SetStateAction<User>>;
}
export function UserTable({ users, setOpen, setForm }: UserTableProps) {
  return (
    <Table className=" select-none">
      <TableCaption>Danh sách người dùng</TableCaption>
      <TableHeader>
        <TableRow className="text-[17px] font-bold">
          <TableHead className="min-w-[100px]">Tên người dùng</TableHead>
          <TableHead className="text-center">Trạng thái</TableHead>
          <TableHead className="text-center">Vân tay ID</TableHead>
          <TableHead className="text-center">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, key) => (
          <TableRow key={key}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className={cn("flex justify-center font-bold")}>
              <div
                className={cn(
                  " rounded-xl p-1 px-5 shadow-sm w-fit text-green-800 bg-[#00ff001e]",
                  user.status=="banner" && "text-red-800 bg-[#ff000020]"
                )}
              >
                {user.status}
              </div>
            </TableCell>
            <TableCell className="text-center">{user.fingerprint_id}</TableCell>
            <TableCell className="flex justify-center cursor-pointer active:scale-95 hover:scale-105 duration-300">
              <SquarePen
                size={22}
                className=" text-[#c02425]"
                onClick={() => {
                  setOpen(true);
                  setForm(user);
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
