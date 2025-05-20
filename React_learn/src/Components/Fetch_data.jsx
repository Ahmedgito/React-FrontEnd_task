import axios from "axios";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

const AxiosLearn = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const getData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "https://picsum.photos/v2/list?page=2&limit=10"
      );
      setData(response.data);
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="font-sans p-4 sm:p-6 md:p-8 bg-black min-h-screen text-gray-300"
    >

      <h1 className="text-3xl sm:text-4xl text-center font-bold text-gray-100 mb-8">
        Ahmed - FrontEnd Task
      </h1>


      <div className="flex justify-center mb-10">
        <motion.button
          onClick={getData}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button />
        </motion.button>
      </div>


      {loading && (
        <div className="text-center text-lg text-gray-400 font-medium">
          Loading...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-600 font-semibold mb-4">
          {error}
        </div>
      )}

      {/* No Images Message */}
      {!loading && !error && data.length === 0 && (
        <div className="text-center text-gray-500 font-medium text-lg">
          Press <span className="text-white font-semibold">Generate</span> to Fetch Images
        </div>
      )}

      {/* Image Grid */}
      {!loading && !error && data.length > 0 && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((element, idx) => (
            <motion.div
              key={element.id || idx}
              className="bg-gray-900 rounded-xl shadow-lg p-4 text-center cursor-pointer hover:shadow-gray-600 transition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedImage(element)}
            >
              <img
                src={element.download_url}
                alt={element.author}
                className="w-full h-44 object-cover rounded-lg border border-gray-700"
              />
              <div className="mt-3 font-semibold">{element.author}</div>
            </motion.div>
          ))}
        </div>
      )}
      
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="max-w-3xl w-full relative p-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              style={{ boxShadow: "0 0 20px rgba(150, 150, 150, 0.7)" }}
            >
              <img
                src={selectedImage.download_url}
                alt={selectedImage.author}
                className="w-full max-h-[80vh] object-contain rounded-lg border border-gray-700"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 text-gray-300 text-2xl bg-gray-800 bg-opacity-80 rounded-full px-3 py-1 hover:bg-opacity-100 transition"
              >
                ✕
              </button>
              <div className="text-gray-300 text-center mt-2 font-semibold">
                {selectedImage.author}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AxiosLearn;
  