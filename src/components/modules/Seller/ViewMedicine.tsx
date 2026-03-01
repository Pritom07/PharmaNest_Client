"use client";

import { getAllMedicines } from "@/actions/medicine.action";
import EditDialog from "@/components/layout/Dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { T_medicineData } from "@/types/medicineDataTypes";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const ViewMedicine = () => {
  const [medicineData, setMedicineData] = useState<{
    data?: T_medicineData[];
    metadata?: any;
    success?: boolean;
  }>({});

  useEffect(() => {
    (async () => {
      const { data } = await getAllMedicines();
      if (data.success === true) {
        setMedicineData(data);
      }
    })();
  }, []);

  const medicines = medicineData?.data;
  const metaData = medicineData?.metadata;
  return (
    <div className="max-w-7xl mx-auto py-3 px-3.5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-slate-600 font-bold">Image</TableHead>
            <TableHead className="text-slate-600 font-bold">Name</TableHead>
            <TableHead className="text-slate-600 font-bold">Category</TableHead>
            <TableHead className="text-slate-600 font-bold">
              Price (TK.)
            </TableHead>
            <TableHead className="text-slate-600 font-bold">Stock</TableHead>
            <TableHead className="text-slate-600 font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines?.map((medicine) => (
            <TableRow key={medicine.id}>
              <TableCell>
                <img src={medicine.img_url} className="w-12" />
              </TableCell>
              <TableCell className="font-bold text-[15px]">
                {medicine.name}
              </TableCell>
              <TableCell>
                <Button className="bg-amber-600 hover:bg-amber-600 hover:text-white rounded-lg">
                  {medicine.medicine_Category?.name}
                </Button>
              </TableCell>
              <TableCell className="font-bold text-[15px]">
                {medicine.price}
              </TableCell>
              <TableCell className="font-bold text-[15px]">
                {medicine.stock}
              </TableCell>
              <TableCell>
                <Button className="bg-red-600 text-white text-xl hover:bg-red-600 hover:text-white cursor-pointer">
                  <AiFillDelete />
                </Button>
              </TableCell>
              <TableCell>
                <EditDialog />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewMedicine;
