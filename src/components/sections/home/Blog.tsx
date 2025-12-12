// components/sections/Blog.tsx
import Link from "next/link";
import { BlogPost } from "../../../types";
import Button from "@/components/ui/Button";

const Blog: React.FC = () => {
  const posts: BlogPost[] = [
    {
      title: "Connecting EduAssess with HubSpot & Badgr for cybersec training",
      date: "February 06, 2024 | 2 min read",
      icon: "fa-link",
      gradient: "from-primary to-secondary",
    },
    {
      title: "EduAssess introduces AI-generated quizzes, tests and exams",
      date: "March 16, 2023 | 2 min read",
      icon: "fa-robot",
      gradient: "from-accent to-yellow-500",
    },
    {
      title: "How to achieve effectiveness in remote recruitment?",
      date: "April 05, 2022 | 3 min read",
      icon: "fa-users",
      gradient: "from-green-500 to-green-600",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 px-4">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Secrets, strategies and success stories on our blog
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div
                className={`h-48 bg-gradient-to-r ${post.gradient} flex items-center justify-center`}
              >
                <i className={`fas ${post.icon} text-white text-4xl`}></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-gray-500 mb-4">{post.date}</p>
                <Link href="#">
                  <Button variant="link" className="px-0 h-auto font-medium ">
                    Read more
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="#">
            <Button variant="link" className="p-0 h-auto font-medium text-lg">
              See more articles <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
