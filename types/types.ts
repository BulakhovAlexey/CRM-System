export interface IBaseFields {
  $id: string,
  $createdAt: string
}

export interface IGroup extends IBaseFields {
  name: string,
  description: string,
  project_link: string,
  tasks: ITask[]
}

export interface ITask extends IBaseFields{
  task_name: string,
  description: string
}

export interface IUser extends IBaseFields{
  email: string,
  name: string,
  labels: string[] | string,
  status: boolean
}

export interface IUserCell extends IUser{
  accessedAt: string
}

export enum EnumRole {
  'PM' = 'PM',
  'QA' = 'QA',
  'Developer' = 'Developer',
  'Designer' = 'Designer',
}

export const roles = [{
  id: EnumRole.Developer,
  role: 'Developer'
}, {
  id: EnumRole.QA,
  role: 'QA'
}, {
  id: EnumRole.PM,
  role: 'PM'
}, {
  id: EnumRole.Designer,
  role: 'Designer'
}]