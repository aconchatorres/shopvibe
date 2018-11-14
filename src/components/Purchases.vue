<template>
    <div class="purchases">
        <h3>Purchases</h3>
        <div v-if="purchases != ''">
        <div v-for="purchase in purchases" :key="purchase" class="card">
            <div class="originCard">
            <div class="ui grid">
                <div class="two wide column">
                    <div v-if="purchase.product.cover == null">
                        <img src="../assets/imagenes/noImage.png" width="100%" height="100%">
                    </div>
                    <div v-else>
                        <img v-bind:src="purchase.product.cover.url" width="100%" height="100%">
                    </div>
                </div>
                <div class="right aligned two wide column">
                    <p class="pb">Name:</p>
                    <p class="pb">Seller:</p>
                    <p class="pb">Quantity:</p>
                    <p class="pb">Total:</p>
                    <p class="pb">Status:</p>
                </div>
                <div class="three wide column">
                    <p> {{ purchase.product.name }} </p>
                    <p> {{ purchase.seller.name }} </p>
                    <p> {{ purchase.quantity }} </p>
                    <p> ${{ purchase.total_price }} </p>
                    <p v-if="purchase.was_shipped == true"> Shipped </p>
                    <p v-else> Not Shipped </p>
                </div>
                <div class="right aligned three wide column">
                    <p class="pb">Deliver Country:</p>
                    <p class="pb">State:</p>
                    <p class="pb">City:</p>
                    <p class="pb">Address:</p>
                </div>
                <div class="three wide column">
                    <div v-if="purchase.destiny == null">
                        <p>NA</p>
                        <p>NA</p>
                        <p>NA</p>
                        <p>NA</p>
                    </div>
                    <div v-else>
                        <p> {{ purchase.destiny.country }} </p>
                        <p> {{ purchase.destiny.state }} </p>
                        <p> {{ purchase.destiny.city }} </p>
                        <p> {{ purchase.destiny.address }} </p>
                    </div>
                    
                </div>
                <div class="two wide center aligned column">
                    <div class="btnsAdmin">
                        <button class="ui blue button" v-on:click.prevent="gotoProductDetails(purchase.product.id)">Details</button>
                    </div>
                    <div class="btnsAdmin">
                        <div v-if="purchase.was_delivered == true">
                            <button class="ui disabled green button">Received</button>
                        </div>
                        <div v-else>
                            <button class="ui green button" v-on:click.prevent="setDelivered(purchase.id)">Received</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="marginScore">
                <div class="ui centered grid">
                    
                    <h3>Seller Score</h3>
                    <div v-if="purchase.seller_score == null">
                        <div class="rating">
                            <span v-on:click.prevent="rateSeller(purchase.id, 5)">☆</span>
                            <span v-on:click.prevent="rateSeller(purchase.id, 4)">☆</span>
                            <span v-on:click.prevent="rateSeller(purchase.id, 3)">☆</span>
                            <span v-on:click.prevent="rateSeller(purchase.id, 2)">☆</span>
                            <span v-on:click.prevent="rateSeller(purchase.id, 1)">☆</span>
                        </div>
                    </div>
                    <div v-else>
                        <h3> {{ purchase.seller_score }} </h3>
                    </div>
                </div>
            </div>
            </div>
            <hr>
        </div>
        </div>
        <div v-else>
            <br>
            <div class="ui centered grid">
                <h2>You have currently no purchases.</h2>
          </div>
        </div>
        <!-- <pre>
        {{ $data | json }}
    </pre> -->
    </div>
</template>

<script>
import axios from 'axios';

var urlServer = 'http://ec2-18-191-128-123.us-east-2.compute.amazonaws.com:5005';

export default {
    name: 'Purchases',
    data(){
        return{
            purchases: [],
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
                // console.log("COOKIE: " + this.$cookie.get('secret'));
                var userInfo = JSON.parse(this.$cookie.get('secret'));
                this.id = userInfo.user_id;
                this.secret = userInfo.secret;
                this.expire_at = userInfo.expire_at;

                this.nameOfUser = userInfo.name;
            }
        },
        loadProducts(){
            this.$http.get((urlServer + '/purchases'), {headers: {'Authorization': 'Token token=' + this.secret}})
            .then(function(response){
                // setTimeout(() => this.loadLastBids(), 500);
                this.purchases = response.data;
                // console.log('RESPUESTA: ' +  this.purchases.product.name);
            })
        },
        gotoProductDetails(productid){
            this.$router.push({name: 'product', params: { pId: productid } });
        },
        rateSeller(purchaseID, rating){
            // console.log('PURCHASE ID: ' + purchaseID);
            // console.log('RATING STAR: ', rating);
            // console.log('SECRET: ' + this.secret);

            var entero = parseInt(rating);
            var cadena = rating + '';
            // console.log(entero);
            axios.put((urlServer + '/seller_score/' + purchaseID), {seller_score: entero}, {headers: {'Authorization': 'Token token=' + this.secret}})
            .then(function(response){
                // console.log(response)
                setTimeout(() => this.$router.push('/'), 500);
            },
            (err) => {
                console.log("Err", err);
            })
        },
        setDelivered(purchaseid){
            // console.log('PURCHASE ID: ' + purchaseid);
            // console.log('SECRET: ' + this.secret);
            // this.$http.put((urlServer + '/purchase_delivered/' + purchaseid), {headers: {'Authorization': 'Token token=' + this.secret}})
            // .then(function(response){
            //     setTimeout(() => location.reload(), 500);
            // },
            // (err) => {
            //     console.log("Err", err);
            // });
            axios.put((urlServer + '/purchase_delivered/' + purchaseid), {headers: {'Authorization': 'Token token=' + this.secret}})
            .then(function(response){
                // console.log(response)
                setTimeout(() => this.$router.push('/'), 500);
            },
            (err) => {
                console.log("Err", err);
            })
        }
    },
    created(){
        // console.log('entra')
        this.checkToken();
        this.loadProducts();
    }
}
</script>

<style scoped>
    .btnsAdmin {
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .ratingBtns{
        width:200px;
    }
    .marginScore {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .rating {
        unicode-bidi: bidi-override;
        direction: rtl;
    }
        .rating > span {
        display: inline-block;
        position: relative;
        width: 1.1em;
    }
        .rating > span:hover:before,
        .rating > span:hover ~ span:before {
        content: "\2605";
        position: absolute;
        color: gold;
    }
    span{
        font-size: 30px;
    }
    .pb {
        font-weight: bold;
    }
</style>
