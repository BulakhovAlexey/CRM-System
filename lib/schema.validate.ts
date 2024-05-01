import * as yup from 'yup'


export const loginSchema = yup.object({
  email: yup.string().required('Обязательное поле').email('Введите валидный email'),
  password: yup.string().min(8, "Не менее 8 символов").max(15, "Серьезно?! Не более 15!!").required('Обязательное поле'),
  name: yup.string().required('Обязательное поле'),
});

export const groupSchema = yup.object({
  company: yup.string().required('Обязательное поле'),
  link: yup.string().required('Обязательное поле')
});

