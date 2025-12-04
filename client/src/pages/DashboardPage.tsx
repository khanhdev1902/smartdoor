import NewUserDialog from "@/components/Dialog/NewUserDialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { type User } from "@/types/User";
import { useState } from "react";

export default function Dashboard() {
  const { users, loading, error, createUser } = useUser();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<User>({
    name: "",
    status: "active",
    fingerprint_id: "",
  });

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  const handleSubmit = async () => {
    setOpen(false);
    await createUser(form);
    // await fetchUsers();

    // clear form nếu cần
    setForm({
      name: "",
      status: "active",
      fingerprint_id: "",
    });
  };

  return (
    <div className="w-full h-full container px-10 py-5">
      <div className="flex flex-row justify-between items-center">
        <div className="space-x-5">
          <Button variant="outline">Mở cửa</Button>
          <Button variant="outline">Đóng cửa</Button>
        </div>

        <div>
          <div className="flex flex-row items-end gap-4 shadow-sm px-5 py-3 rounded-full">
            <span className="text-lg">Thêm người dùng mới:</span>
            <Button
              variant="outline"
              onClick={() => setOpen(true)}
              className="rounded-3xl shadow-sm"
            >
              Tạo người dùng
            </Button>
          </div>

          <NewUserDialog
            open={open}
            setOpen={setOpen}
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      <div className="mt-4">
        {users.map((item) => (
          <div key={item.id}>
            {item.name} — {item.status} — {item.fingerprint_id}
          </div>
        ))}
      </div>
    </div>
  );
}
