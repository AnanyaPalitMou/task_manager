<template>
    <div>
      <button @click="showForm = !showForm">
        {{ showForm ? 'Hide' : 'Add Task' }}
      </button>
  
      <div v-if="showForm" class="form">
        <input v-model="newTask" placeholder="Enter task name" />
        <button @click="addTask">Add</button>
      </div>
  
      <div>
        <button @click="showCompletedOnly = !showCompletedOnly">
          {{ showCompletedOnly ? 'Show All Tasks' : 'Show Completed Only' }}
        </button>
      </div>
  
      <p v-if="filteredTasks.length === 0">No tasks available</p>
  
      <ul>
        <li v-for="(task, index) in filteredTasks" :key="index"
            :style="task.completed ? completedStyle : {}">
          {{ task.name }}
          <input type="checkbox" v-model="task.completed" @change="saveTasks" />
          <button @click="deleteTask(index)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted, computed } from 'vue'
  
  const newTask = ref('')
  const tasks = ref([])
  const showForm = ref(false)
  const showCompletedOnly = ref(false)
  
  const completedStyle = {
    backgroundColor: 'lightgreen',
    border: '1px solid red',
    padding: '5px',
    marginBottom: '5px'
  }
  
  const addTask = () => {
    if (newTask.value.trim().length < 3) {
      alert('Task name must be at least 3 characters')
      return
    }
  
    tasks.value.push({
      name: newTask.value.trim(),
      completed: false
    })
  
    newTask.value = ''
    saveTasks()
  }
  
  const deleteTask = (index) => {
    tasks.value.splice(index, 1)
    saveTasks()
  }
  
  const filteredTasks = computed(() => {
    return showCompletedOnly.value
      ? tasks.value.filter(t => t.completed)
      : tasks.value
  })
  
  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }
  
  onMounted(() => {
    const saved = localStorage.getItem('tasks')
    if (saved) {
      tasks.value = JSON.parse(saved)
    }
  })
  
  watch(tasks, saveTasks, { deep: true })
  </script>
  
  <style scoped>
  input[type="text"] {
    margin-right: 10px;
  }
  button {
    margin: 5px;
  }
  </style>
  