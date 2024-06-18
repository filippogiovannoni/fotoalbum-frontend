<script>
export default {
    name: 'Navbar',
    data() {
        return {

        }
    }
}
</script>


<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="#">
                <div class="bg-purple p-2">
                    FILIPPO GIOVANNONI Photography
                </div>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <!-- Offcanvas Toggle Button -->
                <a class="ms-3 text-purple" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar">
                    <i class="fa fa-bars fs-4" aria-hidden="true"></i>
                </a>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped></style>