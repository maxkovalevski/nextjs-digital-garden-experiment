import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div>
        <Link href='/' passHref>
          <h2>Something</h2>
        </Link>
      </div>
    </header>
  )
}
