import Image from "next/image";

const Not_found = () => {
  return (
    <div className="max-w-7xl mx-auto pt-6">
      <h1 className="text-center text-4xl font-bold">Oops! Page Not Found</h1>
      <p className="text-center text-md mt-2 font-semibold text-slate-600">
        We can't seem in find the page you're looking
      </p>
      <div className="relative w-full h-96 mt-2">
        <Image
          src="/images/not_Found.png"
          alt="notFoundPage"
          fill
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Not_found;
