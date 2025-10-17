import ChequeList from '@/components/ChequeList'

export default function ChequesPage() {
  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">All Cheques</h1>
      <div className="w-full max-w-7xl">
        <ChequeList />
      </div>
    </main>
  )
}