import { useMutation } from "@tanstack/vue-query";
import { account } from "~/lib/appwrite";
import { useForm, useResetForm } from 'vee-validate'
import { loginSchema } from '@/lib/schema.validate'
import { useAuthStore } from '@/stores/auth.store'

export function useChangeEmail() {

const { errors, meta, values, defineField, setFieldValue, handleSubmit, isSubmitting } = useForm({
  validationSchema: loginSchema.pick(['email', 'password'])
})

const store = useAuthStore()
const successMesRef = ref<string>('')
const errorMesRef = ref<string>('')
const isSuccess = ref<boolean>(false)

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

setFieldValue('email', store.getEmail)

const { mutate } = useMutation({
  mutationKey: ['update_email'],
  mutationFn: () => account.updateEmail(email.value, password.value),
  onSuccess: () => {
    errorMesRef.value = ''
    successMesRef.value = 'Email успешно изменен'
    isSuccess.value = true
    store.setEmail(email.value)
    password.value = ''
    setTimeout(() => {
      successMesRef.value = ''
    }, 2000);
  },
  onError(error) {
      errorMesRef.value = error.message
  },
})

const updateEmail = handleSubmit(async (values) => {
  mutate()
});

return{
    email,
    emailAttrs,
    password,
    passwordAttrs,
    errors,
    meta,
    isSubmitting,
    successMesRef,
    errorMesRef,
    isSuccess,
    updateEmail
  }
}