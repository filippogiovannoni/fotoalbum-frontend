<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      base_api_url: 'http://127.0.0.1:8000',
      photos_endpoint: '/api/photos',
      categories_endpoint: '/api/categories',
      selectedCategory: '',
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
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">
          <div class="bg-purple p-2">
            FILIPPO GIOVANNONI Photography
          </div>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto justify-content-between">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Gallery</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <div class="container mt-5">
      <div class="row align-items-center">
        <nav class="nav d-flex justify-content-between">
          <button @click="getPhotos(this.base_api_url + this.photos_endpoint)" class="btn btn-gradient">All
            photos</button>
          <ul class="nav">
            <li class="nav-item" v-for="category in categories" :key="category.id">
              <a class="text-purple text-decoration-none px-3" href="#"
                :class="{ selected: category.id === selectedCategory }"
                @click.prevent="selectedCategory = category.id; filterByCategory()">
                {{ category.name }}
              </a>
            </li>
          </ul>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="featured" id="featured" value="1" v-model="featured"
              @change="filterByFeatured()">
            <label class="form-check-label ms-2" for="featured">Show Featured</label>
          </div>
        </nav>
      </div>
    </div>

    <!-- Photo Gallery -->
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-4 px-1" v-for="photo in photos" v-if="photos && photos.length >= 1">
          <div class="photo mb-2 position-relative">
            <span v-if="photo.featured" class="badge position-absolute top-0 start-50 translate-middle">
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

        <!-- No results -->
        <div class="col" v-else-if="photos.length == 0 && loading == false">
          <div class="mt-5 text-center fs-4">
            <i class="fa fa-camera" aria-hidden="true"></i>
            <h4>No Photos Available</h4>
            <p class="fs-6">Try with a different category!</p>
          </div>
        </div>

        <!-- Loader -->
        <div class="container text-center d-flex mt-5 justify-content-center">
          <div class="loader fs-3" v-if="loading">
            <i class="fa-solid fa-spinner fa-spin"></i>
            <span class="d-block">Loading photos</span>
          </div>
        </div>


      </div>
    </div>

  </main>

  <footer class="footer">
    <div class="container">

      <div class="contact-info">
        <p>Email: info@boolean.com</p>
        <p>Telefono: +123 456 7890</p>
      </div>
    </div>

    <div class="container">
      <hr class="mt-0 mb-4">
      <div class="copyright">
        <p>&copy; 2024 Boolean student. Tutti i diritti riservati.</p>
      </div>
    </div>
  </footer>


</template>

<style>
body {
  background-color: #ebebeb;
  font-family: "Dosis", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.photo span {
  z-index: 1;
}

.badge {
  background-color: #AEA4BF;
  color: black;
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

.text-purple {
  color: #AEA4BF;

  &:hover {
    color: #8F6593;
  }
}

.bg-purple {
  background-color: #AEA4BF;
}

.selected {
  color: #8F6593;
}

.btn-gradient {
  background-color: #AEA4BF;
  background-image: linear-gradient(to right, #907692, #AEA4BF);
  color: #000000;
  border: 0;
  transition: filter 300ms ease;
}

.btn-gradient:hover {
  background-image: linear-gradient(to right, #8F6593, #AEA4BF);
}

.btn-gradient:active {
  filter: brightness(110%);
}
</style>
