"use client";

import { T_orderResponse } from "@/types/orderResponseType";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { deleteOrder } from "@/actions/order.action";
import { useEffect, useRef, useState } from "react";
import { getUserStatus } from "@/actions/user.action";
import { useRouter } from "next/navigation";
import OrderReview from "./OrderReview";

const Orders = ({ customerOrders }: { customerOrders: T_orderResponse[] }) => {
  const [status, setStatus] = useState();
  const router = useRouter();
  const hasShowed = useRef(false);
  useEffect(() => {
    (async () => {
      const { data } = await getUserStatus();
      const userStatus = data?.data?.status;
      setStatus(userStatus);

      if (userStatus !== "ACTIVE" && !hasShowed.current) {
        hasShowed.current = true;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Currently You Are Not Allowed For This Action !",
          confirmButtonColor: "#008080",
        });
        return router.push("/");
      }
    })();
  }, []);

  const handleOrderDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure to delete this order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008080",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await deleteOrder(id);
        if (data.success === true) {
          return Swal.fire({
            title: "Deleted!",
            text: "Your order has been deleted.",
            icon: "success",
            confirmButtonColor: "#008080",
          });
        } else {
          return Swal.fire({
            icon: "error",
            title: "Unfortunate...",
            text: data?.data,
            confirmButtonColor: "#008080",
          });
        }
      }
    });
  };

  if (status !== "ACTIVE") {
    return null;
  }
  return (
    <div>
      {customerOrders?.length === 0 ? (
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            You Have No Order Yet
          </h1>
          <h1 className="text-center text-slate-600 font-semibold mt-1">
            Hurry Up ! to place your order
          </h1>

          <div className="relative w-full h-72 sm:h-96 mt-3">
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
        <div className="max-w-6xl mx-auto mt-1.5">
          <Table>
            <TableCaption className="font-bold text-[14px]">
              A List Of Your Recent Orders.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-[16px]">
                  Order ID
                </TableHead>
                <TableHead className="font-bold text-[16px]">
                  Creation Date
                </TableHead>
                <TableHead className="font-bold text-[16px]">Time</TableHead>
                <TableHead className="font-bold text-[16px]">
                  Total Amount (TK.)
                </TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerOrders?.map((order: T_orderResponse) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="font-medium">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.total_amount}
                  </TableCell>
                  <TableCell className="flex justify-end items-center gap-3">
                    <Link href={`/customer/my_orders/${order.id}`}>
                      <Button className="bg-[#008080] hover:bg-[#008080] font-semibold cursor-pointer">
                        View Details
                      </Button>
                    </Link>

                    <Button
                      onClick={() => handleOrderDelete(order.id)}
                      className="cursor-pointer bg-red-600 hover:bg-red-600"
                    >
                      <AiFillDelete className="text-white" /> Delete
                    </Button>

                    <OrderReview order={order} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Orders;
