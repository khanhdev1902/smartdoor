import doorAPI from "@/apis/doorAPI";
import UserDialog from "@/components/Dialog/UserDialog";
import { UserTable } from "@/components/Table/UserTable";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { type User } from "@/types/User";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const { users, loading, error, createUser, updateUser, deleteUser } =
    useUser();
  const [open, setOpen] = useState(false);
  const [statusDoor, setStatusDoor] = useState(false);
  const [form, setForm] = useState<User>({
    id: 0,
    name: "",
    status: "active",
    fingerprint_id: "",
  });
  const openDoor = async (open: string = "open") => {
    const res = await doorAPI.openDoor({ statusDoor: open });
    console.log(res.data.open);
    const data = res.data.open;
    setStatusDoor(data);
  };
  useEffect(() => {
    const fechOpenDoor = async () => {
      const res = await doorAPI.getFingerprintID();
      console.log(res.data.open);
      const data = res.data.open;
      setStatusDoor(data);
    };
    fechOpenDoor();
  }, []);
  if (loading) return <p>Đang tải...</p>;
  if (error) {
    toast.error("Vân tay đã tồn tại !", {
      action: { label: "Undo", onClick: () => {} },
    });
  }

  const handleSubmit = async (delUser: boolean = false) => {
    if (form.name === "") {
      toast.warning("Vui lòng nhập tên !", {
        action: { label: "Undo", onClick: () => {} },
      });
      return;
    }
    if (form.fingerprint_id === "") {
      toast.warning("Vui lòng nhập ID vân tay!", {
        action: { label: "Undo", onClick: () => {} },
      });
      return;
    }
    if (form.id !== 0) {
      if (delUser) {
        await deleteUser(form.id);
        toast.success(`Đã xóa ${form.name} ra khỏi cơ sở dữ liệu !`, {
          action: { label: "Undo", onClick: () => {} },
        });
      } else {
        await updateUser(form.id, form);
        toast.success(`Cập nhập thông tin của ${form.name} thành công !`, {
          action: { label: "Undo", onClick: () => {} },
        });
      }
    } else {
      await createUser(form);
      toast.success(`Thêm mới người dùng ${form.name} thành công  !`, {
        action: { label: "Undo", onClick: () => {} },
      });
    }
    setForm({
      id: 0,
      name: "",
      status: "active",
      fingerprint_id: "",
    });
    setOpen(false);
  };

  return (
    <div className="w-full h-full container px-10 py-5">
      <div className="flex flex-row justify-between min-h-52">
        <div className="p-3 rounded-3xl shadow-sm h-fit flex items-center gap-10 px-7">
          <div className=" rounded-2xl shadow-sm flex justify-between items-center gap-12 px-10 py-3 border">
            <span className="text-lg">Trạng thái cửa:</span>
            <span
              className={cn(
                "bg-[#b200001a] px-14 py-2 rounded-4xl font-bold text-red-800",
                statusDoor && "bg-[#00acb21a] text-green-800 "
              )}
            >
              {statusDoor ? "Đang mở" : "Đang đóng"}
            </span>
          </div>
          <div className=" space-x-2">
            <Button
              variant={"outline"}
              className=" px-10 rounded-4xl"
              onClick={() => openDoor("close")}
            >
              Đóng
            </Button>
            <Button
              variant={"outline"}
              className=" px-10 rounded-4xl"
              onClick={() => openDoor("open")}
            >
              Mở
            </Button>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-end gap-4 shadow-sm px-5 py-3 rounded-full">
            <span className="text-lg hidden sm:flex">Thêm người dùng mới:</span>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(true);
                setForm({
                  id: 0,
                  name: "",
                  status: "active",
                  fingerprint_id: "",
                });
              }}
              className="rounded-3xl shadow-sm"
            >
              Thêm mới
            </Button>
          </div>
          <UserDialog
            open={open}
            setOpen={setOpen}
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      <div>
        <div className="color-primary font-bold text-2xl pb-5">
          Danh sách người dùng
        </div>
        <UserTable users={users} setOpen={setOpen} setForm={setForm} />
      </div>
    </div>
  );
}
