import Profilesection from "@/components/modules/Auth/profilesection";
import { userServices } from "@/services/user.service";

const ProfilePage = async () => {
  const data = await userServices.getSession();
  const currentUser = data?.user;
  return (
    <div className="max-w-7xl mx-auto px-3.5 pt-5">
      <Profilesection currentUser={currentUser} />
    </div>
  );
};

export default ProfilePage;
