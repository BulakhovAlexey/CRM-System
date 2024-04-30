import type { IGroup } from '~/types/types';
import { useGroupList } from './useGroupList'
import { useForm } from 'vee-validate'
import { useMutation } from '@tanstack/vue-query'
import { DB } from '~/lib/appwrite';
import { DB_ID, COLLECTION_GROUPS } from '~/DbConstants';
import { groupSchema } from '~/lib/schema.validate';
import { useSelectedGroupStore, addGroupSlideOver } from '@/stores/groups.store';
import { v4 as uuid } from 'uuid';


export function useGroupEditForm(data: IGroup, completeFields: boolean) {

  const { getGroupsList } = useGroupList()
  const { refetch } = getGroupsList()
  const groupStore = useSelectedGroupStore()
  const successRef = ref<boolean>(false)
  const { errors, meta, setFieldValue, defineField, handleSubmit, isSubmitting } = useForm({
    validationSchema: groupSchema,
  })

  const [company, companyAttrs] = defineField('company');
  const [description, descriptionAttrs] = defineField('description');
  const [link, linkAttrs] = defineField('link');

  if(completeFields){
    setFieldValue('company', data.name)
    setFieldValue('description', data.description)
    setFieldValue('link', data.project_link)
  }

  const clearField = (...fields: Ref<string>[]) => {
    fields.forEach(field => {
      field.value = ''
    });
  }

  const { mutate : update } = useMutation({
    mutationKey: ['update_group_info', data.$id],
    mutationFn: () => DB.updateDocument(DB_ID, COLLECTION_GROUPS, data.$id, {
      name: company.value,
      description: description.value,
      project_link: link.value
    }),
    onSuccess: () => {
      refetch()
      clearField(company, description, link)
    }
  });

  const { mutate : add } = useMutation({
    mutationKey: ['add_group'],
    mutationFn: () => DB.createDocument(DB_ID, COLLECTION_GROUPS, uuid(), {
      name: company.value,
      description: description.value,
      project_link: link.value
    }),
    onSuccess: () => {
      refetch()
    }
  });

  const edit = handleSubmit(async () => {
    update();
    groupStore.clear()
    successRef.value = true
  });

  const addNew = handleSubmit(async () => {
    add();
    successRef.value = true
  });

  return{
    company,
    companyAttrs,
    description,
    descriptionAttrs,
    link,
    linkAttrs,
    errors,
    isSubmitting,
    meta,
    edit,
    addNew,
    successRef
  }
}
