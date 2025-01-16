import { useForm } from 'vee-validate'
import { loginSchema, registerSchema } from '@/lib/schema.validate'
import { account } from '~/lib/appwrite'
import { useAuthStore } from '@/stores/auth.store'
import { v4 as uuid } from 'uuid'
import type { EnumRole, IUser } from '~/types/types'

export function useAuth(isRegister: boolean = false) {
	const isNew = ref<boolean>(false)
	const store = useAuthStore()
	const router = useRouter()
	// const roleRef = ref<EnumRole>()

	const { errors, meta, values, defineField, handleSubmit, isSubmitting } =
		useForm({
			validationSchema: isRegister ? registerSchema : loginSchema,
		})

	const [email, emailAttrs] = defineField('email')
	const [password, passwordAttrs] = defineField('password')
	const name = isRegister ? defineField('name')[0] : undefined
	const nameAttrs = isRegister ? defineField('name')[1] : undefined
	const roleRef = isRegister ? defineField('roleRef')[0] : undefined
	const roleRefAttrs = isRegister ? defineField('roleRef')[1] : undefined
	const errorMessage = ref<string>('')

	const login = handleSubmit(async values => {
		errorMessage.value = ''
		try {
			await account.createEmailPasswordSession(values.email, values.password)
			const result = await account.get()
			if (result) {
				if (isNew.value && isRegister && roleRef) {
					const response = await useFetch('/api/setRoleToUser', {
						method: 'post',
						params: { id: result.$id, role: [roleRef.value, 'user'] }, // костыль appwrite принимает только массив...(
					})
				}
				store.set({
					$id: result.$id,
					email: result.email,
					name: result.name,
					status: result.status,
					labels: isNew.value ? [roleRef || '', 'user'] : result.labels,
				} as IUser)
				email.value = ''
				password.value = ''
				router.push('/')
			}
		} catch (error) {
			errorMessage.value = 'Неверный логин или пароль!!'
			console.error('Error occurred:', error)
		}
	})
	const register = handleSubmit(async values => {
		await account.create(uuid(), values.email, values.password, values.name)
		isNew.value = true
		login()
	})

	return {
		email,
		emailAttrs,
		password,
		passwordAttrs,
		name,
		nameAttrs,
		roleRef,
		roleRefAttrs,
		login,
		register,
		isSubmitting,
		errors,
		meta,
		errorMessage,
	}
}
