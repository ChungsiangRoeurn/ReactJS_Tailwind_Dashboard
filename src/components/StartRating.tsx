import { FaStar, FaRegStar } from "react-icons/fa";

function StarRating({ rating }: { rating: number }) {
  const roundedRating = Math.round(rating);

  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {[...Array(5)].map((_, index) =>
        index < roundedRating ? (
          <FaStar key={index} />
        ) : (
          <FaRegStar key={index} className="text-gray-300" />
        ),
      )}
    </div>
  );
}

export default StarRating;
