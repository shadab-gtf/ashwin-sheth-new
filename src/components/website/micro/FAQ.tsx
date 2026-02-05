'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    { question: 'Where is Sheth Edmont located?', answer: 'Sheth Edmont is located in the prime area of Kandivali West, with easy access to major transport hubs.' },
    { question: 'What configurations are available at Sheth Edmont?', answer: 'We offer luxurious 2 BHK and 3 BHK apartments with varying carpet areas to suit your needs.' },
    { question: 'How tall are the towers in Sheth Edmont?', answer: 'The project features three iconic towers rising 51 floors high.' },
    { question: 'What kind of views do the residences offer?', answer: 'Residences offer panoramic views of Manori Creek and the lush green surroundings.' },
    { question: 'What is the total land area of the project?', answer: 'The project is spread across an expansive 2.02 acres.' },
    { question: 'What lifestyle features does Sheth Edmont offer?', answer: 'Amenities include a swimming pool, clubhouse, multipurpose hall, and more.' },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <h2  data-direction="bottom" className="reveal-text  text-[32px] leading-[50px]  font-medium text-[#E37D24] mb-16">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx}  data-direction="bottom" className="reveal-text bg-[#FFFBF7] rounded-lg text-left overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 hover:bg-[#FDF6ED] transition-colors"
                            >
                                <span className="text-gray-800 font-medium text-sm md:text-base">{faq.question}</span>
                                {openIndex === idx ? <Minus className="w-5 h-5 text-[#1B4485]" /> : <Plus className="w-5 h-5 text-[#1B4485]" />}
                            </button>
                            <div
                                className={`px-6 pt-3 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
