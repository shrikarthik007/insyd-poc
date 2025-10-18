'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

interface CashPayment {
  id: string
  payer: string
  amount: number
  payment_date: string
  purpose: string
  status: string
  notes?: string
}

export default function CashPaymentsPage() {
  const router = useRouter()
  const [payments, setPayments] = useState<CashPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data, error } = await supabase
          .from('cash_payments')
          .select('*')
          .order('payment_date', { ascending: false })

        if (error) {
          throw error
        }

        setPayments(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cash payments')
        console.error('Error fetching cash payments:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this cash payment?')
    
    if (!confirmed) return

    try {
      const { error } = await supabase.from('cash_payments').delete().eq('id', id)

      if (error) {
        throw error
      }

      // Optimistically remove from state
      setPayments((prev) => prev.filter((payment) => payment.id !== id))
    } catch (err) {
      console.error('Error deleting cash payment:', err)
      alert('Failed to delete cash payment. Please try again.')
    }
  }

  const handleEdit = (id: string) => {
    router.push(`/cash/${id}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-600">Loading cash payments...</p>
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

  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <div className="w-full max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Cash Payments</h1>
          <button
            onClick={() => router.push('/cash/new')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Add Cash Payment
          </button>
        </div>

        {payments.length === 0 ? (
          <div className="flex justify-center items-center p-8">
            <p className="text-gray-600">No records found.</p>
          </div>
        ) : (
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
                    Payment Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    Purpose
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
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.payer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{payment.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(payment.payment_date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {payment.purpose}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          payment.status === 'received'
                            ? 'bg-green-100 text-green-800'
                            : payment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : payment.status === 'spent'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(payment.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(payment.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
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
        )}
      </div>
    </main>
  )
}
