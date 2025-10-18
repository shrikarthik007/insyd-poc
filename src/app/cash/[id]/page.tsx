'use client'

import { useState, useEffect, FormEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter, useParams } from 'next/navigation'

export default function EditCashPaymentPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [formData, setFormData] = useState({
    payer: '',
    amount: '',
    payment_date: '',
    purpose: '',
    notes: '',
    status: 'received',
  })

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const { data, error } = await supabase
          .from('cash_payments')
          .select('*')
          .eq('id', id)
          .single()

        if (error) {
          throw error
        }

        if (data) {
          setFormData({
            payer: data.payer,
            amount: data.amount.toString(),
            payment_date: data.payment_date,
            purpose: data.purpose,
            notes: data.notes || '',
            status: data.status,
          })
        }
      } catch (err) {
        setMessage({
          type: 'error',
          text: err instanceof Error ? err.message : 'Failed to fetch cash payment',
        })
      } finally {
        setFetching(false)
      }
    }

    fetchPayment()
  }, [id])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('cash_payments')
        .update({
          payer: formData.payer,
          amount: parseFloat(formData.amount),
          payment_date: formData.payment_date,
          purpose: formData.purpose,
          notes: formData.notes || null,
          status: formData.status,
        })
        .eq('id', id)

      if (error) {
        throw error
      }

      setMessage({ type: 'success', text: 'Cash payment updated successfully!' })

      // Redirect to cash list after 2 seconds
      setTimeout(() => {
        router.push('/cash')
      }, 2000)
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to update cash payment',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (fetching) {
    return (
      <main className="flex items-center justify-center min-h-screen p-8">
        <p className="text-gray-600">Loading cash payment details...</p>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Edit Cash Payment</h1>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 space-y-6">
          <div>
            <label htmlFor="payer" className="block text-sm font-medium text-gray-700 mb-2">
              Payer Name *
            </label>
            <input
              type="text"
              id="payer"
              name="payer"
              value={formData.payer}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
text-gray-900 placeholder-gray-500 
focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="Enter payer name"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount (₹) *
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
text-gray-900 placeholder-gray-500 
focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label htmlFor="payment_date" className="block text-sm font-medium text-gray-700 mb-2">
              Payment Date *
            </label>
            <input
              type="date"
              id="payment_date"
              name="payment_date"
              value={formData.payment_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
text-gray-900 placeholder-gray-500 
focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
              Purpose *
            </label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
text-gray-900 placeholder-gray-500 
focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="Enter purpose of payment"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
text-gray-900 placeholder-gray-500 
focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="Add any additional notes"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
text-gray-900 
focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            >
              <option value="received">Received</option>
              <option value="pending">Pending</option>
              <option value="spent">Spent</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Updating...' : 'Update Cash Payment'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/cash')}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
