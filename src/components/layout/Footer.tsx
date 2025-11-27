// components/layout/Footer.tsx
import Link from "next/link";
import Logo from "../common/Logo";
import SocialLinks from "../common/SocialLinks";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-12 px-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Logo />
            </div>
            <p className="text-white">
              Modern digital assessment platform for schools, organizations, and
              training centers.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">PRODUCT</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/product/skills-assessment"
                  className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
                >
                  Skills Assessment
                </Link>
              </li>
              <li>
                <Link
                  href="/product/online-quiz-maker"
                  className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
                >
                  Online Quiz Maker
                </Link>
              </li>
              <li>
                <Link
                  href="/product/easy-test-maker"
                  className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
                >
                  Easy Test Maker
                </Link>
              </li>
              <li>
                <Link
                  href="/product/exam-software"
                  className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
                >
                  Exam Software
                </Link>
              </li>
              <li>
                <Link
                  href="/product/ai-question-creation"
                  className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
                >
                  AI-Powered Question Creation
                </Link>
              </li>
              <li>
                <Link
                  href="/product/insights-analytics"
                  className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
                >
                  Insights & Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/product/compare"
                  className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
                >
                  Compare
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">FOR BUSINESS</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/business/human-resources"
                  className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
                >
                  Human Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/business/training-companies"
                  className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
                >
                  Training Companies & Staff
                </Link>
              </li>
              <li>
                <Link
                  href="/business/certification"
                  className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
                >
                  Certification
                </Link>
              </li>
              <li>
                <Link
                  href="/business/sales-customer-service"
                  className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
                >
                  Sales & Customer Service
                </Link>
              </li>
              <li>
                <Link
                  href="/business/language-schools"
                  className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
                >
                  Language Schools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">FOR EDUCATION</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/education/teachers"
                  className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
                >
                  Teachers
                </Link>
              </li>
              <li>
                <Link
                  href="/education/schools"
                  className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
                >
                  Schools
                </Link>
              </li>
              <li>
                <Link
                  href="/education/universities"
                  className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
                >
                  Universities & Colleges
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">CONNECT</h4>
            <SocialLinks />
            <p className="text-white mt-4">contact@eduassess.com</p>
          </div>
        </div>

        <div className="border-t border-white mt-8 pt-8 text-center text-white">
          <p>
            Copyright © EduAssess 2025 |{" "}
            <Link
              href="#"
              className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
            >
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link
              href="#"
              className="hover:text-white hover:border-solid hover:border-b-white hover:border-b text-white"
            >
              Terms and Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
