import data from '../data/books.json'
import BookCard from './BookCard'

const BookGrid = ({ books, onAddBook }) => {
  return (
    <div id="book-grid" className='gap-2 p-3 rounded-lg border-2 border-amber-700/10 grid grid-cols-5'>
        {/* {data.library.map((item) => (
            <BookCard key={item.book.ISBN} book={item.book} />
        ))} */}
        {books.map((book) => (
            <BookCard
                key={book.ISBN}
                book={book}
                onAddBook={onAddBook}
            />
        ))}
    </div>
  )
}

export default BookGrid