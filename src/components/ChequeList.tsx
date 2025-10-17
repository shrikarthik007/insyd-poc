'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

interface Cheque {
  id: number
  payer: string
  amount: number
  cheque_no: string
  bank_name: string
  pdc_date: string
  status: string
}

export default function ChequeList() {
  const router = useRouter()
  const [cheques, setCheques] = useState<Cheque[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCheques = async () => {
      try {
        const { data, error } = await supabase
          .from('cheques')
          .select('*')
          .order('pdc_date', { ascending: false })

        if (error) {
          throw error
        }

        setCheques(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cheques')
        console.error('Error fetching cheques:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCheques()
  }, [])

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this cheque?')
    
    if (!confirmed) return

    try {
      const { error } = await supabase.from('cheques').delete().eq('id', id)

      if (error) {
        throw error
      }

      // Optimistically remove from state
      setCheques((prev) => prev.filter((cheque) => cheque.id !== id))
    } catch (err) {
      console.error('Error deleting cheque:', err)
      alert('Failed to delete cheque. Please try again.')
    }
  }

  const handleEdit = (id: number) => {
    router.push(`/cheques/${id}/edit`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-600">Loading cheques...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-red-600">Error: {error}</p>
      </div>
    )
  }

  if (cheques.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-600">No cheques found.</p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Payer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Cheque No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Bank Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              PDC Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {cheques.map((cheque) => (
            <tr key={cheque.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {cheque.payer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ₹{cheque.amount.toLocaleString('en-IN')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {cheque.cheque_no}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {cheque.bank_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(cheque.pdc_date).toLocaleDateString('en-IN')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    cheque.status === 'cleared'
                      ? 'bg-green-100 text-green-800'
                      : cheque.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : cheque.status === 'bounced'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {cheque.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(cheque.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cheque.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}