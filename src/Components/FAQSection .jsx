import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const FAQSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const faqs = [
    {
      question: 'How do I book a vehicle?',
      answer:
        "You can easily book a vehicle by clicking the 'Book Now' button on the vehicle details page. Make sure you're logged in before booking.",
    },
    {
      question: 'Is there any refund policy?',
      answer:
        'Yes! If you cancel your booking 24 hours before the rental date, you’ll receive a full refund.',
    },
    {
      question: 'Do you provide drivers with the vehicles?',
      answer:
        'We provide both self-driving and chauffeur options depending on the vehicle type and location.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'You can reach our 24/7 customer support team via email or live chat available on our website.',
    },
  ];

  return (
    <section
      className="py-20 mt-10 lg:mt-25"
      id="faq"
    >
      <div className="max-w-4xl mx-auto px-4" data-aos="fade-up">
        <h2 className="text-4xl font-extrabold text-center text-red-600 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="join join-vertical w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow join-item border border-base-300  shadow-md hover:shadow-lg transition-all"
              data-aos="zoom-in"
            >
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={index === 0}
              />
              <div className="collapse-title text-lg font-semibold ">
                {faq.question}
              </div>
              <div className="collapse-content text-gray-600 leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
