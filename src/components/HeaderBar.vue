<template>
  <div class="headerBar">
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
  </div>
</template>


<script>
var urlServer = 'https://disenosback.ddns.net:2003';
export default {
  name: 'HeaderBar',
  data(){
      return{
          tokenExists: false,
          role: "normal",
          categoriesCookie: [],
          cart: [],
          searchInput: '',
          categoryFilter: 'All Categories',
          typeAuction: 'Type'
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
          this.name = userInfo.name;
          this.role = userInfo.role;

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
        // console.log('LOOGED OUT');
        setTimeout(() => this.$router.push('/'), 500);
        // this.$router.push('/');
        // location.reload();
    },
    gotoAdminPage(){
        this.$router.push('/adminPage');
    },
    gotoCart() {
        this.$router.push('/cart');
    },
    loadCategories(){
        this.categoriesCookie = JSON.parse(this.$cookie.get('categories'));
    },
    loadCart(){
        
    },
    searchProduct(searchInput, categoryFilter, typeAuction){
        // console.log(searchInput, categoryFilter);
        // this.$router.push({name: 'search', params: { input: searchInput, catFilter: categoryFilter} });
        setTimeout(() => 
            this.$router.push({name: 'search', params: { input: searchInput, catFilter: categoryFilter, type: typeAuction} })
        , 500);
        // location.reload();
    },
    test(){
    }
  },
    created(){
        this.checkToken();
        this.loadCategories();
        this.loadCart();
    }
}
</script>

<style src="../assets/css/estilos.css">

</style>

<style scoped>
    .typeFilter {
        background: red;
        width: 50px;
    }
    .btnAdmin {
        /* background: red; */
        display: inline-block

    }
    .imagenLogo {
        display: inline-block;
        margin-right: -70px;
    }
    .headerContent{
        /* padding: 10px; */
        height: 67px;
        margin-bottom: 20px;
    }
    .barraBusqueda {
        display: inline-block;
        position: relative;
        top: -20px;
    }
</style>
