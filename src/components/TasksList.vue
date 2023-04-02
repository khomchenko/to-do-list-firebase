<template>
  <div class="tasks">
    <h2>Список задач</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Description</th>
          <th width="100px">Edit</th>
          <th width="100px">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, description, completed } in tasks" :key="id">
          <td
            :class="[{ completed: completed }]"
            style="cursor: pointer"
            @click="updateTaskCompletion(id)"
          >
            {{ description }}
          </td>
          <td>
            <router-link :to="`/edit?id=${id}`" class="btn btn-primary">
              Edit
            </router-link>
          </td>
          <td>
            <button class="btn btn-danger" @click="deleteTask(id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { db } from "@/firebase";
import { ref } from "vue";

interface Task {
  id: string;
  description: string;
  completed: boolean;
  creationTime: number;
}

const tasksCollection = db.collection("tasks");
const tasks = ref<Task[]>([]);

const getTasks = tasksCollection
  .orderBy("creationTime", "asc")
  .onSnapshot((snapshot) => {
    tasks.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
  });

getTasks;

const deleteTask = (taskID: string | undefined): void => {
  tasksCollection
    .doc(taskID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        doc.ref
          .delete()
          .then(() => {
            console.log("Deleted successfully!");
          })
          .catch((error: Error) => {
            console.log("Deletion unsuccessful:", error);
          });
      } else {
        console.log("No result!");
      }
    })
    .catch((error: Error) => {
      console.log("Error getting document:", error);
    });
};

const updateTaskCompletion = (taskID: string | undefined): void => {
  tasksCollection
    .doc(taskID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        doc.ref
          .update({
            completed: !doc.data()?.completed,
          })
          .then(() => {
            console.log("Completion task updated!");
          })
          .catch((error: Error) => {
            console.log("Error updating completion:", error);
          });
      } else {
        console.log("No result!");
      }
    })
    .catch((error: Error) => {
      console.log("Error getting document:", error);
    });
};
</script>

<style lang="scss">
.completed {
  text-decoration: line-through;
}
</style>
