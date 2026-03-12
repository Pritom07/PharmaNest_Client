"use client";

import { Button } from "@/components/ui/button";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@/LocalstorageManagement/Localstorage";
import { T_medicineData } from "@/types/medicineDataTypes";
import { T_medicineLocalStorage } from "@/types/medicineLocalStorageType";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const CartItemDisplay = () => {
  const [medicines, setMedicines] = useState<T_medicineData[] | []>([]);
  const [medicinePrices, setMedicinePrices] = useState<
    T_medicineLocalStorage[] | []
  >([]);

  useEffect(() => {
    const getMedicinesFromLocalStorage = () => {
      const medicineData = getLocalStorageItem();
      setMedicines(medicineData);

      const medicinePriceArray = medicineData.map(
        (medicine: T_medicineLocalStorage) => {
          return {
            id: medicine.id,
            name: medicine.name,
            price: medicine.price,
            quantity: medicine.quantity,
          };
        },
      );
      setMedicinePrices(medicinePriceArray);
    };

    getMedicinesFromLocalStorage();

    window.addEventListener("cartUpdated", getMedicinesFromLocalStorage);

    return () => {
      window.removeEventListener("cartUpdated", getMedicinesFromLocalStorage);
    };
  }, []);

  const handleMedicineRemove = (id: string) => {
    removeLocalStorageItem(id);
  };

  return (
    <div>
      {medicines.length === 0 ? (
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            No Item In Your Cart Yet
          </h1>
          <h1 className="text-center text-slate-600 font-semibold mt-1">
            Hurry Up ! to grab your own medicines.
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
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center lg:text-left">
            Your Shopping Cart ({medicines.length} items)
          </h1>

          <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 mt-8 max-w-6xl mx-auto justify-center">
            <div className="flex-1">
              {medicines.map((medicine: T_medicineData) => (
                <div
                  key={medicine.id}
                  className="bg-white rounded-xl flex flex-col sm:flex-row justify-between items-center p-4 sm:p-5 w-full mb-4 gap-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 lg:gap-6">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                      <Image
                        src={medicine.img_url}
                        alt={medicine.name}
                        fill
                        priority
                        className="object-center"
                      />
                    </div>

                    <div className="text-center sm:text-left">
                      <h1 className="text-lg sm:text-xl font-bold">
                        {medicine.name}
                      </h1>

                      <h1 className="text-sm sm:text-[16px] text-slate-600 font-semibold">
                        By {medicine.manufacturer}
                      </h1>

                      <h1 className="mt-2 font-semibold text-sm sm:text-base">
                        Price : {medicine.price} TK. (Per piece)
                      </h1>

                      <h1 className="font-semibold text-sm sm:text-base">
                        Quantity : {medicine.quantity}
                      </h1>

                      <h1 className="font-semibold text-sm sm:text-base">
                        Total :{" "}
                        {Number(medicine.quantity) * Number(medicine.price)} TK.
                      </h1>
                    </div>
                  </div>

                  <div>
                    <Button
                      onClick={() =>
                        handleMedicineRemove(medicine.id as string)
                      }
                      className="cursor-pointer bg-slate-100 hover:bg-slate-100"
                    >
                      <AiFillDelete className="text-2xl sm:text-3xl text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-96">
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
                <h1 className="text-xl sm:text-2xl text-center font-bold border-b-2 border-slate-300 pb-4">
                  Order Summery
                </h1>

                <div className="mt-6 px-1">
                  {medicinePrices.map(
                    (medicinePriceObj: T_medicineLocalStorage) => (
                      <div
                        key={medicinePriceObj.id}
                        className="grid grid-cols-3 gap-2 sm:gap-3.5 mb-4 text-sm sm:text-base"
                      >
                        <h1 className="font-semibold truncate">
                          {medicinePriceObj.name}
                        </h1>

                        <h1 className="font-semibold text-center">
                          {medicinePriceObj.price} x {medicinePriceObj.quantity}
                        </h1>

                        <h1 className="font-semibold text-right">
                          {Number(medicinePriceObj.price) *
                            Number(medicinePriceObj.quantity)}{" "}
                          TK.
                        </h1>
                      </div>
                    ),
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 border-t-2 border-slate-300 mt-6 pt-4 px-1">
                  <h1 className="font-semibold text-base sm:text-[18px]">
                    Total
                  </h1>
                  <span></span>
                  <h1 className="font-semibold text-base sm:text-[18px] text-right">
                    {medicinePrices
                      .map(
                        (medicinePriceObj: T_medicineLocalStorage) =>
                          medicinePriceObj.price * medicinePriceObj.quantity,
                      )
                      .reduce(
                        (acc, currentValue) => acc + currentValue,
                        0,
                      )}{" "}
                    TK.
                  </h1>
                </div>

                <Link href="/customer/checkout">
                  <Button className="bg-[#008080] hover:bg-[#008080] cursor-pointer w-full mt-8">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItemDisplay;
