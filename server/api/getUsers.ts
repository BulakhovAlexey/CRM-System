import { getUsers } from '@/lib/appwriteSDK'

export default defineEventHandler(async(event) => {
  const users = await getUsers()
  return users.users
})