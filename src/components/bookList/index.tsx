import { NextPage } from 'next'
import { IBook } from '../../types/booksApiData'

import { BookCard } from '../bookCard'

import styles from './styles.module.scss'

interface BookListProps {
  books: IBook[]
}

export const BookList: NextPage<BookListProps> = function ({ books }) {
  return (
    <div className={styles.bookList}>
      {books.map((book: IBook) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
