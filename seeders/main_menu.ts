export interface IMenu {
	name: string
	link: string
	icon: string
}

export const MAIN_MENU: IMenu[] = [
	{
		name: 'Задачи',
		link: '/',
		icon: 'fluent:clipboard-task-list-rtl-24-filled',
	},
	{
		name: 'Группы',
		link: '/groups',
		icon: 'material-symbols:group',
	},
	{
		name: 'Пользователи',
		link: '/users',
		icon: 'majesticons:users-line',
	},
]
