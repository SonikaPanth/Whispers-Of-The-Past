<template>
    <v-container class="login-container">
      <v-card class="login-card" elevation="10">
        <v-card-title class="login-title">Welcome Back! 👋</v-card-title>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="Email" required outlined class="custom-input"></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" required outlined class="custom-input"></v-text-field>
          <v-btn type="submit" color="primary" block class="login-btn">Login</v-btn>
        </v-form>
        <p class="signup-text">
          Don't have an account? <router-link to="/signup" class="signup-link">Sign up</router-link>
        </p>
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
          const response = await this.$axios.post("http://localhost:5000/api/v1/auth/login", {
            email: this.email,
            password: this.password,
          });
          console.log("Login Response:", response.data);
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
  
  <style scoped>
  /* 🌈 Background Styling */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to right, #ff9a9e, #fad0c4);
  }
  
  /* 📌 Login Card */
  .login-card {
    width: 100%;
    max-width: 400px;
    padding: 30px;
    border-radius: 12px;
    background: white;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  /* ✨ Title */
  .login-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ff4081;
  }
  
  /* 🎨 Input Fields */
  .custom-input {
    margin-bottom: 15px;
  }
  
  /* 🚀 Login Button */
  .login-btn {
    margin-top: 10px;
    font-weight: bold;
    border-radius: 8px;
    text-transform: uppercase;
  }
  
  /* 📝 Signup Text */
  .signup-text {
    margin-top: 15px;
    font-size: 0.9rem;
    color: #666;
  }
  
  /*  Signup Link */
  .signup-link {
    color: #ff4081;
    font-weight: bold;
    text-decoration: none;
  }
  
  .signup-link:hover {
    text-decoration: underline;
  }
  </style>
  