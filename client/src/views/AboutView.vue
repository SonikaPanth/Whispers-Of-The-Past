<template>
  <v-container class="about-container">
    <v-row justify="center">
      <v-col md="8">
        <v-card class="pa-5 about-card" outlined>
          <v-card-title class="headline text-center">
            ✨ About <span class="brand-name">Echoes & Moments</span> ✨
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-4">
            <p class="text-body">
              Welcome to <strong>Echoes & Moments</strong> – a space where memories are preserved, and stories come to life. 
              Whether it’s a 🏞️ cherished moment, a 🎭 lesson learned, or an ✨ unforgettable experience, 
              we believe every memory has a story worth sharing.
            </p>
            <p class="text-body">
              Our platform allows users to 🖊️ document their thoughts, 💡 reflections, and 🎥 special moments in a way that resonates with them. 
              With features like <strong class="highlight">categorized posts, rich media support, and interactive discussions</strong>, 
              <strong>Echoes & Moments</strong> serves as a 📖 digital journal for personal and collective storytelling.
            </p>
            <p class="text-body">
              Join us in creating a timeless library of experiences, one story at a time! ⏳✨
            </p>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn color="primary" to="/" class="custom-btn"> 📜 Explore Memories </v-btn>
            <v-btn color="success" to="/add-post" class="custom-btn"> 📝 Share Your Story </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.about-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #ffecd2, #fcb69f); /* Warm gradient */
  padding: 20px;
}

.about-card {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.brand-name {
  font-weight: bold;
  color: #d32f2f; /* Red accent */
}

.text-body {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #444;
}

.highlight {
  color: #ff6f61;
  font-weight: bold;
}

.custom-btn {
  font-size: 1rem;
  padding: 8px 20px;
  font-weight: bold;
  border-radius: 8px;
}
</style>
