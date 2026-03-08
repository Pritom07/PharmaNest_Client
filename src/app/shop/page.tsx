import PublicPage from "@/components/modules/PublicSegment/PublicPage";
import PaginationControll from "@/components/ui/paginationControll";
import { publicServices } from "@/services/public.services";

const ShopPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    sortBy: string;
    sortOrder: string;
    category_id: string;
  }>;
}) => {
  const { page, sortBy, sortOrder, category_id } = await searchParams;
  const { data } = await publicServices.getAllMedicines(
    { page, sortBy, sortOrder, category_id },
    { cache: "no-store" },
  );
  const medicineData = data?.data;
  const metadata = data?.metadata;

  return (
    <div className="max-w-7xl mx-auto pt-5 px-3.5">
      <PublicPage medicineData={medicineData} />
      <PaginationControll metaData={metadata} />
    </div>
  );
};

export default ShopPage;
