import ViewMedicineDynamically from "@/components/modules/PublicSegment/ViewMedicineDynamically";
import { publicServices } from "@/services/public.services";

const MedicineDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await publicServices.getMedicineById(id);
  const medicineData = data?.data;
  return (
    <div className="max-w-7xl mx-auto px-3.5 pt-12">
      <ViewMedicineDynamically medicineData={medicineData} />
    </div>
  );
};

export default MedicineDetailsPage;
