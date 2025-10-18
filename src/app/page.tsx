'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-br from-gray-900 to-blue-950">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-100">
          Welcome to Your Payment Manager
        </h1>
        <p className="text-gray-400 mb-10 text-lg">
          Easily manage, track, and record all your cheque and cash transactions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => router.push('/cheques')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Manage Cheques
          </button>
          
          <button
            onClick={() => router.push('/cash')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Manage Cash
          </button>
        </div>
      </div>
    </main>
  )
}
