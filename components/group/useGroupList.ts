import { DB } from '~/lib/appwrite'
import { DB_ID, COLLECTION_GROUPS } from '~/DbConstants'
import { useQuery } from '@tanstack/vue-query'
import type { Executor, IGroup } from '~/types/types'

export function useGroupList() {
	const getGroupsList = function () {
		return useQuery({
			queryKey: ['groups_list'],
			queryFn: () => DB.listDocuments(DB_ID, COLLECTION_GROUPS),
			// select(data) {
			//   return data.documents as unknown as IGroup[]
			// },
		})
	}

	const getGroupsListSelector = function () {
		return useQuery({
			queryKey: ['groups_list'],
			queryFn: () => DB.listDocuments(DB_ID, COLLECTION_GROUPS),
			select(data) {
				const groups: Executor[] = []
				data.documents.forEach(el => {
					const item: Executor = {
						id: el.$id,
						label: el.name,
					}
					groups.push(item)
				})
				return groups
			},
		})
	}

	return {
		getGroupsList,
		getGroupsListSelector,
	}
}
