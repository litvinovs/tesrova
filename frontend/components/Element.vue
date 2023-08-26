<template>
  <li>
    <span v-if="!input">{{ element.text }}</span>
    <input v-else
           type="text"
           :value="element.text"
           @blur="modify($event)"
           ref="refInput"
    />

    <button @click="remove()">Remove</button>
    <button @click="input=true">Modify</button>
  </li>
</template>

<script setup lang="ts">
import {ref, onUpdated} from "vue";

// Определяем типы свойств, которые принимает компонент
interface Props {
  element: {
    text: string,
    _id: number
  }
}

interface Emit {
  (e: 'remove', payload: { id: number }): void

  (e: 'modify', payload: { id: number, value: string }): void
}

const props = defineProps<Props>()
const input = ref<boolean>(false)
const refInput = ref<HTMLInputElement | null>(null)
const emit = defineEmits<Emit>()

const remove: () => void = () => {
  emit('remove', {id: props.element._id})
}

const modify = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  input.value = false

  emit('modify', {id: props.element._id, value: value})
}

onUpdated(() => {
  if (refInput.value) {
    refInput.value?.focus()

    console.log(refInput.value?.value)
  }
})
</script>

<style>
li {
  margin-top: 10px;
}

ul button {
  margin-left: 10px;
}
</style>