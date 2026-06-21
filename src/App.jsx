import { useState } from 'react'
import Header from './components/Header'
import BookGrid from './components/BookGrid'
import ReadingList from './components/ReadingList'
import BookFilters from './components/BookFilters'
import { useBook } from './hooks/useBook'

function App() {

  const { 
    availableBooks, 
    readingList, 
    addToReadingList, 
    removeFromReadingList,
    // Sacamos lo nuevo del hook:
    selectedGenre,
    setSelectedGenre,
    maxPages,
    setMaxPages,
    searchQuery,
    setSearchQuery,
    genres
  } = useBook()

  return (
    <div className="min-h-screen text-white p-6"> 
      {/* 1. El Header arriba del todo ocupando todo el ancho */}
      <Header availableCount={availableBooks.length} readingCount={readingList.length} />

      {/* 2. El contenedor principal dividido en 4 columnas */}
      <div id="main-grid" className="grid grid-cols-4 gap-6">
        
        {/* COLUMNA IZQUIERDA: Ocupa 3 de las 4 columnas (75% del espacio) */}
        <div className="col-span-3 flex flex-col gap-4">
          <BookFilters 
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            maxPages={maxPages}
            onPagesChange={setMaxPages}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <BookGrid books={availableBooks} onAddBook={addToReadingList} />
        </div>

        {/* COLUMNA DERECHA: Ocupa 1 de las 4 columnas (25% del espacio) */}
        <div className="col-span-1">
          <ReadingList books={readingList} onRemoveBook={removeFromReadingList} />
        </div>

      </div>
    </div>
  )
}

export default App
