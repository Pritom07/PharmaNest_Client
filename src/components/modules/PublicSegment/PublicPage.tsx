"use client";

import { T_medicineData } from "@/types/medicineDataTypes";
import PublicPageCard from "./PublicPageCard";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { T_priceFilter } from "@/types/priceFilterType";
import { useRouter, useSearchParams } from "next/navigation";
import { T_framework } from "@/types/FrameworkType";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getMedicineByName } from "@/actions/public.action";
import { useState } from "react";
import { Search } from "lucide-react";

const PublicPage = ({ medicineData }: { medicineData: T_medicineData[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const DEFAULT_SORT_BY = "createdAt";
  const DEFAULT_SORT_ORDER = "desc";

  const [medicine, setMedicine] = useState<T_medicineData[]>([]);
  const [loading, setLoading] = useState(false);

  const priceFilters: T_priceFilter[] = [
    { label: "High to Low", field: "price", value: "desc" },
    { label: "Low to High", field: "price", value: "asc" },
  ];

  const frameworks: T_framework[] = [
    { label: "Tablet", value: 1 },
    { label: "Capsule", value: 2 },
    { label: "Syrup", value: 3 },
    { label: "Injection", value: 4 },
    { label: "Antibiotic", value: 5 },
    { label: "Pain Relief", value: 6 },
    { label: "Antiseptic", value: 7 },
    { label: "Vitamin & Supplement", value: 8 },
    { label: "Diabetes Care", value: 9 },
    { label: "Cardiac Care", value: 10 },
    { label: "Skin Care", value: 11 },
    { label: "Eye & Ear Drops", value: 12 },
  ];

  const handlePriceFilter = (sortingBy: string, sortingOrder: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sortingBy);
    params.set("sortOrder", sortingOrder);
    router.push(`?${params.toString()}`);
  };

  const handleCategoryFilter = (val: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category_id", val.toString());
    router.push(`?${params.toString()}`);
  };

  const handleSearchMedicine = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const medicineData = Object.fromEntries(formData.entries());

    const { data } = await getMedicineByName(
      medicineData as { medicineSearchField: string },
    );

    setMedicine(data?.data || []);
    setLoading(false);

    e.target.reset();
  };

  return (
    <div className="px-3.5 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
          Top Medicines
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <Combobox
            items={priceFilters}
            itemToStringValue={(filterItem: T_priceFilter) => filterItem.label}
            onValueChange={(filterItem: T_priceFilter | null) =>
              handlePriceFilter(
                (filterItem?.field as string) ?? DEFAULT_SORT_BY,
                (filterItem?.value as string) ?? DEFAULT_SORT_ORDER,
              )
            }
          >
            <ComboboxInput
              placeholder="Sort By Price"
              className="border border-slate-300"
            />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(filterItem) => (
                  <ComboboxItem key={filterItem.value} value={filterItem}>
                    {filterItem.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

          <Combobox
            items={frameworks}
            itemToStringValue={(filterItem: T_framework) => filterItem.label}
            onValueChange={(filterItem: T_framework | null) =>
              handleCategoryFilter((filterItem?.value as number) ?? 0)
            }
          >
            <ComboboxInput
              placeholder="Filter By Category"
              className="border border-slate-300"
            />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(filterItem) => (
                  <ComboboxItem key={filterItem.value} value={filterItem}>
                    {filterItem.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <form
          onSubmit={handleSearchMedicine}
          className="flex w-full max-w-2xl shadow-md rounded-xl overflow-hidden border"
        >
          <div className="flex items-center px-3 text-slate-400">
            <Search size={20} />
          </div>

          <Input
            type="text"
            name="medicineSearchField"
            placeholder="Search medicine by name..."
            className="border-none focus-visible:ring-0 text-base"
            required
          />

          <Button
            type="submit"
            className="bg-[#008080] hover:bg-[#006666] rounded-none px-6 cursor-pointer"
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </form>
      </div>

      {medicine.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Search Results
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {medicine.map((item) => (
              <PublicPageCard key={item.id} medicine={item} />
            ))}
          </div>
        </div>
      )}

      {medicine.length === 0 && !loading && (
        <div className="mt-8 text-center text-red-500 font-semibold">
          No Such Medicine Found
        </div>
      )}

      <div className="mt-12">
        <h1 className="text-center font-bold text-3xl mb-7">All Medicines</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicineData?.map((medicine) => (
            <PublicPageCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicPage;
