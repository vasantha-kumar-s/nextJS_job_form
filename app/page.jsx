import Contactform from "@/components/JobApplication";
import Image from "next/image";

export default function Home() {
  return (
    <div className= "p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Application Form - VASANTH & CO</h1>
      <p>Fill the form below with accurate details</p>
      
      <Contactform />
    </div>
  );
}
