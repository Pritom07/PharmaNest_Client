"use client";

import { deleteMedicine } from "@/actions/medicine.action";
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
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const ViewMedicine = ({ medicines }: { medicines: T_medicineData[] }) => {
  const handleDeletemedicine = (name: string, id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert ${name} !`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008080",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await deleteMedicine(id);
        if (data.success === true) {
          Swal.fire({
            title: "Deleted!",
            text: `${name} has been deleted.`,
            icon: "success",
            confirmButtonColor: "#008080",
          });
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5">
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
              <TableCell className="font-semibold lg:font-bold text-[15px]">
                {medicine.name}
              </TableCell>
              <TableCell>
                <Button className="bg-amber-600 hover:bg-amber-600 hover:text-white rounded-lg">
                  {medicine.category?.name}
                </Button>
              </TableCell>
              <TableCell className="font-semibold lg:font-bold text-[15px]">
                {medicine.price}
              </TableCell>
              <TableCell className="font-semibold lg:font-bold text-[15px]">
                {medicine.stock}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    handleDeletemedicine(medicine.name, medicine.id as string)
                  }
                  className="bg-red-600 text-white text-xl hover:bg-red-600 hover:text-white cursor-pointer"
                >
                  <AiFillDelete />
                </Button>
              </TableCell>
              <TableCell>
                <EditDialog medicine_id={medicine.id as string} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewMedicine;
