// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks; 
    },
    // Hacer POST
    async post(taskData) {
      console.log(taskData)
      const { error } = await supabase.from('tasks').insert(taskData);
      if (error) throw error;
      this.fetchTasks();
    },

    // Hacer el PUT (edit)
    async put(taskData, taskId) {
      const { error } = await supabase
        .from('tasks')
        .update(taskData)
        .eq('id', taskId);
      if (error) throw error;
      this.fetchTasks();
    },

    // Hacer el delete
    async delete(taskId) {
      const { error } = await supabase.from('tasks').delete().eq('id', taskId);
      if (error) throw error;
      this.fetchTasks();
    },
    // Hacer el PUT (cambiar entre completada y pendiente)
    async taskIsComplete (taskId, isItComplete) {
      const { error } = await supabase
        .from('tasks')
        .update({'is_complete': isItComplete})
        .eq('id', taskId);
      if (error) throw error;
      this.fetchTasks();
    }
  },
});