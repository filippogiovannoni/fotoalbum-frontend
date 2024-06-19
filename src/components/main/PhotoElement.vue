<script>
import { store } from '../../store.js'
export default {
    name: 'PhotoElement',
    data() {
        return {
            store,
        }
    },
    props: {
        photo: Object
    }
}
</script>


<template>

    <div class="photo mb-2 position-relative">
        <span v-if="photo.featured" class="badge position-absolute top-0 start-50 translate-middle">
            Featured
        </span>
        <div class="image">
            <img style="aspect-ratio: 1; object-fit: cover;" width="100%"
                :src="store.base_api_url + '/storage/' + photo.image_url" alt="Immagine {{ photo.title }}">
            <div class="overlay"></div>
        </div>
        <div style="top: 60%;" class="photo-info position-absolute start-50 translate-middle text-center text-white">
            <h5 class="photo-title fs-3">{{ photo.title }}</h5>
            <p class="photo-category">{{ photo.category.name }}</p>
            <p>
                <button class="btn btn-sm btn-gradient text-black" type="button" :data-bs-toggle="'collapse'"
                    :data-bs-target="'#collapseWidthExample' + photo.id" aria-expanded="false"
                    :aria-controls="'collapseWidthExample' + photo.id">
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




</template>

<style lang="scss" scoped></style>