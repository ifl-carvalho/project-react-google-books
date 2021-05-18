import { NextPage } from 'next'
import Image from 'next/image'

import styles from './styles.module.scss'

interface BookCardProps {
  title: string
  description: string
  publishDate: string
  infoLink: string
  image: string
}

export const BookCard: NextPage<BookCardProps> = function ({
  title,
  description,
  publishDate,
  infoLink,
  image,
}) {
  return (
    <a href={infoLink} target="_blank" className={styles.book} rel="noreferrer">
      <Image src={image} width={384} height={534} layout="responsive" />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{publishDate}</p>
      <button>Favorito!</button>
    </a>
  )
}
