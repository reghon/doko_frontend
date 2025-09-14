"use client";
import {useState} from "react";
import {ChevronDown} from "lucide-react";

const faqs = [
    {
        question: "What is DoKo?",
        answer: "DoKo is a personal task management app that helps you organize and track your tasks efficiently. With DoKo, you can manage your daily activities, set priorities, and stay productive."
    },
    {
        question: "How do i create a task?",
        answer: "Simply click the 'Add Task' button, fill in the task details including title, description, due date, and priority level. Then save your task and it will appear in your task list."
    },
    {
        question: "Can i Organize task by project or categories?",
        answer: "Yes, DoKo allows you to group tasks by project or categories for better organization. You can create custom categories and assign colors to help you quickly identify different types of tasks."
    },
    {
        question: "Does DoKo send reminders?",
        answer: "Yes, you can set reminders so you never miss an important deadline. DoKo will send you notifications before your task due dates to keep you on track."
    }, {
        question: "What is Focus Mode?",
        answer: "Focus Mode helps you concentrate by showing only your current task and hiding distractions. This feature creates a clean, minimal interface that allows you to focus on what matters most."
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="relative min-h-screen bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto space-y-12 relative z-10">

                {/* Row 1 - Title */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#7B6EF2]">
                        FAQ
                    </h2>
                </div>

                {/* Row 2 - Box & Questions */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Left side - Purple Box */}
                    <div className="flex justify-center">
                        <div className="h-auto max-h-[400px] w-auto">
                            <img src="/FAQ_faq-image.svg" alt="Phone preview" className="w-full max-w-sm h-auto object-contain"/>
                        </div>
                    </div>

                    {/* Right side - FAQ List */}
                    <div className="space-y-2">
                        {
                        faqs.map((faq, index) => (
                            <div key={index}
                                className="overflow-hidden transition-all duration-300">
                                <button onClick={
                                        () => toggleFAQ(index)
                                    }
                                    className="w-full px-6 py-5 text-left flex justify-between items-center transition-colors duration-200 focus:outline-none">
                                    <span className="text-lg font-semibold text-gray-800 pr-4">
                                        {
                                        faq.question
                                    } </span>
                                    <ChevronDown className={
                                        `w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                                            openIndex === index ? 'transform rotate-180' : ''
                                        }`
                                    }/>
                                </button>

                                <div className={
                                    `overflow-hidden transition-all duration-400 ease-in-out ${
                                        openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`
                                }>
                                    <div className="px-6 pb-5">
                                        <div className="border-t border-gray-100 pt-4">
                                            <p className="text-gray-600 leading-relaxed">
                                                {
                                                faq.answer
                                            } </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }</div>

                </div>
            </div>
            
            {/* Gradient positioned at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-100 bg-gradient-to-b from-transparent to-[#7B6EF24D] pointer-events-none"></div>

        </section>
    );
}