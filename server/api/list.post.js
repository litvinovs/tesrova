
// server/api/list.post.js
import List  from '~/server/dbModels/listModel'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const text = body.text
	let doc = await List.create({text: text})
	return {id: doc._id, text: text}
})