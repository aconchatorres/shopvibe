<template>
    <div class="search">
        <HeaderBar></HeaderBar>
        <div class="contenido">
            <br>
            <!-- <h1>Search Works!</h1> -->
            <h2>Results for: </h2>
            <h3 class="inputTitle"> {{ this.$route.params.input }}</h3>
            <hr>
            <div class="ui segment">
                <div v-if="(results.products == '' && results.products_price_range == '' && results.users != '') || results == ''">
                    <p>No results matching your query.</p>
                </div>
                <div v-else>
                    <div v-for="(product, index) in results.products" :key="index" class="singleProduct">
		                <div class="segmentProd">
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
					                <p>Category: {{ product.category }}</p>
                                    <div v-if="product.is_auction == false">
                                        <p>Brand new</p>
                                    </div>
                                    <div v-else>
                                        <p>Pre-Owned</p>
                                    </div>
				    	            <div class="columnInfoPriceAndOthers">
			    			            <div class="ui two column grid">
		    					            <div class="column">
                                                <div class="priceBox">
                                                    <div v-if="(product.is_auction == true) && (product.last_bid != null)">
                                                        <b class="productPrice">Current Bid: $ {{ product.last_bid }}</b>
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
                        <hr>
	                </div>
                    <div v-for="(product, index) in results.products_price_range" :key="index" class="singleProduct">
		                <div class="segmentProd">
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
					                <p>Category: {{ product.category }}</p>
                                    <div v-if="product.is_auction == false">
                                        <p>Brand new</p>
                                    </div>
                                    <div v-else>
                                        <p>Pre-Owned</p>
                                    </div>
				    	            <div class="columnInfoPriceAndOthers">
			    			            <div class="ui two column grid">
		    					            <div class="column">
                                                <div class="priceBox">
                                                    <div v-if="(product.is_auction == true) && (product.last_bid != null)">
                                                        <b class="productPrice">Current Bid: $ {{ product.last_bid }}</b>
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
                        <hr>
	                </div>
                </div>
            </div>
        </div>
        <!-- <pre>
        {{ $data | json }}
    </pre> -->
    </div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'

var urlServer = 'http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5007';
export default {
    name: 'search',
    components: {
        HeaderBar
    },
    data(){
        return{
            results: '',
            categories: [],
            categoriesServer: []
        }
    },
    methods: {
        search(inputSearch, catFilter, type){
            if (catFilter == 'All Categories') {
                var serverCat = '';
            } else {
                var index = this.categories.indexOf(catFilter);
                var serverCat = this.categoriesServer[index];
                // console.log(inputSearch, catFilter, index, serverCat)
            }

            if (type == 'Type' || type == 'Both') {
                type = '';
            } else if (type == 'Auction') {
                type = true;
            } else {
                type = false;
            }

            this.$http.post((urlServer + '/search'), {
                input: inputSearch,
                price_range: '0-10000000000',
                auction: type,
                category: serverCat
            }).then(function(response){
                // console.log(response.data.products_price_range[0].name);
                this.results = response.data;
            })
            this.products = this.results.products;
            this.users = this.results.users;
        },
        loadCategories(){
            this.categories = JSON.parse(this.$cookie.get('categories'));
            this.categoriesServer = JSON.parse(this.$cookie.get('categoriesServer'));
        }
    },
    created(){
        // console.log("results for: " + this.$route.params.input);
        this.loadCategories();
        this.search(this.$route.params.input, this.$route.params.catFilter, this.$route.params.type);
    }
}
</script>

<style scoped>
    h2{
        display: inline-block;
    }
    .inputTitle {
        display: inline-block;
        margin-left: 10px;
    }
</style>

<style src="../assets/css/estilos.css">

</style>