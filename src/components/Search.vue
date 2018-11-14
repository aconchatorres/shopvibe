<template>
    <div class="search">
        <!-- <HeaderBar></HeaderBar> -->
        <!-- HEADERBAR START -->

        <div v-if="tokenExists === true">
            <!-- Segmento encabezado, info usuario y botones -->
            <div class="ui raised segment">
                
		        <div class="alignLeftContent">
                    
                    <div class="ui grid">
                        <div class="left aligned four wide column">
                            <!-- Boton Admin -->
                                <div class="btnAdmin">
                                    <div v-if="role == 'admin'">
                                        <button class="ui blue left floated button" v-on:click.prevent="gotoAdminPage">Admin Page</button>
                                    </div>
                                </div>
                        </div>
                    
                        <div class="right aligned twelve wide column">
			        <!-- Boton e imagen de usuario -->
			        <div class="ui simple dropdown item">
				        <i class="fa fa-users"></i>
				        <div class="circular ui icon button">
					        <div class="iconoCentradoUser">
						        <i class="user icon"></i>
					        </div>
				        </div>
				        <!-- Drop down menu usuario -->
				        <i class="fa fa-caret-down"></i>
				        <div class="menu">
					        <a class="item"><i><router-link :to="{name: 'user', params: { uId: this.id } }">My Account</router-link></i></a>
					        <!-- <a class="item"><i></i>Sales</a> -->
					        <!-- <a class="item"><i></i>Purchases</a> -->
					        <a class="item" v-on:click.prevent="userLogout"><i></i>Logout</a>
				        </div>
				        <!-- Texto nombre de Usuario -->
				        <div class="nombreUsuario">
					        <!-- <router-link :to="{name: 'user', params: { uId: this.id } }"> {{ this.name }} </router-link> -->
					        {{ this.name }}
				        </div>
				        <!-- Espacio entre botones -->
				        <div class="space"></div>
			        </div>
			        <!-- Boton icono carro de compras -->
                    <router-link to="/cart">    
			            <div class="circular ui icon button" v-on:click.prevent="gotoCart">
				            <div class="iconoCentradoCart">
					            <i class="shopping cart icon"></i>
				            </div>
                        </div>
                    </router-link>
                </div>
		        </div>	
                </div>	
	        </div>
        </div>
        <div v-else>
            <!-- Segmento encabezado Login y Registro -->
            <div class="ui raised segment">
                <div class="encabezadoLogin">
                    <router-link to="/login">Login</router-link>
                    or 
                    <router-link to="/register">Register</router-link>
                </div>
            </div>
        </div>
        <!-- Contenido de pagina con ajuste de centrado -->
        <div class="contenido">
            <br>
            <div class="headerContent">
			    <!-- Logo eBay -->
                <router-link to="/">
                    <div class="imagenLogo">
                        <img src="../assets/imagenes/logoCompleto.png" width="70%">
                    </div>
                </router-link>

			    <!-- Busqueda (input, boton, icono) -->
                <div class="barraBusqueda">
                    <div class="ui left icon action input">
                        <i class="search icon"></i>
                        <!-- Input de busqueda -->
                        <!-- <input placeholder="Search for anything" type="text" size="83" v-model="userData.name"> -->
                        <input placeholder="Search for anything" type="text" size="62"  v-model="searchInput">
                        <!-- Dropdown categorias -->
                        <div class="dropdownCatBack">
                            <select name="origin" id="origin" class="dropdownCat" v-model="categoryFilter">
                                <!-- Items de categorias -->
                                <option v-for ="category in categoriesCookie" :key="category" :value="category"> {{ category }} </option>
                            </select>
                        </div>
                        <!-- <select name="origin" id="origin" class="dropdownCat" v-model="typeAuction">
                            Items de categorias
                                <option value="Type">Type</option>
                                <option value="Both">Both</option>
                                <option value="true">Auction</option>
                                <option value="false">Buy Now</option>
                        </select> -->
                        <div class="ui red submit button" v-on:click.prevent="searchProduct(searchInput, categoryFilter, typeAuction)">Search</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <br>
        <router-link to="/">Home</router-link>
        <br> -->
        <!-- <input type="text" placeholder="Search..." v-model="userData.name"> -->
        <!-- <input type="text" placeholder="Search...">
        <select name="origin" id="origin">
          <option v-for ="category in categoriesCookie" :key="category" :value="category" > {{ category }} </option>
        </select> -->
        <!-- <button v-on:click.prevent="test">Test</button> -->

        <!-- HEADERBAR END -->
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

var urlServer = 'http://ec2-18-191-128-123.us-east-2.compute.amazonaws.com:5005';
export default {
    name: 'search',
    components: {
        HeaderBar
    },
    data(){
        return{
            tokenExists: false,
            results: '',
            categories: [],
            categoriesServer: [],
            categoriesCookie: [],
            currentSearch: '',
            newSearch: '',
            categoryFilter: 'All Categories',
            searchInput: ''
        }
    },
    methods: {
        searchProduct(searchInput, categoryFilter, typeAuction){
            // console.log(searchInput, categoryFilter);
            // this.$router.push({name: 'search', params: { input: searchInput, catFilter: categoryFilter} });
            setTimeout(() => 
                this.$router.push({name: 'search', params: { input: searchInput, catFilter: categoryFilter, type: typeAuction} })
            , 500);
            // location.reload();
        },
        search(inputSearch, catFilter, type) {
            console.log('inputSearch', inputSearch)
            // if () {

            // }
            // PENDIENTE
            if (catFilter == 'All Categories') {
                var serverCat = '';
            } else {
                var index = this.categories.indexOf(catFilter);
                var serverCat = this.categoriesServer[index];
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
            this.categoriesCookie = JSON.parse(this.$cookie.get('categories'));
            this.categories = JSON.parse(this.$cookie.get('categories'));
            this.categoriesServer = JSON.parse(this.$cookie.get('categoriesServer'));
        },
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
                this.name = userInfo.name;
                this.role = userInfo.role;

                this.nameOfUser = userInfo.name;
            }
        },
    },
    created(){
        this.checkToken();
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
    .imagenLogo {
        display: inline-block;
        margin-right: -70px;
    }
    .headerContent{
        height: 67px;
        /* margin-bottom: 20px; */
    }
    .barraBusqueda {
        display: inline-block;
        position: relative;
        top: -20px;
    }
</style>

<style src="../assets/css/estilos.css">

</style>