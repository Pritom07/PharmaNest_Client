import { FaFileMedicalAlt } from "react-icons/fa";
import { FaTruckMedical } from "react-icons/fa6";
import { GiMedicalThermometer, GiMedicines } from "react-icons/gi";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Features = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <Card className="bg-white shadow-md hover:shadow-xl">
          <CardHeader className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow">
              <FaFileMedicalAlt size={45} />
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <h2 className="text-xl font-semibold">Wide Medicine Selection</h2>
            <p className="text-sm text-gray-600 mt-2">
              Browse and choose from a wide range of trusted medicines.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md hover:shadow-xl">
          <CardHeader className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow">
              <FaTruckMedical size={45} />
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <h2 className="text-xl font-semibold">Fast Delivery</h2>
            <p className="text-sm text-gray-600 mt-2">
              Get medicines delivered to your doorstep safely and fast.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-3xl shadow-md hover:shadow-xl">
          <CardHeader className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow">
              <GiMedicalThermometer size={45} />
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <h2 className="text-xl font-semibold">Healthcare Products</h2>
            <p className="text-sm text-gray-600 mt-2">
              Wide range of healthcare devices and wellness products.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-3xl shadow-md hover:shadow-xl">
          <CardHeader className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow">
              <GiMedicines size={45} />
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <h2 className="text-xl font-semibold">Quality Medicines</h2>
            <p className="text-sm text-gray-600 mt-2">
              Authentic medicines from trusted manufacturers.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Features;
