<template>
  <v-app :dark="darkMode">
    <!-- Show Navigation Bar & Sidebar only if user is logged in -->
    <template v-if="isAuthenticated">
      <!-- Navigation Bar (App Bar) -->
      <v-app-bar app class="custom-app-bar">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>

        <!-- App Title -->
        <v-app-bar-title class="app-title">
          ✨ Echoes & Moments ✨
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <!-- Dark Mode Toggle -->
        <v-btn icon @click="toggleDarkMode">
          <v-icon>{{ darkMode ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
        </v-btn>
      </v-app-bar>

      <!-- Sidebar / Navigation Drawer -->
      <v-navigation-drawer v-model="drawer" app class="custom-drawer">
        <v-list>
          <v-list-item class="sidebar-title-container">
            <v-list-item-content>
              <v-list-item-title class="sidebar-title">
                📜 Whispers of the Past
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>

          <!-- Sidebar Items -->
          <v-list dense>
            <v-list-item 
              v-for="(item, i) in items" 
              :key="i" 
              :to="item.link" 
              link
              @click="onItemClick(item)"
              class="pointer sidebar-item"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <!-- Logout Button -->
          <v-list-item @click="logout" class="pointer logout-item">
            <v-list-item-icon>
              <v-icon color="red">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="logout-text">Logout 🚪</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </template>

    <!-- Main Content (Only Login Page if not authenticated) -->
    <v-main class="main-content">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false, // Sidebar default closed
      darkMode: false, // Default theme
      isAuthenticated: !!localStorage.getItem("token"), // Initial auth state
      items: [
        { title: "Home 🏠", icon: "mdi-home", link: "/" },
        { title: "Add Memory 📸", icon: "mdi-note-plus", link: "/add-post" },
        { title: "About ℹ️", icon: "mdi-help-box", link: "/about" },
      ],
    };
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
    onItemClick(item) {
      console.log("Item clicked:", item.title);
    },
    logout() {
      localStorage.removeItem("token"); // Remove the auth token
      this.isAuthenticated = false; // Update UI state
      this.$router.push("/login"); // Redirect to login page
    },
    checkAuth() {
      this.isAuthenticated = !!localStorage.getItem("token"); // Refresh auth state
    },
  },
  created() {
    this.checkAuth(); // Ensure auth status is set on page load
  },
  watch: {
    "$route"(to) {
      this.checkAuth(); // Update auth status when route changes
    },
  },
};
</script>

<style scoped>
/* 🌈 Navigation Bar Styling */
.custom-app-bar {
  background: white;
  color: #ff4081;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

/* ✨ App Title */
.app-title {
  font-weight: bold;
  font-size: 1.4rem;
  color: #ff4081;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 🎨 Sidebar Styling */
.custom-drawer {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding-top: 10px;
}

/* 📜 Sidebar Title */
.sidebar-title-container {
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 8px 12px;
}

.sidebar-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ff4081;
  white-space: nowrap;
}

/* 🚀 Sidebar Items */
.sidebar-item {
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
}

.sidebar-item:hover {
  background: #ffebee;
  transform: scale(1.05);
}

/* 📌 Main Content */
.main-content {
  background: linear-gradient(to right, #ffe4e1, #ffe4b5);
  min-height: 100vh;
}

/* 🎭 Dark Mode */
.dark-mode {
  background: #121212 !important;
  color: white !important;
}

.pointer {
  cursor: pointer;
}

/* 🔴 Logout Button */
.logout-item {
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
  margin-top: 20px;
}

.logout-item:hover {
  background: #ffebee;
  transform: scale(1.05);
}

.logout-text {
  color: red;
  font-weight: bold;
}
</style>
