<template>
    <div class="adminPage">
        <HeaderBar></HeaderBar>
        <div class="contenido">
            <br>
            <h2>Manage Users and Products</h2>
            <!-- Dashboard Usuarios y Productos -->
            <div class="ui secondary pointing menu">
                <a class="item" :class="{ active: isUsersActive }" @click="switchTabs('users')">
                    <router-link to="/adminUsers">Users</router-link>
                </a>
                <a class="item" :class="{ active: isProductsActive }" @click="switchTabs('products')">
                    <router-link to="/adminProducts">Products</router-link>
                </a>
            </div>
            <div v-if="clicked == true">
                <div class="ui segment">
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'

export default {
    name: 'AdminPage',
    components: {
        HeaderBar
    },
    data(){
        return{
            isUsersActive: false,
            isProductsActive: false,
        }
    },
    methods: {
        switchTabs(tab) {
            this.clicked = true;
            if (tab === 'users') {
                this.isUsersActive = true;
                this.isProductsActive = false;
            } else {
      	        this.isUsersActive = false;
                this.isProductsActive = true;
            }
        }
    },
    created(){
        // setTimeout(() => this.switchTabs('users'), 500);
    }
}
</script>


<style scoped>

</style>
