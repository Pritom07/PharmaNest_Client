import UserHandle from "@/components/modules/Admin/UserHandle";
import PaginationControll from "@/components/ui/paginationControll";
import { userServices } from "@/services/user.service";

const UserManagementPage = async () => {
  const { data } = await userServices.getAllUsers();
  const users = data?.data;
  const usersLength = users?.length;
  const metaData = data?.metaData;
  return (
    <div className="max-w-7xl mx-auto px-3.5 pt-3">
      <UserHandle users={users} />
      <PaginationControll length={usersLength} metaData={metaData} />
    </div>
  );
};

export default UserManagementPage;
