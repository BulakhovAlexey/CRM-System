<script setup lang="ts">

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
const commentText = ref<string>('')
const isEmptyComment = ref<boolean>(false)
const emit = defineEmits(['addComment'])

const addComment = () => {
  isEmptyComment.value = false
  if(commentText.value.length !== 0){
    emit('addComment', commentText.value)
    commentText.value = ''
  } else {
    isEmptyComment.value = true
  }
}

</script>

<template>
  <div class="create-comment flex flex-col gap-5 mt-7">
    <div class="create-comment__textarea">
      <UTextarea placeholder="Комментарий.." v-model="commentText" :rows="2" :autofocus="false" />
    </div>
    <UIAppearMessage :message="'устой комментарий!!'" :condition="isEmptyComment" />
    <div class="create-comment__button flex justify-end">
      <UButton :loading="props.loading" @click="addComment">Добавить комментарий</UButton>
    </div>
  </div>
  
</template>

<style scoped>

</style>