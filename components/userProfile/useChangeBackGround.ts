import type { IFile } from '~/types/types'
import { storage } from '~/lib/appwrite'
import { storageID } from '~/DbConstants'
import { v4 as uuid } from 'uuid'

export function useChangeBackGround() {
	const refFiles = ref<IFile[]>([])
	const loadingFiles = ref<boolean>(true)
	const toast = useToast()

	const setLoading = (val: boolean) => {
		loadingFiles.value = val
	}

	const uploadError = (error: string) => {
		toast.add({
			title: error,
			color: 'red',
		})
	}

	const bgImage = useCookie('bgImagePath', {
		default: () => ({ bgImageID: '' }),
		watch: true,
	})

	const uploadAction = () => {
		storage
			.createFile(
				storageID,
				uuid(),
				document.getElementById('file')?.files[0] as File
			)
			.then(
				function (response) {
					if (response.$id) {
						bgImage.value.bgImageID = response.$id
					}
				},
				function (error) {
					uploadError(error)
					throw new Error(`${error} - Failed to upload File`)
				}
			)
	}

	const getFiles = () => {
		setLoading(true)
		storage.listFiles(storageID).then(
			function (response) {
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
	const setNewBg = (bgID: string) => {
		bgImage.value.bgImageID = bgID
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
		setNewBg,
		uploadAction,
		getFiles,
	}
}
