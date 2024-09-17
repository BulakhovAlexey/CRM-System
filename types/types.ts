export interface IBaseFields {
	$id: string
	$createdAt: string
}

export interface IGroup extends IBaseFields {
	name: string
	description: string
	project_link: string
	tasks: ITask[]
}

export interface ITask extends IBaseFields {
	task_name: string
	description: string
	groups: IGroup
	start_date: string
	end_date: string
	executor: string
	owner: string
	comments?: IComment[]
	status: EnumStatus
	isImportant: boolean
}

export interface IComment extends IBaseFields {
	text: string
	author: string
	tasks: ITask
	taskResult: boolean
}

export interface IUser extends IBaseFields {
	email: string
	name: string
	labels: string[] | string
	status: boolean
}

export interface IUserCell extends IUser {
	accessedAt: string
}

export enum EnumRole {
	'PM' = 'PM',
	'QA' = 'QA',
	'Developer' = 'Developer',
	'Designer' = 'Designer',
}

export enum EnumStatus {
	'in_process' = 'делаю',
	'control' = 'контроль',
	'done' = 'завершена',
}

export const roles = [
	{
		id: EnumRole.Developer,
		role: 'Developer',
	},
	{
		id: EnumRole.QA,
		role: 'QA',
	},
	{
		id: EnumRole.PM,
		role: 'PM',
	},
	{
		id: EnumRole.Designer,
		role: 'Designer',
	},
]

export enum EnumColumnsCode {
	'overdue' = 'overdue',
	'today' = 'today',
	'this_week' = 'this_week',
	'next_week' = 'next_week',
}

export interface IColumnTask {
	id: EnumColumnsCode
	label: string
	color: string
	items: ITask[]
}

export interface Executor {
	id: string
	label: string
}

export interface ITableColumn {
	key: string
	label?: string
	sortable?: boolean
}

export interface IFile {
	$id: string
	path: string
}
