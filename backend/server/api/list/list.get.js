// server/api/list.get.js
import List  from '~/server/dbModels/listModel'
export default defineEventHandler(async (event) => {
	
	let elements = await List.find({})
	
	return {elements: elements}
})
