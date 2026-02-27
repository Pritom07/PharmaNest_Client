import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Home_Accordion() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="shipping"
      className="max-w-7xl mx-auto mt-7"
    >
      <h1 className="text-2xl font-bold">Frequently Asked Questions :</h1>
      <AccordionItem
        value="shipping"
        className="border-b-2 border-slate-300 mt-1"
      >
        <AccordionTrigger className="text-xl font-semibold">
          Can I trust the quality of medicines listed on PharmaNest?
        </AccordionTrigger>
        <AccordionContent className="text-[16px] text-justify">
          Absolutely. Only verified users with a Seller role have the authority
          to add and update medicine listings. Additionally, we encourage our
          Customers to use the <span className="font-semibold">Review</span>{" "}
          feature after every purchase. This transparent feedback system helps
          the community identify the most reliable sellers and high-quality
          products.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="returns" className="border-b-2 border-slate-300">
        <AccordionTrigger className="text-xl font-semibold">
          I am a Seller; how do I manage my inventory?
        </AccordionTrigger>
        <AccordionContent className="text-[16px] text-justify">
          Managing your stock is easy through your dedicated Seller Dashboard
          named <span className="font-semibold">Manage Medicines</span>. You
          have the tools to add new medicines, update existing prices or
          descriptions, and mark orders as `Delivered` once they reach the
          customer. This ensures your profile stays up-to-date and your
          customers are kept informed.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="support" className="border-b-2 border-slate-300">
        <AccordionTrigger className="text-xl font-semibold">
          How does Cash on Delivery (COD) work on PharmaNest?
        </AccordionTrigger>
        <AccordionContent className="text-[16px] text-justify">
          To make healthcare accessible, we offer{" "}
          <span className="font-semibold">Cash on Delivery</span> for all
          medicine orders. Simply browse the medicine details, add your items to
          the cart, and then checkout. You only pay the Seller when the medicine
          is physically delivered to your doorstep. Please ensure you have the
          exact amount ready to help our sellers provide a quick and seamless
          delivery experience.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
