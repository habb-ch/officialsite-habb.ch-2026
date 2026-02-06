import Link from 'next/link'
import Image from 'next/image'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/logo.png"
        alt="Habb.ch Logo"
        width={150}
        height={40}
        className="h-10 w-auto"
        priority
      />
      <span className="text-2xl font-bold text-habb-gray-900">
        Habb<span className="text-swiss-red">.ch</span>
      </span>
    </Link>
  )
}
