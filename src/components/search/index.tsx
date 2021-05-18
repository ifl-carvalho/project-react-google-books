import { NextPage } from 'next'
import { ChangeEvent } from 'react'

interface SearchProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Search: NextPage<SearchProps> = function ({ handleSearch }) {
  return (
    <form action="">
      <input type="text" onChange={handleSearch} />
      <select></select>
    </form>
  )
}
