import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useStudentStore = defineStore("student", {
  state: () => {
    return {
      name: "Taffy",
      age: 17,
      skills: ["哭", "笑", "热水器"],
    };
  },

  getters: {
    hello: (state) => {
      return "Hello, " + state.name;
    },
  },

  actions: {
    growUp() {
      this.age++;
    },
  },
});
