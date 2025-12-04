import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { useRef } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import type { User } from "@/types/User";
import { useDoor } from "@/hooks/useDoor";
import { toast } from "sonner";
type CreateNewInputProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  form: User;
  setForm: React.Dispatch<React.SetStateAction<User>>;
  handleSubmit: (delUser?: boolean) => Promise<void>;
};

export default function UserDialog({
  open,
  setOpen,
  form,
  setForm,
  handleSubmit,
}: CreateNewInputProps) {
  const { fetchFingerprint } = useDoor();
  const fingerprint_idRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef?: React.RefObject<HTMLInputElement | null>
  ) => {
    if (e.key === "Enter" && nextRef?.current) {
      nextRef.current.focus();
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Thông tin người dùng</DialogTitle>
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
              onKeyDown={(e) => handleKeyDown(e, fingerprint_idRef)}
              className="focus-visible:ring-0 focus:outline-none"
            />
          </div>

          <div className="flex flex-col space-y-4 my-8">
            <Label htmlFor="status">Trạng thái</Label>
            <RadioGroup
              value={form.status} // ← bind state
              onValueChange={(val: string) => setForm({ ...form, status: val })} // ← update form
              className="flex flex-row rounded-lg p-2 py-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="active" id="r1" />
                <Label htmlFor="r1">Active</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="banner" id="r2" />
                <Label htmlFor="r2">Banner</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="fingerprint_id">Vân tay ID</Label>
            <div className="flex flex-row gap-3">
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
              <Button
                variant={"outline"}
                className=" rounded-3xl"
                onClick={async () => {
                  const id = await fetchFingerprint();
                  setForm((prev) => ({
                    ...prev,
                    fingerprint_id: id,
                  }));
                  toast.success("Lấy vân tay thành công !");
                }}
              >
                Lấy vân tay
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          {form.id !== 0 && (
            <Button
              className="px-8 text-red-700"
              variant={"outline"}
              onClick={() => {
                handleSubmit(true);
              }}
            >
              Xóa
            </Button>
          )}
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={() =>
                setForm({
                  id: 0,
                  name: "",
                  status: "active",
                  fingerprint_id: "",
                })
              }
            >
              Hủy bỏ
            </Button>
          </DialogClose>
          <Button
            variant="outline"
            onClick={() => {
              handleSubmit();
            }}
          >
            Lưu người dùng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
