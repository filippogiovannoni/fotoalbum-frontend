<script>
import Navbar from './Navbar.vue'
import SideMenu from './SideMenu.vue'
export default {
    name: 'AppHeader',
    components: { Navbar, SideMenu },
    data() {
        return {

        }
    }
}
</script>

<template>
    <header>

        <Navbar></Navbar>

        <SideMenu></SideMenu>

    </header>
</template>


<style lang="scss" scoped></style>