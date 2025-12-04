import NewUserDialog from "@/components/Dialog/NewUserDialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";

export default function Dashboard() {
  const { users, loading, error} = useUser();
  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  console.log(JSON.stringify(users, null, 2));

  return (
    <div className="w-full h-full container px-10 py-5">
      <div className=" flex flex-row justify-between items-center">
        <div className=" space-x-5">
          <Button className="" variant={"outline"}>Mở cửa</Button>
          <Button className="" variant={"outline"}>Đóng cửa</Button>
        </div>
        <NewUserDialog label="Thêm người dùng mới: " buttonName="Tạo người dùng"/>
      </div>
      <div>
        {users.map((item, key)=>(
          <div key={key}>{`${item.name}-${item.status}-${item.fingerprint_id}`}</div>
        ))}
      </div>
    </div>
  );
}
