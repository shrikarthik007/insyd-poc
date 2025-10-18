import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Insyd Payment Manager API is running!' })
})

// ==================== CHEQUES ROUTES ====================

// GET all cheques
app.get('/api/cheques', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('cheques')
      .select('*')
      .order('pdc_date', { ascending: false })

    if (error) {
      throw error
    }

    res.json({ success: true, data })
  } catch (error: any) {
    console.error('Error fetching cheques:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// POST new cheque
app.post('/api/cheques', async (req: Request, res: Response) => {
  try {
    const { payer, amount, cheque_no, bank_name, pdc_date, status } = req.body

    // Validation
    if (!payer || !amount || !cheque_no || !bank_name || !pdc_date) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: payer, amount, cheque_no, bank_name, pdc_date',
      })
    }

    const { data, error } = await supabase
      .from('cheques')
      .insert([
        {
          payer,
          amount: parseFloat(amount),
          cheque_no,
          bank_name,
          pdc_date,
          status: status || 'pending',
        },
      ])
      .select()

    if (error) {
      throw error
    }

    res.status(201).json({ success: true, data })
  } catch (error: any) {
    console.error('Error creating cheque:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// PUT update cheque
app.put('/api/cheques/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { payer, amount, bank_name, pdc_date, status } = req.body

    const updateData: any = {}
    if (payer) updateData.payer = payer
    if (amount) updateData.amount = parseFloat(amount)
    if (bank_name) updateData.bank_name = bank_name
    if (pdc_date) updateData.pdc_date = pdc_date
    if (status) updateData.status = status

    const { data, error } = await supabase
      .from('cheques')
      .update(updateData)
      .eq('id', id)
      .select()

    if (error) {
      throw error
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, error: 'Cheque not found' })
    }

    res.json({ success: true, data })
  } catch (error: any) {
    console.error('Error updating cheque:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// DELETE cheque
app.delete('/api/cheques/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const { error } = await supabase.from('cheques').delete().eq('id', id)

    if (error) {
      throw error
    }

    res.json({ success: true, message: 'Cheque deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting cheque:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// ==================== CASH ROUTES ====================

// GET all cash payments
app.get('/api/cash', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('cash_payments')
      .select('*')
      .order('payment_date', { ascending: false })

    if (error) {
      throw error
    }

    res.json({ success: true, data })
  } catch (error: any) {
    console.error('Error fetching cash payments:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// POST new cash payment
app.post('/api/cash', async (req: Request, res: Response) => {
  try {
    const { payer, amount, payment_date, purpose, notes, status } = req.body

    // Validation
    if (!payer || !amount || !payment_date || !purpose) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: payer, amount, payment_date, purpose',
      })
    }

    const { data, error } = await supabase
      .from('cash_payments')
      .insert([
        {
          payer,
          amount: parseFloat(amount),
          payment_date,
          purpose,
          notes: notes || null,
          status: status || 'received',
        },
      ])
      .select()

    if (error) {
      throw error
    }

    res.status(201).json({ success: true, data })
  } catch (error: any) {
    console.error('Error creating cash payment:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// PUT update cash payment
app.put('/api/cash/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { payer, amount, payment_date, purpose, notes, status } = req.body

    const updateData: any = {}
    if (payer) updateData.payer = payer
    if (amount) updateData.amount = parseFloat(amount)
    if (payment_date) updateData.payment_date = payment_date
    if (purpose) updateData.purpose = purpose
    if (notes !== undefined) updateData.notes = notes || null
    if (status) updateData.status = status

    const { data, error } = await supabase
      .from('cash_payments')
      .update(updateData)
      .eq('id', id)
      .select()

    if (error) {
      throw error
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, error: 'Cash payment not found' })
    }

    res.json({ success: true, data })
  } catch (error: any) {
    console.error('Error updating cash payment:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// DELETE cash payment
app.delete('/api/cash/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const { error } = await supabase.from('cash_payments').delete().eq('id', id)

    if (error) {
      throw error
    }

    res.json({ success: true, message: 'Cash payment deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting cash payment:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`)
})
