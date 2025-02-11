<template>
    <v-container class="signup-container">
      <v-card class="signup-card" elevation="10">
        <v-card-title class="signup-title">Create Your Account 🚀</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="registerUser">
            <v-text-field label="Name" v-model="name" outlined class="custom-input" required></v-text-field>
            <v-text-field label="Email" v-model="email" type="email" outlined class="custom-input" required></v-text-field>
            <v-text-field label="Password" v-model="password" type="password" outlined class="custom-input" required></v-text-field>
            <v-text-field label="Phone" v-model="phone" outlined class="custom-input" required></v-text-field>
            <v-text-field label="Address" v-model="address" outlined class="custom-input" required></v-text-field>
            <v-btn type="submit" color="primary" block class="signup-btn">Sign Up</v-btn>
          </v-form>
          <p class="login-text">
            Already have an account? <router-link to="/login" class="login-link">Login</router-link>
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
/* 🌈 Background Styling */
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #ff9a9e, #fad0c4);
  padding: 20px; /* Prevents overflow on small screens */
}

/* 📌 Signup Card */
.signup-card {
  width: 100%;
  max-width: 400px; /* Slightly reduced width */
  padding: 25px;
  border-radius: 12px;
  background: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-height: 90vh; /* Prevents form from overflowing */
  overflow-y: auto; /* Adds scroll if content exceeds height */
}

/* ✨ Title */
.signup-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #ff4081;
}

/* 🎨 Input Fields */
.custom-input {
  margin-bottom: 12px;
}

/* 🚀 Signup Button */
.signup-btn {
  margin-top: 10px;
  font-weight: bold;
  border-radius: 8px;
  text-transform: uppercase;
}

/* 📝 Login Text */
.login-text {
  margin-top: 10px;
  font-size: 0.85rem;
  color: #666;
}

/* 🔗 Login Link */
.login-link {
  color: #ff4081;
  font-weight: bold;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
