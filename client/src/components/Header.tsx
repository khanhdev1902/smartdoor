import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Newspaper } from "lucide-react";
import { CalendarInput } from "./CaledarInput";
export default function Header() {
  return (
    <header className=" flex flex-row justify-between items-center px-10 py-4 shadow-sm w-full">
      <div className="flex flex-row gap-3 items-center">
        <Newspaper size={36} className="text-[#c02425]" />
        <span className="text-3xl font-bold color-primary">Smart Door</span>
      </div>
      <div className="flex flex-row gap-3 items-center">
        <CalendarInput/>
        <Bell size={36} className=" rounded-full p-2 border"/>
        <Avatar>
          <AvatarImage src="https://i.pinimg.com/736x/14/a9/dc/14a9dc8cb27f7cf1068e81b86b00977d.jpg" />
          <AvatarFallback>KD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
