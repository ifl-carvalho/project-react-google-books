import { NextPage } from 'next'
import Image from 'next/image'

import { IBook } from '../../types/booksApiData'

import styles from './styles.module.scss'

interface BookCardProps {
  book: IBook
}

export const BookCard: NextPage<BookCardProps> = function ({ book }) {
  const addToFavorites = (): void => {
    const totalBooks = Number(localStorage.getItem('TotalBooks'))

    const localBooks = localStorage.getItem('Books') || undefined
    const books = localBooks === undefined ? [] : JSON.parse(localBooks)

    if (books.findIndex((item: IBook) => item.id === book.id) === -1) {
      books.push(book)
      localStorage.setItem('Books', JSON.stringify(books))
      localStorage.setItem('TotalBooks', (totalBooks + 1).toString())
    } else {
      localStorage.setItem(
        'Books',
        JSON.stringify(books.filter((item: IBook) => item.id !== book.id))
      )
      localStorage.setItem('TotalBooks', Math.max(0, totalBooks - 1).toString())
    }
  }

  return (
    <div className={styles.book}>
      <a href={book.volumeInfo.infoLink} target="_blank" rel="noreferrer">
        <Image
          src={
            Object.prototype.hasOwnProperty.call(book.volumeInfo, 'imageLinks')
              ? book.volumeInfo.imageLinks.thumbnail
              : '/notAvailable.png'
          }
          width={384}
          height={534}
          layout="responsive"
        />
      </a>
      <h2>{book.volumeInfo.title}</h2>
      <p>{book.volumeInfo.subtitle}</p>
      <p>{book.volumeInfo.publishedDate}</p>
      <button onClick={addToFavorites}>Add or Remove Fav</button>
    </div>
  )
}
