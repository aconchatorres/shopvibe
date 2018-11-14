<template>
    <div class="UserProducts.vue">
        <h3>My Products</h3>
        <button class="ui right floated basic blue button" v-on:click.prevent="checkOrigins">New Product</button>
        <div v-if="productsUser.length != 0">
            <br>
            <br>
            <br>
        <div v-for="product in productsUser" :key="product" class="card">
            <div v-if="product.block == null">
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
                    <p class="pb">Category:</p>
                </div>
                <div class="three wide column">
                    <!-- <div class="ui segment"></div> -->
                    <p> {{ product.name }} </p>
                    <p> {{ product.id }} </p>
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
                    <!-- <div class="btnsAdmin">
                        <button class="ui basic blue button" v-on:click.prevent="blockProduct(product.id)">Edit</button>
                    </div> -->
                </div>
            </div>
            </div>
            </div>
            <div v-else>
                <div class="ui centered grid">
                    <h1>This product has been blocked.</h1>
                </div>
            </div>
            <hr>
        </div>
        </div>
        <div v-else>
            <br>
            <div class="ui centered grid">
                <h2>You have currently no products.</h2>
          </div>
        </div>
    </div>
</template>

<script>

var urlServer = 'http://ec2-18-191-128-123.us-east-2.compute.amazonaws.com:5005';
export default {
    name: 'userProducts',
    data(){
        return{
            products: [],
            productsUser: [],
            userCookie: {
                id: '',
                secret: '',
                expire_at: '',
                name: '',
                hasOrigins: false
            },
        }
    },
    methods: {
        checkToken(){
            if (this.$cookie.get('secret') == null){
                this.tokenExists = false;
            }else{
                this.tokenExists = true;
                console.log("COOKIE: " + this.$cookie.get('secret'));
                var userInfo = JSON.parse(this.$cookie.get('secret'));
                this.id = userInfo.user_id;
                this.secret = userInfo.secret;
                this.expire_at = userInfo.expire_at;
                this.name = userInfo.name

                this.nameOfUser = userInfo.name;
            }
        },
        loadProducts(){
            this.$http.get(urlServer + '/products').then(function(response){
                this.products = response.data;
            })
            setTimeout(() => this.loadUserProducts(), 500);
        },
        loadUserProducts(){
            var i;
            for (i = 0; i < this.products.length; i++) {
                if (this.products[i].user.id === this.id) {
                    this.productsUser.push(this.products[i]);
                }
            }
        },
        gotoNewProduct() {
            if (this.hasOrigins) {
                this.$router.push('/newProduct');
            }else{
                alert("Please create a new origin first.");
            }
        },
        checkOrigins(){
            this.$http.get((urlServer + '/origins'), {headers: {'Authorization': 'Token token=' + this.secret}})
            .then(function(response){
                // console.log('ORIGINS PRINT: ' + response.data);
                if (response.data != '') {
                    this.hasOrigins = true;
                }
            }),
            (err) => {
                console.log("Err", err);
            };
            setTimeout(() => this.gotoNewProduct(), 500);
        },
        gotoProductDetails(productid){
            this.$router.push({name: 'product', params: { pId: productid } });
        },
    },
    created(){
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
