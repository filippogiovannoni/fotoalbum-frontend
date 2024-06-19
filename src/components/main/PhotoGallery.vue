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
            <div class="col-md-4 px-1" v-for="photo in store.photos" v-if="store.photos && store.photos.length >= 1">
                <PhotoElement :photo="photo"></PhotoElement>
            </div>

            <div class="col" v-else-if="store.photos.length == 0 && store.loading == false">
                <NoResult></NoResult>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>