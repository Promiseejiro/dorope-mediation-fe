// components/sections/CreateTest.tsx
"use client";

import { useState } from "react";
import Radio from "../../ui/Radio";
import Button from "../../ui/Button";

const CreateTest: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Create your first online test, quiz or exam
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore all of EduAssess assessment software features and streamline
            your online assessments. It's on the house. You're welcome.
          </p>

          <div className="flex items-center justify-center">
            <Button variant="primary" size="lg" className="mb-12">
              Sign up free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateTest;
