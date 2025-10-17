'use client'

import { useState, useEffect, FormEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter, useParams } from 'next/navigation'

export default function EditChequePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [formData, setFormData] = useState({
    payer: '',
    amount: '',
    cheque_no: '',
    bank_name: '',
    pdc_date: '',
    status: 'pending',
  })

  useEffect(() => {
    const fetchCheque = async () => {
      try {
        const { data, error } = await supabase
          .from('cheques')
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
            cheque_no: data.cheque_no,
            bank_name: data.bank_name,
            pdc_date: data.pdc_date,
            status: data.status,
          })
        }
      } catch (err) {
        setMessage({
          type: 'error',
          text: err instanceof Error ? err.message : 'Failed to fetch cheque',
        })
      } finally {
        setFetching(false)
      }
    }

    fetchCheque()
  }, [id])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('cheques')
        .update({
          payer: formData.payer,
          amount: parseFloat(formData.amount),
          bank_name: formData.bank_name,
          pdc_date: formData.pdc_date,
          status: formData.status,
        })
        .eq('id', id)

      if (error) {
        throw error
      }

      setMessage({ type: 'success', text: 'Cheque updated successfully!' })

      // Redirect to cheques list after 2 seconds
      setTimeout(() => {
        router.push('/cheques')
      }, 2000)
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to update cheque',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (fetching) {
    return (
      <main className="flex items-center justify-center min-h-screen p-8">
        <p className="text-gray-600">Loading cheque details...</p>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Edit Cheque</h1>

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
            <label htmlFor="cheque_no" className="block text-sm font-medium text-gray-700 mb-2">
              Cheque Number
            </label>
            <input
              type="text"
              id="cheque_no"
              name="cheque_no"
              value={formData.cheque_no}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
text-gray-500 bg-gray-200 cursor-not-allowed"
              placeholder="Cheque number (read-only)"
            />
          </div>

          <div>
            <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700 mb-2">
              Bank Name *
            </label>
            <input
              type="text"
              id="bank_name"
              name="bank_name"
              value={formData.bank_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
text-gray-900 placeholder-gray-500 
focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="Enter bank name"
            />
          </div>

          <div>
            <label htmlFor="pdc_date" className="block text-sm font-medium text-gray-700 mb-2">
              PDC Date *
            </label>
            <input
              type="date"
              id="pdc_date"
              name="pdc_date"
              value={formData.pdc_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
text-gray-900 placeholder-gray-500 
focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
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
              <option value="pending">Pending</option>
              <option value="cleared">Cleared</option>
              <option value="bounced">Bounced</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Updating...' : 'Update Cheque'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/cheques')}
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
