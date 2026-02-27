import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RecentOrders = () => {
  return (
    <div className="mt-14">
      <h1 className="text-2xl font-bold">Recent orders</h1>
      <Table className="mt-4 border-2 border-slate-300">
        <TableHeader>
          <TableRow className="border-b-2 border-slate-300">
            <TableHead className="text-lg">Order ID</TableHead>
            <TableHead className="text-lg">Date</TableHead>
            <TableHead className="text-lg">Total</TableHead>
            <TableHead className="text-lg">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b-2 border-slate-300">
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentOrders;
