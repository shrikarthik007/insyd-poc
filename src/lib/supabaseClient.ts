import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wfujctguwpaslcuiziem.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmdWpjdGd1d3Bhc2xjdWl6aWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzY0MTEsImV4cCI6MjA3NjExMjQxMX0.MYMCsCX00pSWmz7EVp6CqP6JuuaeWqBQXKPTDzxoDgw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
