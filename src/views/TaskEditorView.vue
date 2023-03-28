<template>
  <div class="task-editor">
    <router-link :to="'/'" class="btn btn-primary mb-3">Back</router-link>
    <h1>Редактирование задачи</h1>
    <form @submit.prevent="updateTask">
      <div class="form-group">
        <label for="description">Описание задачи</label>
        <input
          type="text"
          v-model="description"
          class="form-control mt-3"
          id="description"
          placeholder="Напиши описание новой задачи"
          required
        />
      </div>
      <div class="form-group form-check">
        <input
          type="checkbox"
          v-model="completed"
          class="form-check-input"
          id="completion"
        />
        <label for="completion" class="form-check-label">Готово</label>
      </div>
      <div class="form-group">
        <label>Дата создания задачи: {{ creationTime }}</label>
      </div>
      <button type="submit" class="btn btn-success">Обновить</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "@/firebase";

const route = useRoute();
const router = useRouter();
const taskID = route.query.id;

const description = ref("");
const completed = ref(null);
const creationTime = ref("");

const tasksCollection = db.collection("tasks");
const getTask = tasksCollection
  .doc(taskID)
  .get()
  .then((doc) => {
    if (doc.exists) {
      description.value = doc.data()?.description;
      completed.value = doc.data()?.completed;
      creationTime.value = new Date(
        doc.data()?.creationTime
      ).toLocaleTimeString("en-US", {
        month: "long",
        year: "numeric",
        day: "numeric",
      });
    } else {
      console.log("No result!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

getTask;

const updateTask = () => {
  tasksCollection
    .doc(taskID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        doc.ref
          .update({
            description: description.value,
            completed: completed.value,
          })
          .then(() => {
            console.log("Task successfully updated!");
            router.push("/");
          })
          .catch((error) => {
            console.log("Error updating task:", error);
          });
      } else {
        console.log("No result!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};
</script>
