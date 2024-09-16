import { useMutation } from '@tanstack/vue-query'
import { account } from '~/lib/appwrite'
import { useForm, useResetForm } from 'vee-validate'
import { loginSchema } from '@/lib/schema.validate'
import { useAuthStore } from '@/stores/auth.store'

export function useChangeEmail() {
	const {
		errors,
		meta,
		values,
		defineField,
		setFieldValue,
		handleSubmit,
		isSubmitting,
	} = useForm({
		validationSchema: loginSchema.pick(['email', 'password']),
	})

	const store = useAuthStore()
	const messageRef = ref<string>('')
	const isSuccess = ref<boolean>(false)

	const [email, emailAttrs] = defineField('email')
	const [password, passwordAttrs] = defineField('password')

	setFieldValue('email', store.getEmail)

	const { mutate } = useMutation({
		mutationKey: ['update_email'],
		mutationFn: () => account.updateEmail(email.value, password.value),
		onSuccess: () => {
			messageRef.value = 'Email успешно изменен'
			isSuccess.value = true
			store.setEmail(email.value)
		},
		onError(error) {
			messageRef.value = error.message
			isSuccess.value = false
		},
	})

	const showError = () => {
		messageRef.value = 'Поле не изменено'
		isSuccess.value = false
	}

	const updateEmail = handleSubmit(async values => {
		values.email === store.getEmail ? showError() : mutate()
		setTimeout(() => {
			messageRef.value = ''
		}, 2500)
	})

	return {
		email,
		emailAttrs,
		password,
		passwordAttrs,
		errors,
		meta,
		isSubmitting,
		messageRef,
		isSuccess,
		updateEmail,
	}
}
