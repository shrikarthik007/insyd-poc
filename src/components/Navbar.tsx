import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Left: App Title */}
        <div>
          <Link href="/" className="text-xl font-bold text-gray-100 hover:text-blue-400 transition-colors">
            Insyd Payment Manager
          </Link>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex gap-6">
          <Link 
            href="/" 
            className="text-gray-100 hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/cheques" 
            className="text-gray-100 hover:text-blue-400 transition-colors"
          >
            Cheques
          </Link>
          <Link 
            href="/cash" 
            className="text-gray-100 hover:text-blue-400 transition-colors"
          >
            Cash
          </Link>
        </div>
      </div>
    </nav>
  )
}
