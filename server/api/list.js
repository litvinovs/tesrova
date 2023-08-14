// server/api/list.js
import {defineEventHandler} from 'h3'
import List from '../models/listModel'

export default defineEventHandler(async (event) => {
	const {method, body} = event
	
	switch (method) {
		case 'POST': {
			let text = body.text
			
			let doc = await List.create({text: text})
			
			return {id: doc._id, text: text}
		}
		case 'GET': {
			console.log('get list')
			let elements = await List.find({})
			return {elements: elements}
		}
		case 'PUT': {
			console.log(body)
			const id = body.id
			const text = body.text
			console.log(id, text)
			await List.updateOne({_id: id}, {text: text}).exec()
			return 'ok'
		}
		case 'DELETE': {
			const id = body.id
			await List.deleteOne({_id: id}).exec()
			return
		}
		default:
			return {status: 405, message: 'Method Not Allowed'}
	}
})
