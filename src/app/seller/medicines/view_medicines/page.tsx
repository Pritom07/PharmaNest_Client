import ViewMedicine from "@/components/modules/Seller/ViewMedicine";
import PaginationContrill from "@/components/ui/paginationContrill";
import { medicineServices } from "@/services/medicine.services";

const All_Medicines = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data } = await medicineServices.viewAllMedicines(
    { page },
    { cache: "no-store" },
  );
  const medicines = data?.data;
  const metaData = data?.metadata;

  return (
    <div>
      <ViewMedicine medicines={medicines} />
      <PaginationContrill metaData={metaData} />
    </div>
  );
};

export default All_Medicines;
