import { type StackNavigationProp } from '@react-navigation/stack'
export interface GuestStackParamList {
  Login: undefined
  ForgotPassword: undefined
}

export interface ApplicationStackParamList {
  Home: undefined
  PublishArticle: undefined
}

export type GuestStackScreenProps = StackNavigationProp<GuestStackParamList>
