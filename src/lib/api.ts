/* eslint-disable @typescript-eslint/no-explicit-any */
// API utility for making requests to the Express backend
// Base URL for the API server
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Request failed')
    }

    return result
  } catch (error) {
    console.error('API request error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

// ==================== CHEQUES API ====================

export const chequesApi = {
  // Get all cheques
  getAll: async () => {
    return apiRequest<any[]>('/api/cheques')
  },

  // Create new cheque
  create: async (chequeData: {
    payer: string
    amount: number
    cheque_no: string
    bank_name: string
    pdc_date: string
    status?: string
  }) => {
    return apiRequest('/api/cheques', {
      method: 'POST',
      body: JSON.stringify(chequeData),
    })
  },

  // Update cheque
  update: async (
    id: number,
    chequeData: {
      payer?: string
      amount?: number
      bank_name?: string
      pdc_date?: string
      status?: string
    }
  ) => {
    return apiRequest(`/api/cheques/${id}`, {
      method: 'PUT',
      body: JSON.stringify(chequeData),
    })
  },

  // Delete cheque
  delete: async (id: number) => {
    return apiRequest(`/api/cheques/${id}`, {
      method: 'DELETE',
    })
  },
}

// ==================== CASH PAYMENTS API ====================

export const cashApi = {
  // Get all cash payments
  getAll: async () => {
    return apiRequest<any[]>('/api/cash')
  },

  // Create new cash payment
  create: async (cashData: {
    payer: string
    amount: number
    payment_date: string
    purpose: string
    notes?: string
    status?: string
  }) => {
    return apiRequest('/api/cash', {
      method: 'POST',
      body: JSON.stringify(cashData),
    })
  },

  // Update cash payment
  update: async (
    id: string,
    cashData: {
      payer?: string
      amount?: number
      payment_date?: string
      purpose?: string
      notes?: string
      status?: string
    }
  ) => {
    return apiRequest(`/api/cash/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cashData),
    })
  },

  // Delete cash payment
  delete: async (id: string) => {
    return apiRequest(`/api/cash/${id}`, {
      method: 'DELETE',
    })
  },
}

// Export the API base URL for direct usage if needed
export { API_BASE_URL }
