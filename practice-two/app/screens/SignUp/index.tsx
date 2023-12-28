/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { XStack, YStack } from 'tamagui'

import { RootStackParamList } from '@navigation/Stack'
import { Button, Heading, Input, Paragraph } from '@components'
import { IForm, IUser } from '@types'
import { SIGN_UP_INPUTS } from '@constants'
import { useRegister } from '@hooks'

import styles from './styles'

export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>

const SignUp = ({ navigation }: SignUpScreenProps) => {
  // const { mutate, isSuccess, data: user } = useRegister(process.env.USER_ENDPOINT)
  const { mutate, status } = useRegister('/auth/register')
  const { control, handleSubmit, watch } = useForm<IForm>()
  const observePassword: string = watch('password')
  const onSubmit: SubmitHandler<IForm> = useCallback((data: IUser) => {
    mutate(data)
  }, [])
  const handleToLoginScreen = useCallback(() => navigation.navigate('Login'), [])
  const SignUpInputs = useMemo(
    () => (
      <YStack space>
        {SIGN_UP_INPUTS(observePassword).map(({ name, ...props }) => (
          <Input key={name} {...props} control={control} name={name} />
        ))}
      </YStack>
    ),
    [control, observePassword]
  )

  return (
    <SafeAreaView style={styles.container}>
      <YStack marginBottom="$space.5" space="$space.9" alignItems="center">
        <Heading content="Welcome to tradly" fontWeight="$2" letterSpacing="$2" />
        <Paragraph content="Signup to your account" fontSize="$2" letterSpacing="$4" />
      </YStack>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {SignUpInputs}
      </KeyboardAvoidingView>
      <Button
        title="create"
        variant="secondary"
        marginVertical="$space.7"
        letterSpacing="$4"
        fontSize="$2"
        isDisable={status === 'pending'}
        onPress={handleSubmit(onSubmit)}
      />
      <XStack justifyContent="center" alignItems="baseline" space="$space.1">
        <Paragraph content="Have an account?" fontSize="$3" lineHeight="$4" />
        <Button
          title="Sign in"
          variant="tertiary"
          borderColor="$color.transparent"
          fontWeight="$3"
          fontSize="$3"
          lineHeight="$4"
          onPress={handleToLoginScreen}
        />
      </XStack>
    </SafeAreaView>
  )
}

export default SignUp
