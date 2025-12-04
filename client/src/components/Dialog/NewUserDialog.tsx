import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useUser } from "@/hooks/useUser";
type CreateNewInputProps = {
  label?: string;
  buttonName?: string;
};

export default function NewUserDialog({
  label,
  buttonName,
}: CreateNewInputProps) {
  const { createUser } = useUser();
  const [form, setForm] = useState({
    name: "",
    status: "active",
    fingerprint_id: "",
  });

  const statusRef = useRef<HTMLInputElement>(null);
  const fingerprint_idRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    createUser(form);
    console.log("New service:", form);
    setOpen(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef?: React.RefObject<HTMLInputElement | null>
  ) => {
    if (e.key === "Enter" && nextRef?.current) {
      nextRef.current.focus();
    }
  };
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-row items-end gap-4 shadow-sm px-5 py-3 rounded-full">
      <label htmlFor="" className=" text-lg">
        {label}
      </label>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className=" rounded-3xl shadow-sm">
            {buttonName}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm người dùng mới</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Tên</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ví dụ: Khanh..."
                value={form.name}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, statusRef)}
                className="focus-visible:ring-0 focus:outline-none"
              />
            </div>

            {/* Giá */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Input
                ref={statusRef}
                id="status"
                name="status"
                type="text"
                placeholder="Ví dụ: active"
                value={form.status}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, fingerprint_idRef)}
                className="focus-visible:ring-0 focus:outline-none"
              />
            </div>

            {/* Đơn vị */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="fingerprint_id">Vân tay ID</Label>
              <Input
                ref={fingerprint_idRef}
                id="fingerprint_id"
                name="fingerprint_id"
                placeholder="Loading..."
                value={form.fingerprint_id}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit(); // Enter cuối → submit
                }}
                className="focus-visible:ring-0 focus:outline-none"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Hủy bỏ</Button>
            </DialogClose>
            <Button
              variant="outline"
              onClick={() => {
                handleSubmit(); // submit xong
                setOpen(false); // đóng modal
              }}
            >
              Lưu dịch vụ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
