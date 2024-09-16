import { useMutation } from '@tanstack/vue-query'
import { account } from '~/lib/appwrite'
import { useForm } from 'vee-validate'
import { loginSchema } from '@/lib/schema.validate'

export function useChangePassword() {
	const { errors, meta, values, defineField, handleSubmit, isSubmitting } =
		useForm({
			validationSchema: loginSchema.pick(['password']),
		})

	const messageRef = ref<string>('')
	const isSuccess = ref<boolean>(false)

	const [password, passwordAttrs] = defineField('password')
	const [newPassword, newPasswordAttrs] = defineField('newPassword')

	const { mutate } = useMutation({
		mutationKey: ['update_password'],
		mutationFn: () => account.updatePassword(newPassword.value, password.value),
		onSuccess: () => {
			messageRef.value = 'Пароль успешно изменен'
			isSuccess.value = true
		},
		onError(error) {
			messageRef.value = error.message
			isSuccess.value = false
		},
	})

	const updatePassword = handleSubmit(async values => {
		mutate()
		setTimeout(() => {
			messageRef.value = ''
			password.value = newPassword.value
			newPassword.value = ''
		}, 2500)
	})

	return {
		password,
		passwordAttrs,
		newPassword,
		newPasswordAttrs,
		errors,
		meta,
		isSubmitting,
		messageRef,
		isSuccess,
		updatePassword,
	}
}
