import { NextPage } from 'next'
import { ChangeEvent } from 'react'

interface SearchProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
  handleFavoriteSort: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const Search: NextPage<SearchProps> = function ({ handleSearch, handleFavoriteSort }) {
  return (
    <form action="">
      <input type="text" onChange={handleSearch} />
      <select defaultValue="all" onChange={handleFavoriteSort}>
        <option value="all">All Books</option>
        <option value="favorites">Favorites</option>
      </select>
    </form>
  )
}
