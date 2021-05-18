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
  const [index, setIndex] = useState(0)
  const [pages, setPages] = useState(1)

  const numberOfItemsPerPage = 20

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      await axios
        .get('https://www.googleapis.com/books/v1/volumes', {
          params: { q: search, maxResults: numberOfItemsPerPage, startIndex: index },
        })
        .then((res: AxiosResponse<BooksAPIResponse>) => {
          const data = res.data as BooksAPIResponse

          setPages(Math.ceil(data.totalItems / numberOfItemsPerPage))
          setBooks(data.items)
        })
        .catch((err: AxiosError) => {
          console.log('Error:', err.message)

          setPages(1)
          setBooks([])
        })
    }
    fetch()
  }, [index, search])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value)
  }

  const handlePageChange = (e: ChangeEvent<unknown>, index: number): void => {
    setIndex(index)
  }

  return (
    <div>
      <div className={styles.navBar}>
        <h1>Google Books API</h1>
        <Search handleSearch={handleSearch} />
        <Pagination count={pages} onChange={handlePageChange} />
      </div>
      <BookList books={books} />
    </div>
  )
}
