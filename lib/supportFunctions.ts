import { format } from '@formkit/tempo'


export const dateFormatter = (date:string) => {
  return format(date, {date: 'short', time: 'short'})
}