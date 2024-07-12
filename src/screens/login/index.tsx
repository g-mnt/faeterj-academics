import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, TextInput } from 'react-native-paper'
import { withGuestLayout } from 'src/HOC/withGuestLayout'
import { type LoginForm } from 'screens/login/types'
import { AuthRepository } from 'repositories/auth'
import { useFetch } from 'hooks/useFetch'
import { useAuthenticate } from 'hooks/useAuthenticate'
import { Controller, useForm } from 'react-hook-form'
import { Input } from 'src/components/Input'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const formSchema = object({
  email: string().required('O email é obrigatório!').email(),
  password: string().required('A senha é obrigatória!')
})

export const LoginScreen = withGuestLayout(() => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({ resolver: yupResolver(formSchema) })
  const [, fetchLogin] = useFetch(AuthRepository.login)
  const { authenticate } = useAuthenticate()
  const [hiddenPassword, setHiddenPassword] = useState(true)

  const submitLogin = async (form: LoginForm): Promise<void> => {
    const { data } = await fetchLogin(form)
    if (data !== null) {
      authenticate(data.user, data.token)
    }
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Icon size={120} source={require('@assets/app_icon.jpg')} />
      </View>
      <View style={{ flex: 2 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 2 }}>
            <Controller
              control={control}
              name='email'
              render={ ({ field: { onChange, value } }) => (
                <Input
                  containerStyle={{ marginBottom: 10 }}
                  theme={{ roundness: 20 }}
                  testID="email-input"
                  mode="outlined"
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  error={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                  left={<TextInput.Icon icon="email-outline" />}
                />
              )}
            />
            <Controller
              control={control}
              name='password'
              render={ ({ field: { onChange, value } }) => (
                <Input
                  containerStyle={{ marginBottom: 10 }}
                  theme={{ roundness: 20 }}
                  testID="password-input"
                  mode="outlined"
                  label="Senha"
                  value={value}
                  onChangeText={onChange}
                  error={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                  secureTextEntry={hiddenPassword}
                  right={
                    <TextInput.Icon
                      onPress={() => { setHiddenPassword(!hiddenPassword) } }
                      icon={hiddenPassword ? 'eye' : 'eye-off'}
                    />
                  }
                  left={<TextInput.Icon icon="lock-outline" />}
                />
              )}
            />
          </View>
          <Button
            mode="contained"
            disabled={typeof errors.email === 'string' || typeof errors.password === 'string'}
            onPress={handleSubmit(submitLogin)}
          >
            Login
          </Button>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 520
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
