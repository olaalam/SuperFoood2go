
import { useLocation } from 'react-router-dom';

const TutorialDataPage = () => {
    const location = useLocation();
    const { tutorial } = location.state || {}; // Retrieve the tutorial data

    if (!tutorial) {
        return <p className="text-center text-lg text-gray-600 mt-10">No tutorial data available</p>;
    }

    return (
        <div className="flex flex-col items-center px-4">
            <div className="max-w-screen-xl w-full bg-white rounded-xl shadow-2xl p-4">
                <h1 className="text-4xl font-extrabold text-mainColor mb-10">
                    {tutorial.title}
                </h1>
                <div className="relative w-full mb-6 rounded-xl overflow-hidden bg-black">
                        <video className="w-full object-cover" controls>
                      <source src={tutorial.video_link} type="video/mp4" alt={tutorial.title}/>
                      Your browser does not support the video tag.
                    </video>
                </div>

                {/* Description Section */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md space-y-4">
                    <h2 className="text-xl font-semibold text-mainColor">Description</h2>
                    <p className="text-gray-800 text-lg leading-relaxed">{tutorial.description}</p>
                </div>
            </div>
        </div>
    );
};

export default TutorialDataPage;
