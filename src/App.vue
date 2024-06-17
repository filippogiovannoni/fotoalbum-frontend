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
      'categories': '',
      loading: false,
      featured: 0
    }
  },
  methods: {
    getPhotos(url){
    this.loading = true

    axios
    .get(url)
    .then(response => {
      console.log(response);
      this.photos = response.data.results.data
      this.loading = false

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
    this.loading = true
    this.photos = ''
      if (this.selectedCategory) {
        const filteredUrl = `${this.base_api_url + this.photos_endpoint}?category_id=${this.selectedCategory}`
        axios.get(filteredUrl)
          .then(response => {
            console.log(response);
            console.log(filteredUrl);
            this.photos = response.data.results.data;
            this.loading = false
          })
          .catch(error => {
            console.error('No photo available:', error);
          });
      }
    },

  filterByFeatured() {
  this.loading = true
  this.photos = ''
    if (this.featured) {
      const featuredUrl = `${this.base_api_url + this.photos_endpoint}?featured=${this.featured}`
      axios.get(featuredUrl)
          .then(response => {
            console.log(response);
            // console.log(featuredUrl);
            this.photos = response.data.results.data;
            this.loading = false
          })
          .catch(error => {
            console.error('No photo available:', error);
          });
    } else {
      // console.log(`${this.base_api_url + this.photos_endpoint}?featured=${this.featured}`);
      this.getPhotos(this.base_api_url + this.photos_endpoint)
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
            <div class="d-flex">
              <select class="form-select" name="selectedCategory" id="selectedCategory" v-model="selectedCategory" @change="filterByCategory()">
                  <option selected disabled>Select one</option>
                  <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
              </select>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" name="featured" id="featured" value="1" v-model="featured" @change="filterByFeatured()">
                    <label class="form-check-label" for="featured">Featured</label>
                </div>
            </div>
        </div>

        <div class="container text-center">
            <div class="loader fs-3 align-items-center" v-if="loading">
                <i class="fa-solid fa-spinner fa-spin"></i>
                <span class="d-block">Loading photos</span>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4" v-for="photo in photos" v-if="photos && photos.length >= 1">
                <div class="card mb-4">
                    <img :src="base_api_url + '/storage/' + photo.image_url" class="card-img-top" alt="Titolo della foto 1">
                    <div class="card-body">
                        <h5 class="card-title">{{ photo.title }}</h5>
                        <p class="card-text">{{ photo['category'].name }}</p>
                    </div>
                </div>
            </div>
            <div v-else-if="photos.length == 0 && loading == false">
                <div class="col">
                    <div class="mt-3 text-center fs-4">
                        <i class="fa fa-camera" aria-hidden="true"></i>
                        <h4>No Photos Available</h4>
                        <p class="fs-6">Try with a different category!</p>
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
