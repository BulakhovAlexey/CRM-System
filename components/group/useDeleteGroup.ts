import { useMutation } from '@tanstack/vue-query'
import { DB } from '~/lib/appwrite';
import { DB_ID, COLLECTION_GROUPS } from '~/DbConstants';
import type { IGroup } from '~/types/types';


export function useDeleteGroup(deletePopupRef: Ref<boolean>, { refetch } : { refetch : () => void}) {

  const idRef = ref<string>('')
  const { mutate } = useMutation({
    mutationKey: ['delete_group', idRef.value],
    mutationFn: () => DB.deleteDocument(DB_ID, COLLECTION_GROUPS, idRef.value),
    onSuccess: () => {
      refetch()
    }
  });

  const deleteGroup = () => {
    mutate();
    deletePopupRef.value = false
  };

  return{
    deleteGroup,
    idRef
  }
}
