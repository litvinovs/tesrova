// server/api/list.get.js
import List  from '../models/listModel'
export default defineEventHandler(async (event) => {
	
	let elements = await List.find({})
	
	return {elements: elements}
})
