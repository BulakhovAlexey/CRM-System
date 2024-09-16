import type { IFile } from '~/types/types'
import { storage } from '~/lib/appwrite'
import { storageID } from '~/DbConstants'
import { v4 as uuid } from 'uuid'

export function useChangeBackGround() {
	const refFiles = ref<IFile[]>([])
	const loadingFiles = ref<boolean>(true)
	const toast = useToast()
	const uploadOwn = ref<boolean>(false)
	const fileInput = ref<HTMLInputElement | null>(null)

	const setLoading = (val: boolean) => {
		loadingFiles.value = val
	}

	const uploadError = (error: string) => {
		toast.add({
			title: error,
			color: 'red',
		})
	}

	const bgImage = inject('bgImage') as Ref<string>

	const bgImageCookie = useCookie<string | undefined>('bgImagePath', {
		maxAge: 1500000,
	})

	const getFiles = () => {
		setLoading(true)
		storage.listFiles(storageID).then(
			function (response) {
				refFiles.value = []
				response.files.forEach(element => {
					const itemFile = storage.getFileView(storageID, element.$id)
					const el: IFile = {
						$id: element.$id,
						path: itemFile.href,
					}
					refFiles.value.push(el)
				})
				setLoading(false)
			},
			function (error) {
				uploadError(error)
				setLoading(false)
				throw new Error(`${error} - Failed to upload file`)
			}
		)
	}

	const uploadAction = () => {
		storage
			.createFile(storageID, uuid(), fileInput?.value?.files?.[0] as File)
			.then(
				function (response) {
					if (response.$id) {
						bgImage.value = response.$id
						bgImageCookie.value = response.$id
						getFiles()
						uploadOwn.value = !uploadOwn.value
					}
				},
				function (error) {
					uploadError(error)
					throw new Error(`Failed to upload File - ${error}`)
				}
			)
	}

	const setNewBg = (bgID: string) => {
		bgImage.value = bgID
		bgImageCookie.value = bgID
		getFiles()
		toast.add({
			title: 'Фон успешно обновлен!',
			icon: '',
		})
	}

	return {
		refFiles,
		loadingFiles,
		bgImage,
		fileInput,
		setNewBg,
		uploadAction,
		getFiles,
		uploadOwn,
	}
}
