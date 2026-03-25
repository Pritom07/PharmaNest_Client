"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateCategoryDialog from "./CreateCategoryDialog";
import { Button } from "@/components/ui/button";
import { AiFillDelete } from "react-icons/ai";
import EditCategoryDialog from "./EditCategoryDialog";
import Swal from "sweetalert2";
import { T_category } from "@/types/categoryResponseType";
import Image from "next/image";
import { deleteCategory } from "@/actions/category.action";

const CategoryHandle = ({ categories }: { categories: T_category[] }) => {
  const handleDeleteCategory = (id: number, name: string) => {
    Swal.fire({
      title: `Are you sure to delete ${name}?`,
      text: "You won't be able to revert this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#43A047",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await deleteCategory(id);
        if (data.success === true) {
          return Swal.fire({
            title: "Deleted!",
            text: `${name} category has been deleted.`,
            icon: "success",
            confirmButtonColor: "#008080",
          });
        }

        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Category Not Exist",
        });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-end">
        <CreateCategoryDialog />
      </div>

      <div>
        {categories.length === 0 ? (
          <div>
            <h1 className="text-center text-2xl font-bold">
              No Medicine Category Added Yet !
            </h1>
            <h1 className="text-center text-slate-500 font-semibold mt-1">
              Start by adding a new category to organize your medicines.
            </h1>
            <div className="relative w-full h-96">
              <Image
                src="/images/not_Found.png"
                alt="notFound"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Total Medicines</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>
                  <></>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category: T_category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-semibold">{category.id}</TableCell>
                  <TableCell className="font-semibold">
                    {category.name}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {category.count}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {category.description.slice(0, 80)}...
                  </TableCell>
                  <TableCell className="flex justify-end items-center gap-3">
                    <EditCategoryDialog
                      category_id={category.id as number}
                      name={category.name}
                      description={category.description}
                    />
                    <Button
                      onClick={() =>
                        handleDeleteCategory(
                          category.id as number,
                          category.name,
                        )
                      }
                      className="bg-red-600 hover:bg-red-600 cursor-pointer"
                    >
                      <AiFillDelete /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default CategoryHandle;
