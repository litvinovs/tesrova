// server/api/list.get.js
import List  from '../models/listModel'
export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const id = body.id
	const text = body.text
	
	await List.updateOne({_id: id}, {text: text}).exec()
	return 'ok'
})
