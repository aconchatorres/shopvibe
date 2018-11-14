<template>
    <div class="productBids">
        <HeaderBar></HeaderBar>
        <br>
        <div class="contenido">
            <h2>Bid History</h2>
            <div class="ui grid">

                <!-- BIDS TABLE -->
                <div class="ten wide column">
                    <div class="ui segment">
                        <div class="columnSpace"></div>
                        <p class="pbChart">Bid Amount</p>
                        <div class="columnSpace"></div>
                        <p class="pbChart">Bid Time</p>
                        <hr>
                        <div class="columnSpaceTable3"></div>
                        <p class="pChart">(Starting Price) ${{product.price}}</p>
                        <div class="columnSpaceTable2"></div>
                        <p class="pChart">{{product.created_at}}</p>
                        <div v-for="bid in bids" :key="bid" class="singleProduct">
                            <hr>
                            <div class="columnSpaceTable"></div>
                            <p class="pChart">${{bid.bid}}</p>
                            <div class="columnSpaceTable2"></div>
                            <p class="pChart">{{bid.created_at}}</p>
                        </div>
                    </div>
                </div>

                <!-- ITEM INFO -->
                <div class="six wide column">
                    <div class="ui segment">
                        <h4>Item Info</h4>
                        <div class="ui grid">
                            <div class="six wide column">
                                <div v-if="product.cover == null">
                                    <img src="../assets/imagenes/noImage.png" width="100%" height="100%">
                                </div>
                                <div v-else>
                                    <img v-bind:src="product.cover.url" width="100%" height="100%">
                                </div>
                            </div>
                            <div class="ten wide column">
                                <router-link :to="{name: 'product', params: { pId: product.id } }"> {{ product.name }} </router-link>
                            </div>
                        </div>
                        <hr>
                        <div class="ui grid">
                            <div class="six wide column">
                                <p class="pc">Current bid:</p>
                                <p class="pc">Shipping:</p>
                            </div>
                            <div class="ten wide column">
                                <p class="pb">${{bids[bidsLength].bid}}</p>
                                <p>{{ product.shipping_description }}</p>
                            </div>
                        </div>
                        <hr>
                        <!-- PLACE BID -->
                        <p>Enter your maximum bid:</p>
                        <div class="ui grid">
                            <div class="eight wide column">
                                <div class="ui input">
                                    <input type="text" pattern="[0-9]+" placeholder="Bid" v-model="bidValue">
                                </div>
                            </div>
                            <div class="six wide column">
                                <button class="ui blue button" v-on:click.prevent="placeBid">Place Bid</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'

var urlServer = 'http://ec2-18-191-128-123.us-east-2.compute.amazonaws.com:5005';
export default {
    name: 'productBids',
    components: {
        HeaderBar
    },
    data(){
        return{
            product: '',
            bids: [],
            bidsLength: 0,
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
        loadProduct(){
            this.$http.get(urlServer + '/products/' + this.$route.params.pId).then(function(response){
                this.product = response.data;
                console.log(response.data);
            });
            setTimeout(() => this.bids = this.product.bids, 500);
            setTimeout(() => this.bidsLength = this.bids.length - 1, 500);
        },
        placeBid(){
            if (this.$cookie.get('secret') == null) {
                this.$router.push('/login');
            } else {
            this.$http.post((urlServer + '/products/' + this.id + '/bids'),{
                bid: parseFloat(this.bidValue)
            }
            , {headers: {'Authorization': 'Token token=' + this.secret}})
            .then(response => response.json())
            .then(function(json){
                if (json.id != "0"){
                    // console.log("Bid creado con exito");
                }
                // console.log('Data json: ' + json.data);
                location.reload();
            },
            (err) => {
                console.log("Err", err);
            }
        );
        }
      }
    },
    created(){
        this.checkToken();
        this.loadProduct();
    }
}
</script>

<style scoped>
    .pChart {
        display: inline-block;
    }
    .columnSpace {
        width: 150px;
        display: inline-block;
    }
    .columnSpaceTable {
        width: 165px;
        display: inline-block;
    }
    .columnSpaceTable2 {
        width: 120px;
        display: inline-block;
    }
    .columnSpaceTable3 {
        width: 70px;
        display: inline-block;
    }
    .pb{
        font-weight: bold;
    }
    .pbChart {
        font-weight: bold;
        display: inline-block;
    }
    hr {
        margin-bottom: 15px;
        display: block;
	    height: 1px;
	    border: 0;
	    border-top: 1px solid  #d0d3d4;
	    padding: 0;
    }
    /* p {
    font-size: 15px;
  } */
    .pc {
        color: #797675;
    }
</style>
