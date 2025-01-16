import { useMutation } from '@tanstack/vue-query'
import { account } from '~/lib/appwrite'
import { useForm } from 'vee-validate'
import { registerSchema } from '@/lib/schema.validate'
import { useAuthStore } from '@/stores/auth.store'

export function useChangeName() {
	const {
		errors,
		meta,
		values,
		defineField,
		setFieldValue,
		handleSubmit,
		isSubmitting,
	} = useForm({
		validationSchema: registerSchema.pick(['name']),
	})

	const store = useAuthStore()
	const messageRef = ref<string>('')
	const isSuccess = ref<boolean>(false)

	const [name, nameAttrs] = defineField('name')

	setFieldValue('name', store.getName)

	const { mutate } = useMutation({
		mutationKey: ['update_name'],
		mutationFn: () => account.updateName(name.value),
		onSuccess: () => {
			store.setName(name.value)
			isSuccess.value = true
			messageRef.value = 'Имя успешно изменено'
		},
		onError: () => {
			isSuccess.value = false
		},
	})

	const showError = () => {
		messageRef.value = 'Поле не изменено..'
		isSuccess.value = false
	}

	const updateName = handleSubmit(async values => {
		values.name === store.getName ? showError() : mutate()
		setTimeout(() => {
			messageRef.value = ''
		}, 2000)
	})

	return {
		name,
		nameAttrs,
		errors,
		meta,
		isSubmitting,
		messageRef,
		isSuccess,
		updateName,
	}
}
