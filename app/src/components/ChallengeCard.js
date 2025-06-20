import StarRating from "./StarRating"

export default function ChallengeCard({
  _id,
  title,
  description,
  category,
  difficulty,
  tags = [],
  avgRating = 0,
  ratingCount = 0,
}) {
  const getDifficultyStyle = (diff) => {
    switch (diff) {
      case "easy":
        return "bg-green-100 text-green-700 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "hard":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 my-4 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          {description && <p className="text-gray-600 mb-3 leading-relaxed">{description}</p>}
        </div>
        <div className="flex flex-col items-end gap-2 ml-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyStyle(difficulty)}`}>
            {difficulty?.toUpperCase()}
          </span>
          {category && <span className="text-xs text-gray-500">📝 {category}</span>}
        </div>
      </div>

      {tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-sm text-gray-600 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              🏷️ {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <StarRating key={_id} challengeId={_id} avgRating={avgRating} ratingCount={ratingCount} />
          <span className="text-gray-500 text-sm">
            {avgRating > 0 ? `${avgRating.toFixed(1)} (${ratingCount})` : "No ratings yet"}
          </span>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-colors">

        </button>
      </div>
    </div>
  )
}
