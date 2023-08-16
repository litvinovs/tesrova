<template>
  <button @click="add()">Add Element</button>
  <ul>
    <Element v-for="(element, index) in elements"
             :key="element._id"
             :element="element"
             :index="index"
             @modify="modify"
             @remove="remove"
    />
  </ul>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import Element from "@/components/Element.vue";
import api from "@/api/api";
import axios from "axios";


interface Element {
  text: string,
  _id: number
}

const elements = ref<Element[]>([])
const url = "http://localhost:3000/" /*import.meta.env.VITE_APP_API_URL*/

// const add = () => {
//   const text = `Element ${elements.value.length + 1}`

const add = async () => {
  const text = `Element ${elements.value.length + 1}`

  const response = await $fetch('/api/list', {
    method: 'POST',
    body: {text: text}
  })

  if (response) {
    console.log(response)
    // Получаем данные из ответа
    const data = await response
    // Добавляем новый элемент в массив
    elements.value.push({
      text: data.text,
      _id: data._id,
    })
  } else {
    // Обрабатываем ошибку
    console.log(response)
  }
}


// Удаляем элемент из списка с помощью метода DELETE
const remove = async (params: { id: number }) => {
  const id = params.id
  // Фильтруем массив, убирая элемент с заданным id
  elements.value = elements.value.filter(element => element._id !== id)
  // Используем $fetch для удаления данных с сервера
  await $fetch('/api/list', {
    method: 'DELETE',
    body: { id: id }
  })
}

// Изменяем элемент в списке с помощью метода PUT
const modify = async (params: { id: number, value: string }) => {
  const {id, value} = params
  // Выводим id и value в консоль
  console.log(id, value)
  // Обновляем массив, заменяя текст элемента с заданным id
  elements.value = elements.value.map(element => {
    if (element._id === id) {
      element.text = value
    }
    return element
  });
  // Используем $fetch для изменения данных на сервере
  await $fetch('/api/list', {
    method: 'PUT',
    body: {
      text: value,
      id: id
    }
  })
}

onMounted(async () => {
  // Импортируем useFetch из Nuxt Composables
  import { useFetch } from '#app'

  // Используем useFetch для запроса данных с сервера или клиента
  const { data: elements, error, pending, refresh } = await useFetch('/api/list', {
    method: 'GET',
    body: upload
  })

  // Проверяем, что ответ успешный
  if (error) {
    // Обрабатываем ошибку
    console.log(error)
  } else {
    // Преобразуем массив элементов в нужный формат
    elements.value = elements.value.map((element: { _id: string, text: string }) =>
        ({_id: element._id, text: element.text}))
  }
})

</script>


<style scoped>

</style>