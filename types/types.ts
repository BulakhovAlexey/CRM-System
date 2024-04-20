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

export interface IUser {
  email: string,
  name: string,
  labels?: string[],
  status: boolean
}