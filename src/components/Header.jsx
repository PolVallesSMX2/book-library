const Header = ({ availableCount, readingCount }) => {
  return (
    <header className='mx-10'>
        <h1 className='font-bold text-4xl mb-3 decoration-2'>
            <span className="bg-gradient-to-t from-amber-500 to-amber-600 bg-clip-text text-transparent  text-6xl">{availableCount}</span> Libros disponibles
        </h1>
        <h2 className='font-medium text-xl'>
            {readingCount} en la lista de lectura
        </h2>
    </header>
  )
}

export default Header

