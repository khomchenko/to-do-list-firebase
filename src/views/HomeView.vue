<template>
  <div class="home">
    <NewTaskForm />
    <TasksList />
  </div>
</template>

<script lang="ts" setup>
import NewTaskForm from "@/components/NewTaskForm.vue";
import TasksList from "@/components/TasksList.vue";
</script>
