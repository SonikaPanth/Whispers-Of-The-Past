<template>
    <v-container class="home-container">
        <!-- Header Section -->
        <v-row justify="center">
            <v-col md="8" class="text-center">
                <h1 class="home-title"></h1>
                <p class="home-subtitle">
                    Relive your past, cherish the present, and create timeless stories. ✨ Share your thoughts, moments, and experiences with the world! 🌎🖊️
                </p>
            </v-col>
        </v-row>
    
        <!-- Success Alert -->
        <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">
            🎉 {{ this.$route.params.message }}
        </v-alert>
    
        <!-- Posts Section -->
        <v-row no-gutters>
            <v-col sm="4" class="pa-3" v-for="post in posts" :key="post._id">
                <v-card class="post-card pa-1" :to="{ name: 'post', params: { id: post._id } }">
                    <v-img height="250" :src="`/${post.image}`" class="post-image"> </v-img>
                    <v-btn class="ml-4 mt-3 category-btn" small outlined color="indigo">
                        📌 {{ post.category }}
                    </v-btn>
                    <v-card-title class="headline post-title">
                        {{ post.title }}
                    </v-card-title>
                    <v-card-text class="py-0 post-content">
                        <p>📝 {{ post.content.substring(0, 100) + "..." }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from '../api';

export default {
    name: 'Home',
    data() {
        return {
            posts: [],
        };
    },

    async created() {
        try {
            const response = await API.getAllPost();
            this.posts = response; // API already handles res.data
        } catch (error) {
            console.error("🚨 Error fetching posts:", error);
        }
    }
};
</script>

<style scoped>
/* 🌈 Background & Layout ❤️ */

.home-container {
    background: linear-gradient(to right, #ffafbd, #ffc3a0);
    min-height: 100vh;
    padding: 40px;
}

/* ✨ Header */

.home-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.home-subtitle {
    font-size: 1.2rem;
    color: #fff;
    font-weight: 500;
}

/* 📌 Post Cards */

.post-card {
    border-radius: 15px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    background: white;
}

.post-card:hover {
    transform: translateY(-5px);
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.2);
}

.post-image {
    border-radius: 10px 10px 0 0;
}

.post-title {
    font-size: 1.3rem;
    font-weight: bold;
    color: #3f51b5;
}

.post-content {
    font-size: 1rem;
    color: #555;
}

/* 📌 Category Button */

.category-btn {
    font-size: 0.9rem;
    font-weight: bold;
}
</style>
