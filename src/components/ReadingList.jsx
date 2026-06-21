import { motion } from 'framer-motion'

const ReadingList = ({ books, onRemoveBook }) => {
  return (
    <div id="reading-list" className='p-3 rounded-lg bg-zinc-900 border border-zinc-800 h-full flex flex-col text-white'>
        <h2 className='text-xl font-bold px-4 opacity-50'>Lista de lectura {books.length}</h2>

        {books.length === 0 ? (
          <p className="text-zinc-500 text-sm text-center mt-10">
            No hay libros en tu lista aún. ¡Añade alguno!
          </p>
        ) : (
          <div className="flex flex-col gap-5 m-5">
            {books.map((book) => (
              <motion.div
                key={book.ISBN}
                className=""
                layout // Esto hace que si la rejilla se recoloca, los libros se muevan con suavidad
                initial={{ opacity: 0, y: 20 }} // Cómo arranca el componente (invisible y un poco abajo)
                animate={{ opacity: 1, y: 0 }}   // Cómo se posiciona al cargar
                exit={{ opacity: 0, scale: 0.8 }} // Cómo desaparece si se filtra o se quita
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={book.cover} 
                    alt={book.title} 
                    className="w-12 h-16 object-cover rounded shadow"
                  />
                  <div className="max-w-[120px]">
                    <h4 className="font-medium text-sm text-white line-clamp-1">{book.title}</h4>
                    <p className="text-xs text-zinc-400">{book.author.name}</p>
                  </div>
                  <button 
                    onClick={() => onRemoveBook(book.ISBN)}
                    className="text-xs bg-zinc-800 hover:bg-red-900/40 text-zinc-400 hover:text-red-400 p-2 rounded-lg transition-colors"
                    title="Quitar de la lista"
                  >
                    ✕
                  </button>
                </div>

              </motion.div>
            ))}
          </div>
        )}
    </div>


  )
}

export default ReadingList