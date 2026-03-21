"use client";

import { getSellerEndOrders } from "@/actions/order.action";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { T_orderResponse } from "@/types/orderResponseType";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const AllCustomersOrders = () => {
  const [orders, setOrders] = useState<T_orderResponse[] | []>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getSellerEndOrders();
      const orders = data?.data;
      setOrders(orders);
    })();
  }, []);

  return (
    <div className="">
      {orders.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            No Orders Available !
          </h1>

          <p className="mt-2 font-semibold text-slate-600 text-sm md:text-[17px]">
            When customers place orders containing your medicines, they will
            appear here.
          </p>

          <div className="relative w-full h-64 md:h-96 mt-4">
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
        <div>
          <h1 className="text-center text-2xl md:text-3xl font-bold">
            All Customer Orders
          </h1>

          <div className="mt-5">
            {orders.map((order: T_orderResponse) => (
              <div
                key={order.id}
                className="bg-white rounded-xl border shadow-sm p-5 lg:p-3 mt-3.5"
              >
                {/* Mobile Layout */}
                <div className="flex flex-col gap-2 md:hidden">
                  <p className="font-bold break-all">Order ID: {order.id}</p>

                  <p className="font-semibold">
                    Date:{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  <p className="font-semibold">
                    Subtotal: {order.subtotal_amount} TK
                  </p>

                  <p className="font-semibold">
                    Delivery Charge: {order.delivery_charge} TK
                  </p>

                  <Link href={`/seller/orders/${order.id}`}>
                    <Button className="w-full mt-2 bg-[#008080] hover:bg-[#008080] text-white cursor-pointer">
                      View Details
                    </Button>
                  </Link>
                </div>

                {/* Tablet & Desktop Table Layout */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-bold text-[15px] break-all">
                          {order.id}
                        </TableCell>

                        <TableCell className="font-bold text-[15px]">
                          Date:{" "}
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </TableCell>

                        <TableCell className="font-bold text-[15px]">
                          Subtotal: {order.subtotal_amount} TK
                        </TableCell>

                        <TableCell className="font-bold text-[15px]">
                          Delivery Charge: {order.delivery_charge} TK
                        </TableCell>

                        <TableCell className="text-right">
                          <Link href={`/seller/orders/${order.id}`}>
                            <Button className="bg-[#008080] hover:bg-[#008080] text-white cursor-pointer">
                              View Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCustomersOrders;
