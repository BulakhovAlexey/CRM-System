import { EnumColumnsCode } from '~/types/types'

export const taskColumns = [
	{
		id: EnumColumnsCode.overdue,
		label: 'Просроченные',
		color: 'red',
		items: [],
	},
	{
		id: EnumColumnsCode.today,
		label: 'На сегодня',
		color: 'green',
		items: [],
	},
	{
		id: EnumColumnsCode.this_week,
		label: 'На этой неделе',
		color: 'blue600',
		items: [],
	},
	{
		id: EnumColumnsCode.next_week,
		label: 'Следующая неделя',
		color: 'blue400',
		items: [],
	},
]
