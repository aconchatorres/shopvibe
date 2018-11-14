<template>
    <div class="adminProducts">
        <!-- <h1>Admin Products works</h1> -->
        <div v-for="product in products" :key="product" class="card">
            <div class="originCard">
            <div class="ui grid">
                <div class="two wide column">
                    <!-- <div class="ui segment"></div> -->
                    <div v-if="product.cover == null">
                        <img src="../assets/imagenes/noImage.png" width="100%" height="100%">
                    </div>
                    <div v-else>
                        <img v-bind:src="product.cover.url" width="100%" height="100%">
                    </div>
                </div>
                <div class="right aligned two wide column">
                    <!-- <div class="ui segment"></div> -->
                    <p class="pb">Name:</p>
                    <p class="pb">ID:</p>
                    <p class="pb">Seller:</p>
                    <p class="pb">Category:</p>
                </div>
                <div class="three wide column">
                    <!-- <div class="ui segment"></div> -->
                    <p> {{ product.name }} </p>
                    <p> {{ product.id }} </p>
                    <router-link :to="{name: 'user', params: { uId: product.user_id } }"> {{ product.user.name }} </router-link>
                    <p> {{ product.category }} </p>
                </div>
                <div class="right aligned two wide column">
                    <!-- <div class="ui segment"></div> -->
                    <p class="pb">Auction:</p>
                    <p class="pb">Price:</p>
                    <p class="pb">Created at:</p>
                    <p class="pb">Updated at:</p>
                </div>
                <div class="four wide column">
                    <p v-if="product.is_auction == true"> Yes </p>
                    <p v-else> No </p>
                    <p> {{ product.price }} </p>
                    <p> {{ product.created_at }} </p>
                    <p> {{ product.updated_at }} </p>
                </div>
                <div class="two wide center aligned column">
                    <div class="btnsAdmin">
                        <button class="ui blue button" v-on:click.prevent="gotoProductDetails(product.id)">Details</button>
                    </div>
                    <div class="btnsAdmin">
                        <div v-if="product.blocked_product == null">
                            <button class="ui red button" v-on:click.prevent="blockProduct(product.id)">Block</button>
                        </div>
                        <div v-else>
                            <button class="ui green button" v-on:click.prevent="unblockProduct(product.id)">Unblock</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
var urlServer = 'http://ec2-18-191-128-123.us-east-2.compute.amazonaws.com:5005';

export default {
    name: 'AdminProducts',
    data(){
        return{
            products: [],
            userCookie: {
                id: '',
                secret: '',
                expire_at: ''
            }
        }
    },
    methods: {
        checkToken(){
            if (this.$cookie.get('secret') == null){
                this.tokenExists = false;
            }else{
                this.tokenExists = true;
                //   console.log("COOKIE: " + this.$cookie.get('secret'));
                var userInfo = JSON.parse(this.$cookie.get('secret'));
                this.id = userInfo.user_id;
                this.secret = userInfo.secret;
                this.expire_at = userInfo.expire_at;

                this.nameOfUser = userInfo.name;
            }
        },
        loadProducts(){
            this.$http.get(urlServer + '/products').then(function(response){
                this.products = response.data;
            })
        },
        gotoProductDetails(productid){
            this.$router.push({name: 'product', params: { pId: productid } });
        },
        blockProduct(productid){
            this.$http.put((urlServer + '/products/' + productid + '/block'), {emulateJSON:true}, {headers: {'Authorization': 'Token token=' + this.secret}})
            .then(function(response){
                console.log(response);
            },
            (err) => {
                console.log("Err", err);
            });
            setTimeout(() => location.reload(), 500);
        },
        unblockProduct(productid){
            this.$http.put((urlServer + '/products/' + productid + '/unblock'), {emulateJSON:true}, {headers: {'Authorization': 'Token token=' + this.secret}})
            .then(function(response){
                console.log(response);
            },
            (err) => {
                console.log("Err", err);
            });
            setTimeout(() => location.reload(), 500);
        }
    },
    created(){
        console.log(this.$cookie.get('secret'));
        this.checkToken();
        this.loadProducts();
    }
}
</script>

<style scoped>
    .pb{
        font-weight: bold;
    }
    .btnsAdmin {
        margin-bottom: 10px;
        margin-top: 10px;
    }
</style>