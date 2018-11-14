<template>
<div class="todo">
    <HeaderBar></HeaderBar>
  <div class="contenido">
    <div class="hr"></div>
    <router-view/>
    <!-- <h1>Home</h1> -->
    <h2>Latest Products</h2>
    <!-- <button v-on:click.prevent="test">Test</button> -->
    <!-- Card -->
	<div class="ui raised segment">
        <!-- <div v-for="product in products" :key="product" class="singleProduct"> -->
        <div v-for="(product, index) in products" :key="index" class="singleProduct">
		    <div class="segmentProd">
                <div v-if="product.block == null">
			    <div class="ui grid">
				    <div class="ui segment">
					    <div class="columnaAnchoImagen">
                            <div v-if="product.cover == null">
                                <img src="../assets/imagenes/noImage.png" width="100%" height="100%">
                            </div>
                            <div v-else>
                                <img v-bind:src="product.cover.url" width="100%" height="100%">
                            </div>
				    	</div>
			    	</div>
		    		<div class="columnaAnchoInfo">
	    				<h2 class="pred">
    						<router-link :to="{name: 'product', params: { pId: product.id } }"> {{ product.name }} </router-link>
					    </h2>
					    <p>Category: {{ productsCategories[index] }}</p>
                        <div v-if="product.is_used == false">
                            <p>Brand new</p>
                        </div>
                        <div v-else>
                            <p>Pre-Owned</p>
                        </div>
				    	<div class="columnInfoPriceAndOthers">
			    			<div class="ui two column grid">
		    					<div class="column">
                                    <div class="priceBox">
                                        <div v-if="(product.is_auction == true) && (lastBid[index] != null)">
                                            <b class="productPrice">Current Bid: $ {{ lastBid[index] }}</b>
                                        </div>
                                        <div v-else>
                                            <b class="productPrice">$ {{ product.price }}</b>
                                        </div>                                            
                                    </div>
    								<p><b>Stock: </b>{{ product.stock }}</p>
                                    <!-- <div v-if="product.is_auction == false">
                                        <div class="ui blue submit button" v-on:click.prevent="addToCart(product.id)">Add to Cart</div>
                                    </div> -->
							    </div>
							    <div class="column">
								    <p class="productInfoTextShipDesc">Description:<br> {{ product.shipping_description }} </p>
							    </div>
						    </div>
					    </div>
				    </div>
			    </div>
                </div>
                <div v-else>
                    <div class="ui centered grid">
                        <h1>This product has been blocked.</h1>
                    </div>
                </div>
		    </div>	
            <hr>
	    </div>
    </div>
    <!-- <div v-for="product in products" :key="product" class="singleProduct">
        <h3>
            <router-link :to="{name: 'product', params: { pId: product.id } }"> {{ product.name }} </router-link>
        </h3>
        <h4 >ID: {{ product.id }}</h4>
        <h4>Description: {{ product.description }}</h4>
        <h4>Category: {{ product.category }}</h4>
        <h4>Shipping Description: {{ product.shipping_description }}</h4>
        <h4>Stock: {{ product.stock }}</h4>
        <h3>Price: {{ product.price }}</h3>
        <h4>Is used: {{ product.is_used }}</h4>
        <h4>Is Auction: {{ product.is_auction }}</h4>
        <div v-if="product.is_auction == false">
            <button v-on:click.prevent="addToCart(product.id)">Add to Cart</button>
        </div>
        <hr>
    </div> -->
    <!-- <pre>
        {{ $data.products[1].bids[0].bid | json }}
    </pre> -->
  </div>
</div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'

var urlServer = 'http://ec2-18-191-128-123.us-east-2.compute.amazonaws.com:5005';
export default {
  name: 'Home',
  components: {
    HeaderBar
  },
  data(){
      return {
        tokenExists: false,
        products: [],
        userCookie: {
          id: '',
          secret: '',
          expire_at: '',
          name: ''
        },
        nameOfUser: '',
        cart: [],
        lastBid: [],
        categoriesCookie: [],
        categoriesServerCookie: [],
        productsCategories: []
      }
  },
  methods: {
    loadCart(){
        this.cart = JSON.parse(this.$cookie.get('cart'));
    },
    loadProducts(){
        this.$http.get(urlServer + '/products').then(function(response){
            this.products = response.data.slice().reverse();
        })
        // setTimeout(() => this.loadLastBids(), 500);
        // setTimeout(() => this.setCategories(), 600);
    },
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
    userLogout(){
        this.$cookie.delete('secret');
        this.$http.delete((urlServer + '/sessions'), {headers: {'Authorization': 'Token token=' + this.secret}})
        .then((response) => {
            // console.log(response);
        },
        (err) => {
            console.log("Err", err);
        });
        this.$router.push('/');
    },
    addToCart(productID){
        this.cart.push(productID);
        this.$cookie.set('cart', JSON.stringify(this.cart), 1);
        console.log(this.$cookie.get('cart'));
    },
    // loadLastBids(){
    //     var i;
    //     var bidsValues;
    //     for (i = 0; i < this.products.length; i++) {
    //         var product = this.$data.products[i];
    //         // console.log('PRODUCT: ' + product);
    //         var bids = product.bids;
    //         // console.log('BIDS: ' + bids);
    //         var lastIndex = bids.length;
    //         // console.log('LASTINDEX: ' + lastIndex);
    //         if (lastIndex != '0') {
    //             var lastBid = bids[lastIndex - 1];
    //             // console.log('LAST BID: ' + lastBid);
    //             var lastBidValue = lastBid.bid;
    //             // console.log('LAST BID VALUE: ' + lastBidValue);
    //             this.lastBid.push(lastBidValue);
    //         } else {
    //             this.lastBid.push(null);
    //         }
    //     }
    // },
    loadCategories(){
        this.categoriesCookie = JSON.parse(this.$cookie.get('categories'));
        this.categoriesServerCookie = JSON.parse(this.$cookie.get('categoriesServer'));
    },
    setCategories() {
        var i;
        for (i = 0; i < this.products.length; i++) {
            var product = this.$data.products[i];
            var catFilter = product.category;
            var index = this.categoriesServerCookie.indexOf(catFilter);
            var realCat = this.categoriesCookie[index];
            this.productsCategories.push(realCat);
        }
    },
    test(){
        console.log(this.productsCategories);
    }
  },
    created() {
      this.loadProducts();
      this.checkToken();
      this.loadCategories();
      this.loadCart();
      if(this.$options.name == 'Home'){
        //   console.log('Esta en la pagina de home')
      }else{
        //   console.log('Esta no es la pagina de home')
      }
    //   console.log('COOKIE CART: ');
    //   console.log(this.$cookie.get('cart'));
  }
}
</script>

<style src="../assets/css/estilos.css">

</style>

<style scoped>
    p {
        font-size: 17px;
    }
</style>
