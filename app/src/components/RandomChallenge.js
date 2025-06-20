"use client"

import { useState } from "react"
import ChallengeCard from "./ChallengeCard"

export default function RandomChallenge() {
  const [challenge, setChallenge] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchChallenge = async () => {
    setLoading(true)
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL
      const res = await fetch(`${baseUrl}/challenge/random`)
      const data = await res.json()
      setChallenge(data)
    } catch (error) {
      console.error("Failed to fetch challenge:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="my-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🎲 Ready for a Challenge?</h2>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={fetchChallenge}
          disabled={loading}
        >
          {loading ? "🎲 Generating..." : "🎲 Generate Challenge"}
        </button>
      </div>

      {challenge && (
        <div className="animate-slideIn">
          <ChallengeCard {...challenge} />
        </div>
      )}
    </section>
  )
}
