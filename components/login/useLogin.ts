import { useForm, configure } from 'vee-validate'
import { loginSchema } from './schema.validate'
import { account } from '~/lib/appwrite';
import { useAuthStore } from '@/stores/auth.store'
import { v4 as uuid } from 'uuid'
import type { IUser } from '~/types/types';

export function useLogin() {

  const store = useAuthStore()
  const router = useRouter()

  const { errors, meta, values, defineField, handleSubmit, isSubmitting } = useForm({
    validationSchema: loginSchema,
  })
  
  const [email, emailAttrs] = defineField('email');
  const [password, passwordAttrs] = defineField('password');
  const [name, nameAttrs] = defineField('name');
  const errorMessage = ref<string>('')
  
  const login = handleSubmit(async values => {
    errorMessage.value = ''
    try {
      await account.createEmailPasswordSession(values.email, values.password);
      const result = await account.get()
      if (result){
        store.set({
          email: result.email,
          name: result.name,
          status: result.status,
          labels: [...result.labels]
        } as IUser)
        email.value = ''
        password.value = ''
        router.push('/')
      }
    } catch (error) {
      errorMessage.value = 'Неверный логин или пароль!!'
      console.error('Error occurred:', error);
    }
  })
  const register = handleSubmit(async values => {
    await account.create(uuid(), values.email, values.password, values.name)
    login()
  })

  return{
    email,
    emailAttrs,
    password,
    passwordAttrs,
    name,
    nameAttrs,
    login,
    register,
    isSubmitting,
    errors,
    meta,
    errorMessage
  }
}



