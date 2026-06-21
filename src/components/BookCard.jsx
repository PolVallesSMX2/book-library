import { motion } from 'framer-motion'

const BookCard = ({ book, onAddBook }) => {
  return (
    <motion.div
        layout // Esto hace que si la rejilla se recoloca, los libros se muevan con suavidad
        initial={{ opacity: 0, y: 20 }} // Cómo arranca el componente (invisible y un poco abajo)
        animate={{ opacity: 1, y: 0 }}   // Cómo se posiciona al cargar
        exit={{ opacity: 0, scale: 0.8 }} // Cómo desaparece si se filtra o se quita
        whileHover={{ y: -6, scale: 1.02 }} // Efecto al pasar el ratón por encima
        transition={{ duration: 0.3 }}
        className="gap-1 p-4 flex flex-col justify-between rounded-xl"
        // className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex flex-col justify-between shadow-lg"
    >
        <img
            src={book.cover}
            alt={book.title}
            className="h-100 w-full object-cover rounded-lg shadow-md mb-3"
        />

        <h3 className="text-xl font-bold">{book.title}</h3>
        <p className="text-sm opacity-50">{book.author.name}</p>

        <button
            className="bg-amber-700 rounded-xl w-full py-2 font-medium text-white transition-colors hover:bg-amber-600"
            onClick={() => onAddBook(book.ISBN)}
        >
            Añadir a mi lista
        </button>
    </motion.div>
  )
}

export default BookCard