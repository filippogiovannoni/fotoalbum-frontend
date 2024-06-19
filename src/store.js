import axios from 'axios';
import { reactive } from "vue";

export const store = reactive({
    base_api_url: 'http://127.0.0.1:8000',
    photos_endpoint: '/api/photos',
    categories_endpoint: '/api/categories',
    selectedCategory: '',
    'photos': '',
    'categories': '',
    loading: false,
    featured: 0,
    getPhotos(url) {
        this.loading = true
        this.photos = ''

        axios
            .get(url)
            .then(response => {
                console.log(response);
                this.photos = response.data.results
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
})