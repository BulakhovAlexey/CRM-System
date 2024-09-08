import { format } from '@formkit/tempo'
import type { IUser } from '~/types/types'

export const dateFormatter = (date: string) => {
	return format(date, { date: 'short', time: 'short' })
}

export const dateFormatterShort = (date: string) => {
	return format(date, 'DD MMMM', 'ru')
}

export const useDatePickerConfig = () => {
	const date = ref<Date>()
	const nowDate = new Date()
	const startTime = ref({ hours: 20, minutes: 0 })

	const format = (date: Date) => {
		const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
		const month =
			date.getMonth() + 1 < 10
				? '0' + (date.getMonth() + 1)
				: date.getMonth() + 1
		const year = date.getFullYear()
		if (nowDate.getHours() == date.getHours()) date.setHours(20)
		if (nowDate.getMinutes() == date.getMinutes()) date.setMinutes(0)
		const minutes =
			date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

		const hours = date.getHours()
		return `${day}.${month}.${year} ${hours}:${minutes}`
	}
	return {
		format,
	}
}
