
// server/api/list.post.js
import List  from '../models/listModel'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	
	console.log(body.text)
	
	const text = body.text
	
	let doc = await List.create({text: text})
	
	return {id: doc._id, text: text}
})

import { onMounted, useFetch, mapProps, useError } from "@nuxtjs/composition-api";

// onMounted(async () => {
// 	// Используем useFetch для запроса данных
// 	const { data, fetchState } = useFetch("/api/list", {
// 		method: "GET",
// 	});
//
// 	// Используем useError для отображения ошибки
// 	const { error } = useError();
//
// 	// Проверяем, что ответ успешный
// 	if (fetchState.pending) {
// 		// Ожидаем загрузки данных
// 		console.log("Загрузка данных...");
// 	} else if (fetchState.error) {
// 		// Обрабатываем ошибку
// 		error.value = fetchState.error;
// 	} else {
// 		// Преобразуем массив элементов в нужный формат с помощью mapProps
// 		elements.value = mapProps(["_id", "text"], data.value.elements);
// 	}
// });
//


// <script setup lang="ts">
// 	// Импортируем useFetch из Nuxt Composables
// 	import { useFetch } from '#app'
//
// 	// Используем useFetch для запроса данных с сервера или клиента
// 	const { data: elements, error, pending, refresh } = await useFetch('/api/list', {
// 	method: 'GET'
// })
//
// 	// Проверяем, что ответ успешный
// 	if (error) {
// 	// Обрабатываем ошибку
// 	console.log(error)
// } else {
// 	// Преобразуем массив элементов в нужный формат
// 	elements.value = elements.value.map((element: { _id: string, text: string }) =>
// 		({_id: element._id, text: element.text}))
// }
// </script>

