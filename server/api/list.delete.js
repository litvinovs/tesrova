// server/api/list.get.js
import List from '~/server/dbModels/listModel'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	
	const id = body.id
	
	await List.deleteOne({_id: id}).exec()
	return 'ok'
})
