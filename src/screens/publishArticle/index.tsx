import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Icon, Text, useTheme } from 'react-native-paper'
import { withAuthLayout } from 'src/HOC/withAuthLayout'
import * as DocumentPicker from 'expo-document-picker'
import { Controller, useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'src/components/Input'
import { useToast } from 'src/hooks/useToast'
import { useFetch } from 'src/hooks/useFetch'
import { ArticleRepository } from 'src/repositories/article'
import { useNavigation } from '@react-navigation/native'
import { type ApplicationStackScreenProps } from 'src/navigations/types'

type PublishArticleForm = {
  title: string
  description: string
}

const formSchema = object({
  title: string().required('O titulo é obrigatório'),
  description: string().required('A descrição é obrigatória')
})

export const PublishArticleScreen = withAuthLayout(() => {
  const { control, handleSubmit, formState: { errors } } = useForm<PublishArticleForm>({ resolver: yupResolver(formSchema) })
  const [uploadedFile, setUploadedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null)
  const [{ isLoading }, fetchPost] = useFetch(ArticleRepository.post)
  const { successToast } = useToast()
  const { colors } = useTheme()
  const navigation = useNavigation<ApplicationStackScreenProps>()

  async function handlePickFile (): Promise<void> {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' })
    if (!result.canceled) {
      setUploadedFile(result.assets[0])
    }
  }

  async function submitArticle (data: PublishArticleForm): Promise<void> {
    if (uploadedFile !== null) {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('pdf', {
        uri: uploadedFile.uri,
        type: uploadedFile.mimeType,
        name: uploadedFile.name
      } as unknown as Blob)

      const { error } = await fetchPost(formData)
      if (error === null) {
        successToast('Artigo criado com sucesso')
        navigation.navigate('Home')
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        keyboardShouldPersistTaps="always"
        automaticallyAdjustKeyboardInsets
      >
        <View style={styles.formUpload}>
            <Text style={styles.inputLabel}>Titulo</Text>
            <Controller
              control={control}
              name='title'
              render={ ({ field: { onChange, value } }) => (
                <Input
                  containerStyle={styles.input}
                  theme={{ roundness: 20 }}
                  mode="outlined"
                  testID="title-input"
                  placeholder="Titulo"
                  value={value}
                  onChangeText={onChange}
                  error={errors.title !== undefined}
                  errorMessage={errors.title?.message}
                />
              )}
            />
            <Text style={styles.inputLabel}>Descrição</Text>
            <Controller
              control={control}
              name='description'
              render={ ({ field: { onChange, value } }) => (
                <Input
                  containerStyle={styles.input}
                  theme={{ roundness: 20 }}
                  mode="outlined"
                  testID="description-input"
                  placeholder="Descrição"
                  value={value}
                  onChangeText={onChange}
                  error={errors.description !== undefined}
                  errorMessage={errors.description?.message}
                />
              )}
            />
            <Text style={styles.inputLabel}>PDF Upload</Text>
            <Pressable
                onPress={() => { handlePickFile().catch(() => {}) }}
                style={styles.uploadButton}>
                <Icon source='file-upload-outline' size={100} color={colors.primary} />
            </Pressable>
            {uploadedFile !== null && (
              <View style={styles.uploadedFileContainer}>
                <Text style={[styles.pdfFileName, { color: colors.error }]}>
                  {uploadedFile.name}
                </Text>
                <Pressable onPress={() => {
                  setUploadedFile(null)
                }}>
                  <Icon
                    source='trash-can-outline'
                    size={30}
                    color={colors.error}
                  />
                </Pressable>
              </View>
            )}
        </View>
        <Button
          mode="contained"
          onPress={handleSubmit(submitArticle)}
          disabled={isLoading}
          loading={isLoading}
        >
          Publicar Artigo
        </Button>
      </ScrollView>
    </View>
  )
})

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'space-between'
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 10
  },
  input: {
    marginBottom: 25
  },
  formUpload: {
    flex: 1,
    marginBottom: 20
  },
  uploadButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 20,
    padding: 30,
    maxHeight: 250
  },
  uploadedFileContainer: {
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  pdfFileName: {
    flexWrap: 'wrap',
    maxWidth: '85%'
  }
})
