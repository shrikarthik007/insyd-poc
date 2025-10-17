'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-100">
          Welcome to Your Cheque Manager
        </h1>
        <p className="text-gray-400 mb-10">
          Easily manage, track, and record business payments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => router.push('/cheques/new')}
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Add New Cheque
          </button>
          
          <button
            onClick={() => router.push('/cheques')}
            className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            View All Cheques
          </button>
        </div>
      </div>
    </main>
  )
}
