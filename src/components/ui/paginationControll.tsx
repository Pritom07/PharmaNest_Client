"use client";

import { T_paginationMedicineMetaData } from "@/types/paginationMetaDataForMedicines";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserStatus } from "@/actions/user.action";

const PaginationControll = ({
  length,
  metaData,
}: {
  length: number;
  metaData: T_paginationMedicineMetaData;
}) => {
  const [status, setStatus] = useState();
  const { total, currentPage, totalPages, size } = metaData;
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await getUserStatus();
      const userStatus = data?.data?.status;
      setStatus(userStatus);
    })();
  }, []);

  if (status && status !== "ACTIVE") {
    return null;
  }

  const navigate = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  let start = (currentPage - 1) * size + 1;
  let end = Math.min(currentPage * size, total);

  return (
    <div>
      {length === 0 ? (
        <></>
      ) : (
        <div className="max-w-7xl mx-auto mt-8 lg:mt-3 px-3.5 flex flex-col lg:flex-row justify-between items-center gap-2.5 pb-3">
          <div className=" text-gray-600 font-semibold">
            Result : {start} to {end} of {total}
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate(1)}
              disabled={currentPage === 1}
              className="p-2 cursor-pointer bg-[#008080] hover:bg-[#008080]"
            >
              <ChevronsLeft size={18} />
            </Button>

            <Button
              onClick={() => navigate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 cursor-pointer bg-[#008080] hover:bg-[#008080]"
            >
              <ChevronLeft size={18} />
            </Button>

            <span className=" font-medium">
              Page : {currentPage} of {totalPages}
            </span>

            <Button
              onClick={() => navigate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 cursor-pointer bg-[#008080] hover:bg-[#008080]"
            >
              <ChevronRight size={18} />
            </Button>

            <Button
              onClick={() => navigate(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 cursor-pointer bg-[#008080] hover:bg-[#008080]"
            >
              <ChevronsRight size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginationControll;
