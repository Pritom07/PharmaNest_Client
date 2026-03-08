import { publicServices } from "@/services/public.services";

const MedicineDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await publicServices.getMedicineById(id);
  return (
    <div>
      <h1>medicine : {id}</h1>
    </div>
  );
};

export default MedicineDetailsPage;
