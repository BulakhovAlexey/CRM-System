import { setRoleToUser } from '@/lib/appwriteSDK'
import { EnumRole } from '~/types/types'

export default defineEventHandler(async(event) => {
  const body: {id:string, role: EnumRole[]} = getQuery(event)

  const response = await setRoleToUser(body.id, body.role)
  return response
})