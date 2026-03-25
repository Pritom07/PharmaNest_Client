import CategoryHandle from "@/components/modules/Admin/CategoryHandle";
import PaginationControll from "@/components/ui/paginationControll";
import { categoryServices } from "@/services/category.services";

const CategoryManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data } = await categoryServices.getAllCategory(
    { page },
    { cache: "no-store" },
  );
  const categories = data?.data;
  const metaData = data?.metaData;
  return (
    <div className="max-w-7xl mx-auto px-3.5 pt-3">
      <CategoryHandle categories={categories} />
      <PaginationControll length={categories.length} metaData={metaData} />
    </div>
  );
};

export default CategoryManagementPage;
