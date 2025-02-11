<template>
  <v-container class="add-memory-container">
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5 add-memory-card">
          <v-card-title class="title-text">📝 Add a New Memory</v-card-title>
          <v-divider></v-divider>

          <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
            <!-- Title Input -->
            <v-text-field
              label="Title"
              v-model="post.title"
              prepend-icon="mdi-note"
              :rules="rules"
              class="custom-input"
            ></v-text-field>

            <!-- Category Input -->
            <v-text-field
              label="Category"
              v-model="post.category"
              prepend-icon="mdi-view-list"
              :rules="rules"
              class="custom-input"
            ></v-text-field>

            <!-- Content Input -->
            <v-textarea
              label="Write your memory here..."
              v-model="post.content"
              prepend-icon="mdi-note-plus"
              :rules="rules"
              class="custom-input"
            ></v-textarea>

            <!-- File Upload -->
            <v-file-input
              @change="selectFile"
              :rules="rules"
              show-size
              counter
              multiple
              label="📸 Upload an Image"
              class="custom-file-input"
            ></v-file-input>

            <!-- Submit Button -->
            <v-btn type="submit" class="mt-3 custom-btn" color="primary">✨ Add Memory</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from '../api';

export default {
  data() {
    return {
      rules: [(value) => !!value || "This field is required"],
      post: {
        title: "",
        category: "",
        content: "",
        image: "",
      },
      image: "",
    };
  },
  methods: {
    selectFile(file) {
      this.image = file[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("title", this.post.title);
      formData.append("category", this.post.category);
      formData.append("content", this.post.content);

      if (this.$refs.form.validate()) {
        const response = await API.addPost(formData);
        this.$router.push({ name: "home", params: { message: response.message } });
      }
    },
  },
};
</script>

<style scoped>
/* 🌈 Background */
.add-memory-container {
  background: linear-gradient(to right, #ffafbd, #ffc3a0);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 📌 Card Styling */
.add-memory-card {
  background: white;
  border-radius: 15px;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.add-memory-card:hover {
  transform: translateY(-5px);
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
}

/* ✨ Title Styling */
.title-text {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  color: #3f51b5;
}

/* 🎨 Input Styling */
.custom-input {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
}

.custom-file-input {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
}

/* 🚀 Submit Button */
.custom-btn {
  width: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
}

.custom-btn:hover {
  background-color: #3f51b5 !important;
  color: white !important;
}
</style>
