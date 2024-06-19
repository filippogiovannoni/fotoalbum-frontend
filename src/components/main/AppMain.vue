<script>
import { store } from '../../store.js'
import MainNavbar from './MainNavbar.vue'
import PhotoGallery from './PhotoGallery.vue'
export default {
    name: 'AppMain',
    components: { MainNavbar, PhotoGallery },
    data() {
        return {
            store,
        }
    },
    mounted() {
        const photosUrl = store.base_api_url + store.photos_endpoint
        const categoriesUrl = store.base_api_url + store.categories_endpoint

        store.getPhotos(photosUrl)
        store.getCategories(categoriesUrl)

    }
}
</script>

<template>
    <main>

        <MainNavbar></MainNavbar>

        <PhotoGallery></PhotoGallery>

        <!-- Loader -->
        <div class="container text-center d-flex mt-5 justify-content-center">
            <div class="loader fs-3" v-if="store.loading">
                <i class="fa-solid fa-spinner fa-spin"></i>
                <span class="d-block">Loading photos</span>
            </div>
        </div>

    </main>
</template>


<style>
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
    color: black;
}

.btn-gradient:active {
    filter: brightness(110%);
}
</style>