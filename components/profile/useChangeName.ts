import { useMutation } from "@tanstack/vue-query";
import { account } from "~/lib/appwrite";
import { useForm } from 'vee-validate'
import { loginSchema } from '@/lib/schema.validate'
import { useAuthStore } from '@/stores/auth.store'

export function useChangeName() {

const { errors, meta, values, defineField, setFieldValue, handleSubmit, isSubmitting } = useForm({
  validationSchema: loginSchema.pick(['name'])
  //validationSchema: loginSchema
})

const store = useAuthStore()
const successMesRef = ref<string>('')

const [name, nameAttrs] = defineField('name');

setFieldValue('name', store.getName)

const { mutate } = useMutation({
  mutationKey: ['update_name'],
  mutationFn: () => account.updateName(name.value),
  onSuccess: () => {
    successMesRef.value = 'Имя успешно изменено'
    setTimeout(() => {
      successMesRef.value = ''
    }, 2000);
  }
})

const updateName = handleSubmit(async (values) => {
  mutate()
  store.setName(name.value)
});

return{
    name,
    nameAttrs,
    errors,
    meta,
    isSubmitting,
    successMesRef,
    updateName
  }
}