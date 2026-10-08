import { useState } from 'react';
import { useTranslation } from 'react-i18next';


const LearnMoreSection = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const {t} = useTranslation();

  const toggleAnswer = (index) => {
    // Toggle the selected question: if it's already selected, collapse it
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  const questionsAndAnswers = [
    {
      question: "How do I create an online store?",
      answer: "To create your online store, start by choosing a platform, designing your website, adding products, setting up payment methods, and launching your store.",
    },
    {
      question: "How long does it take to set up my online store?",
      answer: "The setup time varies depending on your product range and customization. Typically, it takes anywhere from a few days to a couple of weeks to fully set up.",
    },
    {
      question: "How much does it cost to run an online store on Wegostores?",
      answer: "The cost depends on the plan you choose. We offer different pricing tiers based on your business needs, from basic to advanced plans with additional features.",
    },
    {
      question: "What products should I sell on my online store?",
      answer: "Focus on products you're passionate about and that have demand in the market. Consider niche products that cater to specific customer needs or problems.",
    },
    {
      question: "Will my online store be optimized for mobile customers?",
      answer: "Yes, all our templates are mobile-friendly, and your store will be automatically optimized for mobile customers without additional effort on your part.",
    },
  ];

  return (
    <section className="py-16 px-4 text-mainColor bg-secoundColor">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-2 ">{t("Learn more about starting an online store")}</h2>
      <p className="text-center text-lg text-gray-600 mb-8 ">
       {t("Need help creating your online store? We're ready to assist you. We'll answer your common questions in detail.")}
      </p>

      {/* Rows */}
      <div className="w-full space-y-6 p-7">
        {questionsAndAnswers.map((item, index) => (
          <div
            key={index}
            className="rounded-lg shadow-lg p-6  border-b border-mainColor transition-transform duration-200 "
          >
            {/* Question and Icon */}
            <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => toggleAnswer(index)}>
              {/* Text on Left */}
              <div className="flex items-center space-x-4 w-10/12">
                <p className="text-xl font-semibold text-mainColor">{t(`${item.question}`)}</p>
              </div>
              {/* Icon on Right with hover effect */}
              <div className="flex items-center space-x-4 w-2/12 justify-end">
                <span className="text-mainColor text-2xl transition-colors duration-300 hover:text-blue-200">+</span>
              </div>
            </div>

            {/* Answer text */}
            {selectedQuestion === index && (
              <p className="text-mainColor mt-4 text-xl">{t(`${item.answer}`)}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearnMoreSection;
