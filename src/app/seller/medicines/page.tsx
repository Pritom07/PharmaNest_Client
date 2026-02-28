import { redirect } from "next/navigation";

const ManageMedicines = () => {
  return redirect("/seller/medicines/add_medicine");
};

export default ManageMedicines;
