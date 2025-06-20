"use client"

import { useEffect, useState } from "react"
import ChallengeCard from "./ChallengeCard"

export default function TopChallenges() {
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopChallenges = async () => {
      try {
        const res = await fetch("http://localhost:4000/challenge/top")
        const data = await res.json()
        setChallenges(data)
      } catch (error) {
        console.error("Failed to fetch top challenges:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopChallenges()
  }, [])

  if (loading) {
    return (
      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">🏆 Top Rated Challenges</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white shadow-md rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="my-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">🏆 Top Rated Challenges</h2>
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge._id} {...challenge} />
        ))}
      </div>
    </section>
  )
}
