<template>
    <v-container>
      <v-card class="pa-5" max-width="400" elevation="3">
        <v-card-title class="headline"> Sign Up </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="registerUser">
            <v-text-field label="Name" v-model="name" required></v-text-field>
            <v-text-field label="Email" v-model="email" type="email" required></v-text-field>
            <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
            <v-text-field label="Phone" v-model="phone" required></v-text-field>
            <v-text-field label="Address" v-model="address" required></v-text-field>
            <v-btn type="submit" color="primary" block> Sign Up </v-btn>
          </v-form>
          <p class="text-center mt-3">
            Already have an account? <router-link to="/login">Login</router-link>
          </p>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      };
    },
    methods: {
      async registerUser() {
        try {
          const userData = {
            name: this.name,
            email: this.email,
            password: this.password,
            phone: this.phone,
            address: this.address,
          };
  
          // Make API request
          const response = await axios.post("http://localhost:5000/api/v1/auth/register", userData);
  
          if (response.data.success) {
            alert("Signup successful! Redirecting to login...");
            this.$router.push("/login"); // Redirect to login page
          } else {
            alert(response.data.message || "Signup failed!");
          }
        } catch (error) {
          console.error("Signup Error:", error);
          alert("Signup failed! Please check console for details.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .v-card {
    margin: 50px auto;
    text-align: center;
  }
  </style>
  