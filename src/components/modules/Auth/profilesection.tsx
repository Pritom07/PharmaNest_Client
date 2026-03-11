"use client";

import { Button } from "@/components/ui/button";
import { T_user } from "@/types/userType";
import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import EditProfileSection from "./EditProfileSection";
import { useState } from "react";

const Profilesection = ({ currentUser }: { currentUser: T_user }) => {
  const [user, setUser] = useState(currentUser);

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-center border-b-2 border-slate-300 pb-8 gap-5">
        <h1 className="text-3xl lg:text-4xl font-bold ext-slate-800">
          User Information
        </h1>

        <EditProfileSection currentUser={user} setUser={setUser} />
      </div>

      <div className="mt-6">
        <h1 className="text-2xl font-bold">Personal Details</h1>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-44 mt-5">
          <div className="flex items-center gap-6">
            {user?.image ? (
              <div className="relative w-32 h-32">
                <Image
                  src={user?.image}
                  alt={user?.name}
                  fill
                  priority
                  className="object-cover rounded-full"
                />
              </div>
            ) : (
              <FaCircleUser className="w-full h-28" />
            )}
            <div>
              <h1 className="font-semibold text-[18px]">Name :</h1>
              <h1 className="font-semibold text-[18px] mt-2">{user?.name}</h1>
              <h1 className="font-semibold text-slate-700">{user?.email}</h1>
              <Button className="mt-4 text-[#008080] hover:text-[#008080] bg-blue-200 hover:bg-blue-200">
                <GoDotFill />
                <span className="font-bold">{currentUser?.role}</span>
              </Button>
            </div>
          </div>
          <div className="">
            <h1 className="text-[18px] font-semibold">Phone Number :</h1>
            <h1 className="text-[16px] font-semibold">
              {user?.phoneNumber ?? "Not Added Yet"}
            </h1>
            <h1 className="text-[18px] font-semibold mt-4">Address :</h1>
            <h1 className="text-[16px] font-semibold">
              {user?.address ?? "Not Added Yet"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilesection;
