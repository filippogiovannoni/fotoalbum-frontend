<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      base_api_url: 'http://127.0.0.1:8000',
      photos_endpoint: '/api/photos',
      categories_endpoint: '/api/categories',
      selectedCategory: 'Select one',
      'photos': '',
      'categories': ''
    }
  },
  methods: {
    getPhotos(url){

    axios
    .get(url)
    .then(response => {
      console.log(response);
      this.photos = response.data.results.data
      

    })
    .catch(error => {
      console.error(error)
    })
    
  },

  getCategories(url) {
    axios
    .get(url)
    .then(response => {
      this.categories = response.data.results
      

    })
    .catch(error => {
      console.error(error)
    })
  },

  filterByCategory() {
      if (this.selectedCategory) {
        const filteredUrl = `${this.base_api_url + this.photos_endpoint}?category_id=${this.selectedCategory}`
        axios.get(filteredUrl)
          .then(response => {
            console.log(response);
            console.log(filteredUrl);
            this.photos = response.data.results.data;
          })
          .catch(error => {
            console.error('No photo available:', error);
          });
      }
    }
},
mounted() {
  const photosUrl = this.base_api_url + this.photos_endpoint
  const categoriesUrl = this.base_api_url + this.categories_endpoint

  this.getPhotos(photosUrl)
  this.getCategories(categoriesUrl)


  }
}
</script>

<template>

<div class="container mt-5">

    <h1 class="text-center mb-4">Photo Gallery</h1>

    <div class="mb-3">
      <label class="form-label">Filter by category</label>
      <select class="form-select" name="selectedCategory" id="selectedCategory" v-model="selectedCategory" @change="filterByCategory()">
        <option selected disabled>Select one</option>
        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
      </select>
    </div>

    

    <div class="row">
      <div class="col-md-4" v-for="photo in photos">
        <div class="card mb-4">
          <img :src="base_api_url + '/storage/' + photo.image_url" class="card-img-top" alt="Titolo della foto 1">
          <div class="card-body">
            <h5 class="card-title">{{ photo.title }}</h5>
            <p class="card-text">{{ photo['category'].name }}</p>
          </div>
        </div>
      </div>

    </div>

</div>
</template>

<style>
body {
      background-color: #f8f9fa;
    }
    .card img {
      height: 200px;
      object-fit: cover;
    }
</style>
