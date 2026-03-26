"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { T_user } from "@/types/userType";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import StatusComboBox from "./StatusComboBox";
import { role } from "@/constants/role";

const UserHandle = ({ users }: { users: T_user[] }) => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">User's Information</h1>
      <div className="mt-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <></>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: T_user) => (
              <TableRow key={user?.id}>
                <TableCell>
                  <div className="flex items-center gap-3 font-semibold">
                    {user?.image ? (
                      <div className="relative w-16 h-16">
                        <Image
                          src=""
                          alt=""
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <FaUserCircle className="text-3xl" />
                    )}

                    <h1 className="text-[16px]">{user?.name}</h1>
                  </div>
                </TableCell>

                <TableCell className="font-semibold">{user?.email}</TableCell>

                <TableCell className="font-semibold">
                  {new Date(user?.createdAt as any).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </TableCell>

                <TableCell>
                  <span
                    className={` rounded-xl px-3 py-1.5 text-white font-semibold ${user?.role === role.CUSTOMER && "bg-cyan-600"} ${user?.role === role.SELLER && "bg-purple-600"}`}
                  >
                    {user?.role}
                  </span>
                </TableCell>

                <TableCell>
                  <span
                    className={` px-3 py-1.5 rounded-xl text-white font-semibold ${user?.status === "ACTIVE" && "bg-green-600"} ${user?.status === "BANNED" && "bg-red-600"}`}
                  >
                    {user?.status}
                  </span>
                </TableCell>

                <TableCell className="flex justify-end">
                  <StatusComboBox id={user?.id as string} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserHandle;
