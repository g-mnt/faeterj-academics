import { type Author } from 'types/models/author'

export enum ArticleStatuses {
  Pending = 'Pendente',
  Approved = 'Aprovado',
  Rejected = 'Rejeitado',
}

export type Article = {
  id: number
  title: string
  description: string
  author: Author
  document_url: string
  status: ArticleStatuses
  favorite: boolean
}
