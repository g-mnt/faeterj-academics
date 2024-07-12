import React, { useState, type ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Icon, Text, useTheme } from 'react-native-paper'
import { Input } from '../Input'
import * as DocumentPicker from 'expo-document-picker'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import { type ArticleFormProps, type PublishArticleFormFields } from './types'

const formSchema = object({
  title: string().required('O titulo é obrigatório'),
  description: string().required('A descrição é obrigatória')
})

export function ArticleForm ({ article, isLoading, ...props }: ArticleFormProps): ReactNode {
  const { colors } = useTheme()
  const { control, handleSubmit, formState: { errors } } = useForm<PublishArticleFormFields>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      description: article !== undefined ? article.description : '',
      title: article !== undefined ? article.title : ''
    }
  })
  const [uploadedFile, setUploadedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null)

  async function handlePickFile (): Promise<void> {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' })
    if (!result.canceled) {
      setUploadedFile(result.assets[0])
    }
  }

  function sendForSubmit (data: PublishArticleFormFields): void {
    if (uploadedFile !== null) {
      props.handleSubmit({ ...data, file: uploadedFile }).catch(() => {})
    }
  }

  return (
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
                  style={styles.descriptionInput}
                  numberOfLines={4}
                  maxLength={140}
                  multiline
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
          onPress={handleSubmit(sendForSubmit)}
          disabled={isLoading}
          loading={isLoading}
        >
          Publicar Artigo
        </Button>
      </ScrollView>
  )
}

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
  descriptionInput: {
    paddingVertical: 10
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
