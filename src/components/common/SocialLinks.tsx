// components/common/SocialLinks.tsx
import Link from "next/link";

const SocialLinks: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <Link
        href="#"
        className="bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition"
      >
        <i className="fab fa-twitter text-primary"></i>
      </Link>
      <Link
        href="#"
        className="bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition"
      >
        <i className="fab fa-facebook-f text-primary"></i>
      </Link>
      <Link
        href="#"
        className="bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition"
      >
        <i className="fab fa-linkedin-in text-primary"></i>
      </Link>
    </div>
  );
};

export default SocialLinks;
