// /store/user.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    router: useRouter()
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    // Hacer sign in
    async signIn (email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
      this.router.push({ path: "/" });
    },
    
    // Hacer log out
    async logOut () {
      const res = await supabase.auth.signOut();
      this.router.push({ path: "/auth" });
    },

    persist: { 
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});
