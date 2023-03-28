<template>
  <div class="tasks">
    <h1>Создать новую задачу</h1>
    <form @submit.prevent="createNewTask">
      <div class="form-group">
        <label for="description">Описание задачи</label>
        <input
          type="text"
          v-model="newTask.description"
          class="form-control mt-3"
          id="description"
          placeholder="Напиши описание новой задачи"
          required
        />
      </div>
      <button type="submit" class="btn btn-success my-3">Создать</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { db } from "@/firebase";

const newTask = reactive({
  creationTime: null,
  description: "",
  completed: false,
});

const tasksCollection = db.collection("tasks");

const createNewTask = () => {
  tasksCollection.add({
    ...newTask,
    creationTime: Date.now(),
  });

  newTask.description = "";
};
</script>
