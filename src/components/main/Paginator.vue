<script>
import { store } from '../../store.js'
export default {
    name: 'Paginator',
    data() {
        return {
            store,
        }
    }
}
</script>


<template>
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