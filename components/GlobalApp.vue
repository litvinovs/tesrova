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
const url = "https://drab-plum-dalmatian-gear.cyclic.app/" /*import.meta.env.VITE_APP_API_URL*/

const add = () => {
  const text = `Element ${elements.value.length + 1}`

  api.post("list", {text: text})
      .then(response => {
        elements.value.push({
          text: response.data.text,
          _id: response.data._id,
        })
      })
      .catch(error => {
        console.log(error)
      })
}

const remove = async (params: { id: number }) => {
  const id = params.id

  elements.value = elements.value.filter(element => element._id !== id)

  api.delete("list", {
    data: {
      id: id
    }
  })
}

const modify = (params: { id: number, value: string }) => {
  const {id, value} = params

  console.log(id, value)

  elements.value = elements.value.map(element => {
    if (element._id === id) {
      element.text = value
    }
    return element
  });

  api.put("list", {
    text: value,
    id: id
  })
}

onMounted(async () => {
  const response = await axios.get(`${url}list`)

  console.log(response.data)

  elements.value = response.data.elements.map
  ((element: { _id: string, text: string }) =>
      ({_id: element._id, text: element.text}))
})

</script>


<style scoped>

</style>