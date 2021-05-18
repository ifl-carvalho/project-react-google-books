import { NextPage } from 'next'
import { ChangeEvent, useEffect, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'

import Pagination from '@material-ui/lab/Pagination'

import { BookList } from '../bookList'
import { Search } from '../search'

import { BooksAPIResponse, IBook } from '../../types/booksApiData'

import styles from './styles.module.scss'

export const BookSection: NextPage = function () {
  const [books, setBooks] = useState([] as IBook[])
  const [search, setSearch] = useState('javascript')
  const [paginationIndex, setPaginationIndex] = useState(0)
  const [paginationMaxPageNumber, setPaginationMaxPageNumber] = useState(1)
  const [onlyFavorites, setOnlyFavorites] = useState('all')

  const numberOfItemsPerPage = 20

  useEffect(() => {
    const fetchFromGoogle = async (): Promise<void> => {
      await axios
        .get('https://www.googleapis.com/books/v1/volumes', {
          params: { q: search, maxResults: numberOfItemsPerPage, startIndex: paginationIndex },
        })
        .then((res: AxiosResponse<BooksAPIResponse>) => {
          const data = res.data as BooksAPIResponse

          setPaginationMaxPageNumber(Math.ceil(data.totalItems / numberOfItemsPerPage))
          setBooks(data.items)
        })
        .catch((err: AxiosError) => {
          console.log('Error:', err.message)

          setPaginationMaxPageNumber(1)
          setBooks([])
        })
    }

    const fetchFromFavorites = (): void => {
      const pageNumber =
        Number(localStorage.getItem('TotalBooks')) === 0
          ? 1
          : Number(localStorage.getItem('TotalBooks'))

      const localBooks = localStorage.getItem('Books') || undefined
      const books = localBooks === undefined ? [] : JSON.parse(localBooks)

      setPaginationMaxPageNumber(pageNumber)
      setBooks(books)
    }

    if (onlyFavorites == 'all') {
      fetchFromGoogle()
    }
    if (onlyFavorites == 'favorites') {
      fetchFromFavorites()
    }
  }, [onlyFavorites, paginationIndex, search])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value)
  }

  const handlePageChange = (e: ChangeEvent<unknown>, paginationIndex: number): void => {
    setPaginationIndex(paginationIndex)
  }

  const handleFavoriteSort = (e: ChangeEvent<HTMLSelectElement>): void => {
    setOnlyFavorites(e.target.value)
  }

  return (
    <div>
      <div className={styles.navBar}>
        <h1>Google Books API</h1>
        <Search handleSearch={handleSearch} handleFavoriteSort={handleFavoriteSort} />
        <Pagination count={paginationMaxPageNumber} onChange={handlePageChange} />
      </div>
      <BookList books={books} />
    </div>
  )
}
