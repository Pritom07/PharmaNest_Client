// "use client";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { T_orderResponseForAdmin } from "@/types/orderResponseForAdminType";

// const OrdersHandle = ({ orders }: { orders: T_orderResponseForAdmin[] }) => {
//   return (
//     <div>
//       <div>
//         <h1 className="text-center text-3xl font-bold">Orders Progress</h1>
//       </div>

//       <div className="mt-4">
//         <Table className="bg-white rounded-xl">
//           <TableHeader>
//             <TableRow className="text-[16px]">
//               <TableHead>Order ID</TableHead>
//               <TableHead>Customer Name</TableHead>
//               <TableHead>Total</TableHead>
//               <TableHead>Placed</TableHead>
//               <TableHead>Trnx ID</TableHead>
//               <TableHead>Delivery Charge Taker</TableHead>
//               <TableHead>Items</TableHead>
//               <TableHead>Pending</TableHead>
//               <TableHead>Shipped</TableHead>
//               <TableHead>Delivered</TableHead>
//               <TableHead>Paid</TableHead>
//               <TableHead>Cancel</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {orders?.map((order: T_orderResponseForAdmin) => (
//               <TableRow key={order.id} className="font-semibold">
//                 <TableCell>{order?.id}</TableCell>
//                 <TableCell>{order?.customer.name}</TableCell>
//                 <TableCell>{order?.subtotal_amount}</TableCell>
//                 <TableCell>
//                   {new Date(order.createdAt).toLocaleDateString("en-GB", {
//                     day: "numeric",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </TableCell>
//                 <TableCell>{order?.trnxID}</TableCell>
//                 <TableCell>{order?.deliveryChargeTaker}</TableCell>
//                 <TableCell>{order?.count}</TableCell>
//                 <TableCell>{order?.pending}%</TableCell>
//                 <TableCell>{order?.shipped}%</TableCell>
//                 <TableCell>{order?.delivered}%</TableCell>
//                 <TableCell>{order?.paid}%</TableCell>
//                 <TableCell>{order?.cancelled}%</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default OrdersHandle;
