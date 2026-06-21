import React from 'react'
import { motion } from 'framer-motion'

const BookFilters = ({ 
  genres, 
  selectedGenre, 
  onGenreChange, 
  maxPages, 
  onPagesChange, 
  searchQuery, 
  onSearchChange 
}) => {
  return (
    <motion.div
      className='rounded-xl border border-zinc-800 flex flex-col md:flex-row gap-6 justify-between items-end p-7'
      layout // Esto hace que si la rejilla se recoloca, los libros se muevan con suavidad
      initial={{ opacity: 0, y: 20 }} // Cómo arranca el componente (invisible y un poco abajo)
      animate={{ opacity: 1, y: 0 }}   // Cómo se posiciona al cargar
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-2 w-full md:w-1/3">
        <label className="text-sm font-medium text-zinc-400">¿Qué libro buscas?</label>
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Ej: El Señor de los Anillos..."
          className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-amber-700 transition-colors text-sm"
        />
      </div>

      <div className="flex flex-col gap-2 w-full md:w-1/4">
        {/* Añadimos las clases de estilo al label */}
        <label className="text-sm font-medium text-zinc-400">Filtrar por género</label>
        <select 
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-amber-700 transition-colors text-sm cursor-pointer"
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 w-full md:w-1/3">
        <div className="flex justify-between text-sm font-medium text-zinc-400">
          <label>Filtrar por páginas</label>
          <span className="text-amber-500 font-bold">≤ {maxPages} pág.</span>
        </div>
        <input 
          type="range"
          min="0"
          max="1000"
          value={maxPages}
          onChange={(e) => onPagesChange(Number(e.target.value))}
          className="w-full h-2 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-amber-700 border border-zinc-800"
        />
      </div>

    </motion.div>
  )
}

export default BookFilters