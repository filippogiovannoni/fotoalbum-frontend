<script>
import { store } from '../../store.js'
export default {
    name: 'MainNavbar',
    data() {
        return {
            store,
        }
    }
}
</script>


<template>
    <div class="container mt-5">
        <div class="row align-items-center">
            <nav class="nav d-flex justify-content-between">
                <button @click="store.getPhotos(store.base_api_url + store.photos_endpoint)"
                    class="btn btn-gradient">All
                    photos</button>
                <ul class="nav">
                    <li class="nav-item" v-for="category in store.categories" :key="category.id">
                        <a class="text-purple text-decoration-none px-3" href="#"
                            :class="{ selected: category.id === store.selectedCategory }"
                            @click.prevent="store.selectedCategory = category.id; store.filterByCategory()">
                            {{ category.name }}
                        </a>
                    </li>
                </ul>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="featured" id="featured" value="1"
                        v-model="store.featured" @change="store.filterByFeatured()">
                    <label class="form-check-label ms-2" for="featured">Show Featured</label>
                </div>
            </nav>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>