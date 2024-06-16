<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      base_api_url: 'http://127.0.0.1:8000',
      photos_endpoint: '/api/photos',
      'photos': ''
    }
  },
  mounted() {
    const photosUrl = this.base_api_url + this.photos_endpoint

    axios
    .get(photosUrl)
    .then(response => {
      console.log(response);
      this.photos = response.data.results.data
    })
    .catch(error => {
      console.error(error)
    })

  }
}
</script>

<template>

<div class="container mt-5">

    <h1 class="text-center mb-4">Photo Gallery</h1>

    <div class="row">
      <div class="col-md-4" v-for="photo in photos">
        <div class="card mb-4">
          <img :src="base_api_url + '/storage/' + photo.image_url" class="card-img-top" alt="Titolo della foto 1">
          <div class="card-body">
            <h5 class="card-title">{{ photo.title }}</h5>
            <p class="card-text">{{ photo.description }}</p>
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
