
import { defineStore } from "pinia";

export const useStadiumStore = defineStore("stadium", {
  state: () => ({
    current: null,  
  }),
  actions: {
    setStadium(stadium) {
      this.current = stadium;
    },
    clearStadium() {
      this.current = null;
    }
  },
});
