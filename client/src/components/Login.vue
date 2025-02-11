<template>
    <v-container>
      <v-card class="pa-5" max-width="400" elevation="5">
        <v-card-title>Login</v-card-title>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
          <v-btn type="submit" color="primary">Login</v-btn>
        </v-form>
        <p class="mt-2">Don't have an account? <router-link to="/signup">Sign up</router-link></p>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      async login() {
        try {
            const response = await this.$axios.post("http://localhost:5000/api/v1/auth/login", 
                {
            email: this.email,
            password: this.password,
          });
          console.log("Login Response:", response.data); // Debugging
    localStorage.setItem("token", response.data.token);
    this.$router.push("/");
        } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error.message);
          alert("Login failed");
        }
      },
    },
  };
  </script>
  