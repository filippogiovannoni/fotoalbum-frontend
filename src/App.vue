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
    getPhotos(url) {
      this.loading = true
      this.photos = ''

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
      if (this.selectedCategory) {
        const filteredUrl = `${this.base_api_url + this.photos_endpoint}?category_id=${this.selectedCategory}`
        this.getPhotos(filteredUrl);
      }
    },

    filterByFeatured() {
      if (this.featured) {
        const featuredUrl = `${this.base_api_url + this.photos_endpoint}?featured=${this.featured}`
        this.getPhotos(featuredUrl);
      } else {
        this.getPhotos(this.base_api_url + this.photos_endpoint);
      }
      console.log(`${this.base_api_url + this.photos_endpoint}?featured=${this.featured}`);
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
        <select class="form-select" name="selectedCategory" id="selectedCategory" v-model="selectedCategory"
          @change="filterByCategory()">
          <option selected disabled>Select one</option>
          <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
        </select>
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" name="featured" id="featured" value="1" v-model="featured"
            @change="filterByFeatured()">
          <label class="form-check-label" for="featured">Show Featured</label>
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
      <div class="col-md-4 px-1" v-for="photo in photos" v-if="photos && photos.length >= 1">

        <div class="photo mb-2 position-relative">
          <span v-if="photo.featured" class="badge bg-warning position-absolute top-0 start-50 translate-middle">
            Featured
          </span>
          <div class="image">
            <img style="aspect-ratio: 1; object-fit: cover;" width="100%"
              :src="base_api_url + '/storage/' + photo.image_url" alt="Immagine {{ photo.title }}">
            <div class="overlay"></div>
          </div>
          <div class="photo-info position-absolute top-50 start-50 translate-middle text-center text-white">
            <h5 class="photo-title fs-3">{{ photo.title }}</h5>
            <p class="photo-category">{{ photo.category.name }}</p>
          </div>
        </div>
      </div>

      <div v-else-if="photos.length == 0 && loading == false" class="col">
        <div class="mt-3 text-center fs-4">
          <i class="fa fa-camera" aria-hidden="true"></i>
          <h4>No Photos Available</h4>
          <p class="fs-6">Try with a different category!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: rgb(241, 238, 233);
  font-family: "Dosis", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.photo span {
  z-index: 1;
}

.photo .image {
  position: relative;
}

.photo .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  transition: background 500ms;
}

.photo-info {
  opacity: 0;
  transition: opacity 500ms;
}

.photo:hover .overlay {
  background: rgba(0, 0, 0, 0.6);
}

.photo:hover .photo-info {
  opacity: 1;
}
</style>
