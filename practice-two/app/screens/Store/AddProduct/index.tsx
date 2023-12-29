import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView } from 'react-native'
import { ScrollView, XStack, YStack, getTokenValue } from 'tamagui'
import { useFocusEffect } from '@react-navigation/native'
import { useShallow } from 'zustand/react/shallow'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@navigation/Stack'

import { Input, TabBar } from '@components'
import { IAddProductForm, ICategory, IForm } from '@types'
import { useAddProduct } from '@hooks'
import { useCommonStore } from '@stores'
import { isInCategory } from '@utils'

export type AddProductScreenProps = NativeStackScreenProps<RootStackParamList, 'AddProduct'>

const AddProduct = ({ navigation, route }: AddProductScreenProps) => {
  const [storeId, categories] = useCommonStore(
    useShallow((state) => [state.storeId, state.category])
  )
  const { mutate: addProduct, status } = useAddProduct('api/product')
  const { control, handleSubmit, formState } = useForm<IForm>({
    defaultValues: {
      discountPrice: 0,
      priceType: 'Fixed',
    },
  })
  const handleAddProduct = useCallback(({ category, ...data }: IAddProductForm) => {
    addProduct(
      {
        ...data,
        store: storeId,
        category: String(categories.find(({ name }: ICategory) => name === category)?._id),
      },
      {
        onSuccess: () => {
          navigation.goBack()
        },
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const AddForm = useMemo(
    () => (
      <YStack space="$space.4.5" paddingHorizontal="$space.4.5" backgroundColor="$color.white">
        <Input
          name="name"
          label="Product name"
          control={control}
          isShowError
          rules={{ required: 'Please enter product name' }}
        />
        <Input
          name="img"
          label="Product Image Uri"
          control={control}
          isShowError
          rules={{ required: 'Please enter product image link' }}
        />
        <Input
          name="category"
          label="Category Product"
          control={control}
          isShowError
          rules={{
            required: 'Please enter category product',
            validate: {
              isCategory: (value) => isInCategory(value) || 'Category not match',
            },
          }}
        />
        <XStack space="$space.3">
          <Input
            name="price"
            label="Price"
            control={control}
            keyboardType="numeric"
            isShowError
            rules={{ required: 'Please enter product price' }}
            containerStyle={{ flex: 1 }}
          />
          <Input
            name="discountPrice"
            label="Offer Price"
            keyboardType="numeric"
            control={control}
            isShowError
            containerStyle={{ flex: 1 }}
          />
        </XStack>
        <Input name="location" label="Location Details" control={control} isShowError />
        <Input
          name="description"
          label="Product Description"
          control={control}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          isShowError
        />
        <Input name="condition" label="Condition" control={control} isShowError />
        <Input name="priceType" label="Price Type" control={control} isShowError />
        <Input name="delivery" label="Additional Details" control={control} isShowError />
      </YStack>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  useFocusEffect(
    useCallback(() => {
      if (!route.params) return

      navigation.setOptions({ headerTitle: 'edit product' })
      // const { id } = route.params
      // Call product API
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route.params])
  )

  useEffect(() => {
    if (!formState.isSubmitSuccessful) return

    navigation.goBack()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.isSubmitSuccessful])
  return (
    <YStack flex={1}>
      <ScrollView
        contentContainerStyle={{ paddingVertical: getTokenValue('$space.5') }}
        backgroundColor="$color.white"
      >
        <KeyboardAvoidingView>{AddForm}</KeyboardAvoidingView>
      </ScrollView>
      <TabBar
        title="add product"
        isDisable={
          !formState.isDirty || !!Object.keys(formState.errors).length || status === 'pending'
        }
        onPress={handleSubmit(handleAddProduct)}
      />
    </YStack>
  )
}

export default AddProduct
