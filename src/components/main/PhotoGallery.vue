<script>
import { store } from '../../store.js'
import PhotoElement from './PhotoElement.vue'
import NoResult from './NoResult.vue'
import Paginator from './Paginator.vue'
export default {
    name: 'PhotoGallery',
    components: { PhotoElement, NoResult, Paginator },
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

    <Paginator></Paginator>

</template>

<style scoped></style>