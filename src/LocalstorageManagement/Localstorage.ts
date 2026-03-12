import { T_medicineData } from "@/types/medicineDataTypes";

const getLocalStorageItem = () => {
  const medicines = localStorage.getItem("medicines");
  if (medicines) {
    const parsified = JSON.parse(medicines);
    return parsified;
  }
  return [];
};

const setLocalStorageItem = (medicineArray: T_medicineData[]) => {
  const stringified = JSON.stringify(medicineArray);
  localStorage.setItem("medicines", stringified);
};

const addLocalStorageItem = (medicineObj: T_medicineData) => {
  const medicines = getLocalStorageItem();
  const isExist = medicines.find(
    (medicine: T_medicineData) => medicine.id === medicineObj.id,
  );
  if (isExist) {
    removeLocalStorageItem(medicineObj.id as string);
    const medicines = getLocalStorageItem();
    medicines.push(medicineObj);
    setLocalStorageItem(medicines);
  } else {
    medicines.push(medicineObj);
    setLocalStorageItem(medicines);
  }
  window.dispatchEvent(new Event("cartUpdated")); //for Navbar.tsx cart count updation
};

const removeLocalStorageItem = (id: string) => {
  const medicines = getLocalStorageItem();
  const medicineArray = medicines.filter(
    (medicine: T_medicineData) => medicine.id !== id,
  );
  setLocalStorageItem(medicineArray);
  window.dispatchEvent(new Event("cartUpdated")); //for CartItemDisplay.tsx cart display updation
};

export { getLocalStorageItem, addLocalStorageItem, removeLocalStorageItem };
