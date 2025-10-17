'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-12 text-gray-100">
          Insyd POC - Cheque Manager
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => router.push('/cheques/new')}
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Add New Cheque
          </button>
          
          <button
            onClick={() => router.push('/cheques')}
            className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            View All Cheques
          </button>
        </div>
      </div>
    </main>
  )
}
