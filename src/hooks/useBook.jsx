import { useEffect, useState } from "react"
import data from '../data/books.json'

const genres = ['Todos', ...new Set(data.library.map(item => item.book.genre))]

export function useBook() {
    // SIN  PERSISTENCIA LOCAL STORAGE
    // const  [books, setBooks] = useState(() => {
    //     return data.library.map(item => ({
    //         ...item.book,
    //         isInReadingList: false
    //     }))
    // })

    //  PERSISTENCIA LOCAL STORAGE
    const [books, setBooks] = useState(() => {
        // 1. Intentamos buscar si ya existe una lista guardada en el navegador
        const savedReadingList = localStorage.getItem('readingList_isbns')
        // Si existe, la convertimos de texto a un array de JavaScript. Si no, dejamos un array vacío.
        const savedIsbns = savedReadingList ? JSON.parse(savedReadingList) : []

        return data.library.map(item => ({
            ...item.book,
            // 2. En lugar de false por defecto, miramos si el ISBN del libro estaba guardado
            isInReadingList: savedIsbns.includes(item.book.ISBN)
        }))
    })

    useEffect(() => {
        const readingListIsbns = books.filter(book => book.isInReadingList).map(book => book.ISBN)

        localStorage.setItem("readingList_isbns", JSON.stringify(readingListIsbns))
    }, [books])

    // Este useEffect se encarga de ESCUCHAR los cambios desde fuera (otras pestañas)
    useEffect(() => {
        const handleStorageChange = (e) => {
            // Si el cambio que ocurrió en la otra pestaña fue en nuestra lista de lectura
            if (e.key === 'readingList_isbns') {
                // Parseamos los nuevos ISBNs que guardó la otra pestaña
                const newIsbns = e.newValue ? JSON.parse(e.newValue) : []
                
                // Actualizamos nuestro estado de React local
                setBooks(prevBooks => 
                    prevBooks.map(book => ({
                        ...book,    
                        isInReadingList: newIsbns.includes(book.ISBN)
                    }))
                )
            }
        }

        // 1. Nos suscribimos al evento nativo del navegador
        window.addEventListener('storage', handleStorageChange)

        // 2. BUENA PRÁCTICA SENIOR: Nos desuscribimos del evento si el componente se desmonta
        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, []) // <-- Array vacío porque solo queremos activar este "escuchador" una vez al arrancar la app

    const [selectedGenre, setSelectedGenre] = useState('Todos')
    const [maxPages, setMaxPages] = useState(1000) // Ponemos 1000 por defecto para que salgan casi todos
    const [searchQuery, setSearchQuery] = useState('')

    const availableBooks = books.filter(book => {
        const matchesReadingList = !book.isInReadingList
        const matchesGenre = selectedGenre === "Todos" || book.genre === selectedGenre
        const matchesPages = book.pages <= maxPages
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesReadingList && matchesGenre && matchesPages && matchesSearch
    })
    const readingList = books.filter(book => book.isInReadingList)

    const addToReadingList = (isbn) => {
        setBooks(prevBooks =>
            prevBooks.map(book =>
                book.ISBN === isbn ? {...book, isInReadingList: true } : book
            )
        )
    }

    const removeFromReadingList = (isbn) => {
        setBooks(prevBooks =>
            prevBooks.map(book =>
                book.ISBN === isbn ? {...book,  isInReadingList: false } : book
            )
        )
    }

  return {
    availableBooks,
    readingList,
    addToReadingList,
    removeFromReadingList,
    // Nuevas
    selectedGenre,
    setSelectedGenre,
    maxPages,
    setMaxPages,
    searchQuery,
    setSearchQuery,
    genres
  }
}
