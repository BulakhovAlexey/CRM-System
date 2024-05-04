import { EnumColumnsCode } from "~/types/types"

export const taskColumns = [
  {
    id: EnumColumnsCode.overdue,
    label: 'Просроченные',
    color: 'red',
    items: []
  },
  {
    id: EnumColumnsCode.today,
    label: 'На сегодня',
    color: 'green',
    items: []
  },
  {
    id: EnumColumnsCode.tomorrow,
    label: 'На завтра',
    color: 'blue600',
    items: []
  },
  {
    id: EnumColumnsCode.nextWeek,
    label: 'Следующая неделя',
    color: 'blue400',
    items: []
  },
]