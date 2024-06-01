import type { ITableColumn } from "~/types/types"

export const columns: ITableColumn[] = [
    {
      key: 'name',
      label: "Проект",
      sortable: true
    },
    {
      key: 'project_link',
      label: "Ссылка на проект",
    },
    {
      key: 'actions'
    }
  ]
