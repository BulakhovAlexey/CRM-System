<script lang="ts" setup>
import { useSelectedGroupStore } from '~/stores/groups.store';
import { useGroupEditForm } from './useGroupEditForm';
import { defineProps } from 'vue';
import { text } from './group.lang';

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  completeFields: {
    type: Boolean,
    required: true
  }
})

const groupStore = useSelectedGroupStore()
const selectedGroup = groupStore.getGroup
const emit = defineEmits(['isSuccess'])

const { successRef, meta, company, companyAttrs, description, descriptionAttrs, link, linkAttrs, errors, isSubmitting, edit, addNew } = useGroupEditForm(selectedGroup, props.completeFields)

watch(successRef, () => {
  if(successRef.value === true){
    emit('isSuccess', true)
  }
})

let btnText = props.type === 'edit' ? text.btn.update : props.type === 'addNew' ? text.btn.create : ''

function handleSubmit(event: Event) {
  if (props.type === 'edit') {
    edit(event);
  } else if (props.type === 'addNew') {
    addNew(event);
  } else {
    console.error('Invalid type:', props.type);
  }
}
</script>

<template>
  <UForm :state="{}" @submit="handleSubmit" class="text-qwe-50">
    <UFormGroup required :label="text.labels.name" name="company">
      <UInput v-model="company" immediate v-bind="companyAttrs" type="text" />
      <UIAppearMessage :condition="errors.company !== undefined && errors.company.length > 0" :message="errors.company"/>
    </UFormGroup>
    <UFormGroup :label="text.labels.description" name="description">
      <UTextarea :maxrows="10" autoresize v-model="description" v-bind="descriptionAttrs" type="textarea" />
    </UFormGroup>
    <UFormGroup required :label="text.labels.link" name="link">
      <UInput v-model="link" v-bind="linkAttrs" type="text" />
      <UIAppearMessage :condition="errors.link !== undefined && errors.link.length > 0" :message="errors.link"/>
    </UFormGroup>
    <UButton :disabled="!meta.touched" :loading="isSubmitting" type="submit" class="w-1/4 justify-center mx-auto">{{ btnText }}</UButton>
  </UForm>
</template>

