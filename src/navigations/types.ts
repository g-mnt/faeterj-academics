import { type StackNavigationProp } from '@react-navigation/stack'
export type GuestStackParamList = {
  Login: undefined
  ForgotPassword: undefined
}

export type ApplicationStackParamList = {
  Home: undefined
  PublishArticle: undefined
}

export type GuestStackScreenProps = StackNavigationProp<GuestStackParamList>
export type ApplicationStackScreenProps = StackNavigationProp<ApplicationStackParamList>
