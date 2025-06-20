import Header from "./components/Header"
import RandomChallenge from "./components/RandomChallenge"
import TopChallenges from "./components/TopChallenges"
import "./App.css"

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto px-4 pb-8">
        <RandomChallenge />
        <TopChallenges />
      </main>
      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>Built with ❤️ for developers who love challenges</p>
      </footer>
    </div>
  )
}

export default App
