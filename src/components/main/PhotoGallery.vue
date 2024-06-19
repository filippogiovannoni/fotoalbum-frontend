<script>
import { store } from '../../store.js'
import PhotoElement from './PhotoElement.vue'
import NoResult from './NoResult.vue'
export default {
    name: 'PhotoGallery',
    components: { PhotoElement, NoResult },
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
            <div class="col-md-4 px-1" v-for="photo in store.photos.data"
                v-if="store.photos.data && store.photos.data.length >= 1">
                <PhotoElement :photo="photo"></PhotoElement>
            </div>

            <div class="col" v-else-if="store.photos.data && store.loading == false">
                <NoResult></NoResult>
            </div>
        </div>
    </div>

    <nav class="mt-5" aria-label="Page navigation">
        <ul class="pagination justify-content-center   ">
            <li class="page-item" :class="{ 'disabled': !link.url, 'active': link.active }"
                v-for="link in store.photos.links">
                <button class="page-link" :href="link.url" type="button" @click="store.getPhotos(link.url)">

                    <span class="text-purple" v-html="link.label"></span>

                </button>
            </li>
        </ul>
    </nav>

</template>

<style scoped>
.page-item.active .page-link {
    background-color: #8F6593;
    border-color: #8F6593;
    color: white;

    & span {
        color: white;
    }
}

.text-purple {
    color: #AEA4BF;
}
</style>