import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="w-full bg-black text-white py-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left text */}
        <p className="text-xs text-gray-100">
          Project of <span className="text-yellow-500">RADIANTS.</span>
        </p>

        {/* Right text */}
        <p className="text-xs text-white/50">
          University of Moratuwa, Sri Lanka
        </p>
      </div>
    </footer>
  );
};

export default Footer;
