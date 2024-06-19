<script>
import { store } from '../../store.js'
export default {
    name: 'PhotoGallery',
    data() {
        return {
            store,
        }
    }
}
</script>


<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-4 px-1" v-for="photo in store.photos" v-if="store.photos && store.photos.length >= 1">
                <div class="photo mb-2 position-relative">
                    <span v-if="photo.featured" class="badge position-absolute top-0 start-50 translate-middle">
                        Featured
                    </span>
                    <div class="image">
                        <img style="aspect-ratio: 1; object-fit: cover;" width="100%"
                            :src="store.base_api_url + '/storage/' + photo.image_url" alt="Immagine {{ photo.title }}">
                        <div class="overlay"></div>
                    </div>
                    <div style="top: 60%;"
                        class="photo-info position-absolute start-50 translate-middle text-center text-white">
                        <h5 class="photo-title fs-3">{{ photo.title }}</h5>
                        <p class="photo-category">{{ photo.category.name }}</p>
                        <p>
                            <button class="btn btn-sm btn-gradient text-black" type="button"
                                :data-bs-toggle="'collapse'" :data-bs-target="'#collapseWidthExample' + photo.id"
                                aria-expanded="false" :aria-controls="'collapseWidthExample' + photo.id">
                                Show description
                            </button>
                        </p>
                        <div style="min-height: 120px;">
                            <div class="collapse collapse-horizontal" :id="'collapseWidthExample' + photo.id">
                                <div style="max-height: 200px; width: 300px;" class="text-center p-3 overflow-y-auto">
                                    {{ photo.description }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- No results -->
            <div class="col" v-else-if="store.photos.length == 0 && store.loading == false">
                <div class="mt-5 text-center fs-4">
                    <i class="fa fa-camera" aria-hidden="true"></i>
                    <h4>No Photos Available</h4>
                    <p class="fs-6">Try with a different category!</p>
                </div>
            </div>

            <!-- Loader -->
            <div class="container text-center d-flex mt-5 justify-content-center">
                <div class="loader fs-3" v-if="store.loading">
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    <span class="d-block">Loading photos</span>
                </div>
            </div>


        </div>
    </div>
</template>

<style lang="scss" scoped></style>