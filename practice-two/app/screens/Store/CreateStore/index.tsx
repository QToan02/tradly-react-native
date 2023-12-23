import { useMemo } from 'react'
import { Image, KeyboardAvoidingView } from 'react-native'
import { ScrollView, YStack } from 'tamagui'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useForm } from 'react-hook-form'

import { RootStackParamList } from '@navigation/Stack'
import { Input, Paragraph, TabBar } from '@components'
import { IForm, IStoreForms } from '@types'
import { CREATE_STORE_FIELDS } from '@constants'
import { TStoreFields } from '@constants/screens/createStoreFields'

import styles from './styles'

export type CreateStoreScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateStore'>

const CreateStore = () => {
  const { control, handleSubmit, formState } = useForm<IForm>()
  const handleCreateStore = (data: IStoreForms) => {
    console.log(data)
  }
  const HeaderView = useMemo(
    () => (
      <YStack marginVertical="$space.5" alignItems="center" space="$space.5">
        <Image source={require('@assets/my_store/shop.png')} style={styles.headerImg} />
        <Paragraph
          fontWeight="$2"
          textAlign="center"
          content="This information is used to set up your shop"
          color="$color.gray_50"
          maxWidth={240}
        />
      </YStack>
    ),
    []
  )

  const CreateForm = useMemo(
    () => (
      <YStack space="$space.4.5">
        {CREATE_STORE_FIELDS.map(({ id, ...data }: TStoreFields) => (
          <Input {...data} control={control} key={id} isShowError />
        ))}
      </YStack>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <>
      <ScrollView>
        <YStack>
          {HeaderView}
          <KeyboardAvoidingView style={styles.form}>{CreateForm}</KeyboardAvoidingView>
        </YStack>
      </ScrollView>
      <TabBar
        title="Create"
        onPress={handleSubmit(handleCreateStore)}
        isDisable={!formState.isDirty || !!Object.keys(formState.errors).length}
      />
    </>
  )
}

export default CreateStore
