import { Alert, KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, ErrorMessage, Heading, Input, Paragraph } from '@components'
import { IForm } from '@types'
import { COLORS } from '@constants'

import styles from './styles'

const SignUp = () => {
  const { control, handleSubmit } = useForm<IForm>()
  const onSubmit: SubmitHandler<IForm> = (data) => {
    Alert.alert(JSON.stringify(data))
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Heading content="Welcome to tradly" textMedium />
        <Paragraph content="Signup to your account" size="md" />
      </View>
      <View>
        <View>
          <Input
            name="firstName"
            control={control}
            placeholder="First Name"
            placeholderTextColor={COLORS.WHITE}
            rules={{
              required: 'First Name is required',
            }}
          />
          <ErrorMessage error={errors.firstName} />
        </View>
        <View>
          <Input
            name="lastName"
            control={control}
            placeholder="Last Name"
            placeholderTextColor={COLORS.WHITE}
            rules={{
              required: 'Last Name is required',
            }}
          />
          <ErrorMessage error={errors.lastName} />
        </View>
        <View>
          <Input
            name="email"
            control={control}
            placeholder="Email/Mobile Number"
            placeholderTextColor={COLORS.WHITE}
            rules={{
              required: 'Enter email or mobile number',
            }}
          />
          <ErrorMessage error={errors.email} />
        </View>
        <View>
          <Input
            name="password"
            secureTextEntry
            control={control}
            placeholder="Password"
            placeholderTextColor={COLORS.WHITE}
            rules={{
              required: 'Password is required',
            }}
          />
          <ErrorMessage error={errors.password} />
        </View>
        <View>
          <Input
            name="confirmPassword"
            secureTextEntry
            control={control}
            placeholder="Re-enter password"
            placeholderTextColor={COLORS.WHITE}
            rules={{
              required: 'Re-enter password is required',
            }}
          />
          <ErrorMessage error={errors.confirmPassword} />
        </View>
      </View>
      <Button
        style={styles.btn}
        title="create"
        variant="secondary"
        onPress={handleSubmit(onSubmit)}
      />
      <View style={styles.info}>
        <Paragraph size="lg" content="Have an account?" />
        <TouchableOpacity>
          <Paragraph style={styles.signInBtn} size="lg" content="Sign in" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignUp
