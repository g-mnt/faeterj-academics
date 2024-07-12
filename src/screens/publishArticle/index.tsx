import React from 'react'
import { withAuthLayout } from 'src/HOC/withAuthLayout'
import { useToast } from 'src/hooks/useToast'
import { useFetch } from 'src/hooks/useFetch'
import { ArticleRepository } from 'src/repositories/article'
import { useNavigation } from '@react-navigation/native'
import { type ApplicationStackScreenProps } from 'src/navigations/types'
import { type PublishArticleForm } from 'src/components/ArticleForm/types'
import { ArticleForm } from 'src/components/ArticleForm'
import { View } from 'react-native'

export const PublishArticleScreen = withAuthLayout(() => {
  const [{ isLoading }, fetchPost] = useFetch(ArticleRepository.post)
  const { successToast } = useToast()
  const navigation = useNavigation<ApplicationStackScreenProps>()

  async function submitArticle (data: PublishArticleForm): Promise<void> {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('pdf', {
      uri: data.file.uri,
      type: data.file.mimeType,
      name: data.file.name
    } as unknown as Blob)

    const { error } = await fetchPost(formData)
    if (error === null) {
      successToast('Artigo criado com sucesso')
      navigation.navigate('SelfArticles')
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ArticleForm handleSubmit={submitArticle} isLoading={isLoading} />
    </View>
  )
}, { pageTitle: 'Publicar Artigo' })
