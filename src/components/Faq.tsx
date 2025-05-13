"use client"
import React, { useState } from "react";
import { Container } from "@/components/Container";

interface FaqProps {
  data: {
    id: number;
    __component: string;
    questions: Array<{
      id: number;
      question: string;
      answer: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    }>;
  };
  locale: string;
}

export function Faq({ data }: FaqProps) {
  if (!data) return null;
  const questions = data.questions;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <Container className="!p-0">
      <div className="w-full max-w-3xl mx-auto my-8">
        {questions.map((item, index) => {
          const isOpen = openIndex === index;
          
          return (
            <div 
              key={item.id} 
              className="mb-4"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className={`flex items-center justify-between w-full py-4 px-4 text-left rounded-lg focus:outline-none transition-all duration-300 ease-in-out
                ${isOpen ? 
                  'bg-gray-100 dark:bg-gray-800 shadow-md border-l-4 border-[#FB4D46] dark:border-[#FB4D46]' : 
                  'hover:bg-gray-50 dark:hover:bg-gray-900 border-l-4 border-transparent'
                }`}
                aria-expanded={isOpen}
              >
                <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {item.question}
                </span>
                <div className="flex items-center justify-center w-6 h-6 transition-transform duration-300">
                  <span className={`text-xl font-medium transition-transform duration-300 ${isOpen ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-4 pt-2 pb-4 text-gray-600 dark:text-gray-300 bg-white dark:bg-trueGray-900 rounded-b-lg">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

