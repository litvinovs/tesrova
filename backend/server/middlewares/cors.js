// server/middleware/cors.js
export default defineEventHandler(
	(event) => {
		event.node.res.setHeader('Access-Control-Allow-Origin', 'https://todoska.netlify.app')
	}
)
