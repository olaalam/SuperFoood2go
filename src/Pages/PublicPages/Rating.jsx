import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import React Icons
import { useNavigate } from 'react-router-dom';
import start from '../../assets/Images/Star'
import Star from '../../assets/Images/Star';
const CustomerReviewsSlider = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();
  const reviews = [
    { name: "Ahmed Hassan", review: "Amazing service! I couldn't be happier with the results.", rating: 5 },
    { name: "Fatima Ali", review: "Fantastic experience! Highly recommend their services.", rating: 5 },
    { name: "Mohamed Saeed", review: "Top-notch service, they really care about their customers!", rating: 5 },
    { name: "Amina Youssef", review: "Wonderful experience. The team was very professional!", rating: 5 },
    { name: "Hassan Khalil", review: "Great product, would definitely buy again.", rating: 5 },
    { name: "Mona Ibrahim", review: "Very satisfied with my purchase. Highly recommend!", rating: 5 },
    { name: "Omar Reda", review: "Service was good but could improve on response time.", rating: 5 },
    { name: "Salma Nabil", review: "Excellent quality, and fast shipping!", rating: 5 },
    { name: "Khaled Mahmoud", review: "Overall a positive experience. Would recommend.", rating: 5 },
    { name: "Laila Tarek", review: "Great customer support and very helpful team.", rating: 5 }
  ];

  const handleNavigate =()=>{
    navigate('/signUp')

   }
  return (
    <section className="py-16 mt-10 bg-mainColor px-10">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-4 text-secoundColor">{t("What Our Customers Say About Us")}</h2>
      <p className="text-center text-lg text-gray-300 mb-8">{t("Don't take our word, hear from them.")}</p>

      {/* Scrollable Row */}
      <div className="flex overflow-x-auto items-start text-start pb-6 space-x-6 scrollbar-hide">
        {/* Loop through the reviews to create 10 cards */}
        {reviews.map((review, index) => (
          <div
            key={index}
            className="w-76 bg-secoundColor rounded-lg shadow-lg p-6 items-start  flex-shrink-0"
          >
            <h3 className="text-xl font-semibold text-start mb-4 text-mainColor">{t(`${review.name}`)}</h3>
            <p className="text-start text-gray-700 mb-4">{t(`${review.review}`)}</p>
            {/* Star Rating */}
            <div className="flex justify-start mb-4">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {index < review.rating ? (
                    <Star className="w-6 h-6 text-mainColor" />
                  ) : (
                    <FaRegStar className="w-6 h-6 text-mainColor" />
                  )}
                </span>
              ))}
            </div>
            {/* <button
            onClick={handleNavigate}
            className="bg-mainColor text-secoundColor py-2 px-4 rounded-full w-full text-center">{t("See More")}</button> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviewsSlider;
