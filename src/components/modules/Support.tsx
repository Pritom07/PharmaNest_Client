import { RiSecurePaymentLine } from "react-icons/ri";
import { SiCashapp } from "react-icons/si";
import { ImHeadphones } from "react-icons/im";

const Support = () => {
  return (
    <div className="max-w-7xl mx-auto mt-12 border-t-4 border-t-[#008080] pb-6 px-3.5">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mt-5">
        <div className="flex items-center gap-3">
          <RiSecurePaymentLine className="text-3xl text-[#008080]" />
          <h1 className="text-xl font-bold">Genuine Medicines</h1>
        </div>

        <div className="flex items-center gap-3">
          <SiCashapp className="text-3xl text-[#008080]" />
          <h1 className="text-xl font-bold">Cash On Delivery</h1>
        </div>

        <div className="flex items-center gap-3">
          <ImHeadphones className="text-3xl text-[#008080]" />
          <h1 className="text-xl font-bold">24/7 Support</h1>
        </div>
      </div>
    </div>
  );
};

export default Support;
