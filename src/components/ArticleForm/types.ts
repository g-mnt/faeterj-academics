import { type DocumentPickerAsset } from 'expo-document-picker'
import { type Article } from 'src/types/models/article'

export type ArticleFormProps = {
  article?: Article
  isLoading: boolean
  handleSubmit: (data: PublishArticleForm) => Promise<void>
}

export type PublishArticleFormFields = {
  title: string
  description: string
}

export type PublishArticleForm = {
  file: DocumentPickerAsset
} & PublishArticleFormFields
