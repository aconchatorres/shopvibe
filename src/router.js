import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import Product from './components/Product.vue'
import User from './components/User.vue'
import EditUserInfo from './components/EditUserInfo.vue'
import NewProduct from './components/NewProduct.vue'
import Cart from './components/Cart.vue'
import AdminPage from './components/AdminPage.vue'
import Search from './components/Search.vue'
import ProductBids from './components/ProductBids.vue'

// Router User Page
import UserPersonalInfo from './components/UserPersonalInfo.vue'
import Origins from './components/Origins.vue'
import UserProducts from './components/UserProducts.vue'
import Purchases from './components/Purchases.vue'
import Sales from './components/Sales.vue'
import Bids from './components/Bids.vue'
import NewOrigin from './components/NewOrigin.vue'

// Router Admin Page
import AdminUsers from './components/AdminUsers.vue'
import AdminProducts from './components/AdminProducts.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/product/:pId',
            name: 'product',
            component: Product
        },
        {
            path: '/user/:uId',
            name: 'user',
            component: User,
            children: [
                { path: '/pInfo', component: UserPersonalInfo },
                { path: '/userProducts', component: UserProducts },
                { path: '/origins', component: Origins },
                { path: '/purchases', component: Purchases },
                { path: '/sales', component: Sales },
                { path: '/bids', component: Bids },
            ]
        },
        {
            path: '/editUserInfo',
            name: 'editUserInfo',
            component: EditUserInfo
        },
        {
            path: '/newProduct',
            name: 'newProduct',
            component: NewProduct
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/adminPage',
            name: 'adminPage',
            component: AdminPage,
            children: [
                { path: '/adminUsers', component: AdminUsers },
                { path: '/adminProducts', component: AdminProducts }
            ]
        },
        {
            path: '/search/:input/:catFilter/:type',
            name: 'search',
            component: Search
        },
        {
            path: '/productBids/:pId',
            name: 'productBids',
            component: ProductBids
        },
        {
            path: '/newOrigin',
            name: 'newOrigin',
            component: NewOrigin
        }
    ]
})