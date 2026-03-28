import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderServices } from "@/services/order.service";
import { T_orderResponse } from "@/types/orderResponseType";
import { TbCoinTaka } from "react-icons/tb";

const RecentOrders = async () => {
  const { data } = await orderServices.getRecentOrders();
  const recentOrders = data?.data;
  return (
    <div className="mt-14 pb-5">
      <h1 className="text-2xl font-bold">Recent orders</h1>
      <Table className="mt-4 border-2 border-slate-300">
        <TableHeader>
          <TableRow className="border-b-2 border-slate-300">
            <TableHead className="text-[17px] text-slate-700">
              Order ID
            </TableHead>
            <TableHead className="text-[17px] text-slate-700">
              Customer Name
            </TableHead>
            <TableHead className="text-[17px] text-slate-700">
              Creation Date
            </TableHead>
            <TableHead className="text-[17px] text-slate-700">Time</TableHead>
            <TableHead className="text-[17px] text-slate-700 flex justify-end items-center gap-2">
              Price <TbCoinTaka className="text-2xl" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders?.map((order: T_orderResponse) => (
            <TableRow
              key={order.id}
              className="border-b-2 border-slate-300 font-medium"
            >
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer?.name}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleTimeString()}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {order.subtotal_amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentOrders;
