<script>
import { store } from '../../store.js'
export default {
    name: 'AppFooter',
    data() {
        return {
            store,
        }
    }
}
</script>

<template>
    <footer v-if="!store.loading">
        <div class="container">

            <div class="contact-info">
                <p>Email: info@fotografo.com</p>
                <p>Telefono: +123 456 7890</p>
            </div>
        </div>

        <div class="container">
            <hr class="mt-0 mb-4">
            <div class="credits">
                <p>Designed with <i class="fas fa-heart text-danger"></i> by Filippo</p>
            </div>
            <div class="copyright">
                <p>&copy; 2024 Fotografo. Tutti i diritti riservati.</p>
            </div>
        </div>
    </footer>
</template>


<style lang="scss" scoped></style>