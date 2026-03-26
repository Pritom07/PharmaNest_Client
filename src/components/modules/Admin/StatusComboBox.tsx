"use client";

import { updateUserStatus } from "@/actions/user.action";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { userStatus } from "@/types/userType";
import Swal from "sweetalert2";

const STATUS = ["ACTIVE", "BANNED"];

const StatusComboBox = ({ id }: { id: string }) => {
  const handleStatusUpdation = async (item: userStatus) => {
    const payLoad = { status: item };
    const data = await updateUserStatus(id, payLoad);

    if (data.success === true) {
      return Swal.fire({
        title: "Status Updated!",
        text: "Click ok button to proceed",
        icon: "success",
        confirmButtonColor: "#008080",
      });
    }

    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Status Updation Faild Or User Not Found!",
      confirmButtonColor: "#008080",
    });
  };
  return (
    <Combobox
      onInputValueChange={(item) => handleStatusUpdation(item as userStatus)}
      items={STATUS}
    >
      <ComboboxInput placeholder="Update Status" />
      <ComboboxContent>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default StatusComboBox;
