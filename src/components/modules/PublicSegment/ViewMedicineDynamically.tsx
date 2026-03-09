"use client";

import { Button } from "@/components/ui/button";
import { role } from "@/constants/role";
import { authClient } from "@/lib/auth-client";
import { addLocalStorageItem } from "@/LocalstorageManagement/Localstorage";
import { T_medicineData } from "@/types/medicineDataTypes";
import { T_user, USER_ROLE } from "@/types/userType";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ViewMedicineDynamically = ({
  medicineData,
}: {
  medicineData: T_medicineData;
}) => {
  const {
    id,
    name,
    price,
    stock,
    manufacturer,
    img_url,
    medicine_Category,
    description,
    category_id,
    user_id,
  } = medicineData;

  const [quantity, setQuantity] = useState(1);
  const { data } = authClient.useSession();
  const [userRole, setUserRole] = useState<USER_ROLE | null>(null);

  useEffect(() => {
    let role: USER_ROLE | undefined = (data?.user as T_user)?.role;
    setUserRole(role as USER_ROLE);
  }, [data]);

  const handleIncrement = () => {
    let increase = quantity + 1;
    if (increase <= stock) {
      return setQuantity(increase);
    }
    toast.warn("You can't order medicine more than stock level !");
    setQuantity(quantity);
    return;
  };

  const handleDecrement = () => {
    let decrease = quantity - 1;
    if (decrease > 0) {
      return setQuantity(decrease);
    }
    setQuantity(1);
    toast.warn("You can't order medicine below 1 !");
    return;
  };

  const handleCartItem = () => {
    addLocalStorageItem({
      id,
      name,
      price,
      stock,
      manufacturer,
      user_id,
      img_url,
      category_id,
      quantity,
    });
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
        <div className="relative w-full lg:w-104 h-80 px-3">
          <Image
            src={img_url}
            alt={name}
            fill
            priority
            className="object-center"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <h1 className="text-[#008080] text-xl font-semibold mt-1">
            by {manufacturer}
          </h1>
          <h1 className="text-[#008080] text-3xl font-bold mt-6">
            TK. {price}
          </h1>
          <Button className="mt-2.5 bg-[#008080] rounded-full text-white font-semibold hover:bg-[#008080]">
            {medicine_Category?.name}
          </Button>
          <div className="flex items-center gap-10 mt-3">
            <h1 className="font-bold text-[18px]">Stock : {stock}</h1>
            <div>
              {stock < 10 ? (
                stock === 0 ? (
                  <Button className="bg-red-600 hover:bg-red-600 rounded-full font-semibold">
                    Out Of Stock
                  </Button>
                ) : (
                  <Button className="bg-amber-600 hover:bg-amber-600 rounded-full font-semibold">
                    Low Stock
                  </Button>
                )
              ) : (
                <Button className="bg-green-600 hover:bg-green-600 rounded-full font-semibold">
                  In Stock
                </Button>
              )}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Button
              onClick={handleIncrement}
              className="bg-[#008080] hover:bg-[#008080] cursor-pointer font-semibold"
            >
              Increase
            </Button>
            <h1 className="text-2xl font-bold">{quantity}</h1>
            <Button
              onClick={handleDecrement}
              className="bg-[#008080] hover:bg-[#008080] cursor-pointer font-semibold"
            >
              Decrease
            </Button>
          </div>
          <Button
            className="bg-[#008080] hover:bg-[#008080] cursor-pointer mt-5 font-semibold"
            disabled={userRole === role.ADMIN || userRole === role.SELLER}
            onClick={handleCartItem}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-12 pb-6 lg:pb-0">
        <h1 className="font-bold text-2xl">Description :</h1>
        <h1 className="text-justify text-slate-800 font-semibold mt-3">
          {description ?? "No Description Available Yet !"}
        </h1>
      </div>
    </div>
  );
};

export default ViewMedicineDynamically;
