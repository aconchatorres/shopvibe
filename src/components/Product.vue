<template>
<div class="todo">
  <HeaderBar></HeaderBar>
  <div class="contenido">

    <!-- Linea separacion headerbar -->
    <div class="hr"></div>
    <div v-if="product.blocked_product == null">
    <!-- semantic ui grid -->
    <div class="ui grid">
      <!-- columna imagen -->
      <div class="six wide column">
        <div class="ui segment">
          <div v-if="product.cover == null">
            <img src="../assets/imagenes/noImage.png" width="100%" height="100%">
          </div>
          <div v-else>
            <img v-bind:src="product.cover.url" width="100%" height="100%">
          </div>
        </div>

        <!-- Imagenes Extras -->
        <div class="ui segment">
          <div class="inlinePictures">
            <div v-for="(picture, index) in pictures" :key="index" class="singleProdPicture">
              <img v-bind:src="picture.picture.url" width="100%" height="100%">
            </div>
          </div>
        </div>

        <!-- <div class="ui segment">
          <div class="slider slider1">
            <div class="slides">
              <div v-for="picture in pictures" :key="picture" class="singleProdPicture">
                <div class="slide-item">
                  <img v-bind:src="picture.picture.url" width="100%" height="100%">
                </div>
              </div>
            </div>
          </div>
        </div> -->

      </div>

      <!-- columna info producto -->
      <div class="ten wide column">
        <!-- <div class="ui segment"></div> -->
        <!-- nombre del producto -->
        <h2> {{ product.name }} </h2>
        Seller: <router-link :to="{name: 'user', params: { uId: product.user.id } }"> {{ product.user.name }} </router-link>
        <div class="hr"></div>

        <!-- PRIMER GRUPO DE INFO -->
        <div class="ui grid">
          <div class="right aligned four wide column">
            <p class="pc">Category:</p>
            <p class="pc">Description:</p>
            <p class="pc">Condition:</p>
            <p class="pc">Stock:</p>
          </div>
          <div class="left aligned twelve wide column">
            <p> {{ product.category}} </p>
            <p> {{ product.description}} </p>
            <div v-if="product.is_used == true">
              <p>Pre-Owned</p>
            </div>
            <div v-else>
              <p>New</p>
            </div>
            <div class="nivelar"></div>
            <p> {{ product.stock}} </p>
          </div>
        </div>

        <!-- PARTICION POR PRICE/AUCTION -->
        <div class="ui tertiary segment">
          <div class="ui grid">
            <div class="right aligned four wide column">

              <!-- Auction -->
              <div v-if="product.is_auction == true">
                <p class="pcb1">Currend bid:</p>
              </div>
              <!-- No Auction -->
              <div v-else>
                <div class="priceNum2">
                  <p class="pcb1">Price:</p>
                </div>
              </div>

            </div>
            <div class="left aligned six wide column">

              <!-- Auction -->
              <div v-if="product.is_auction == true">

                <div v-if="product.bids != ''">
                  <p class="pcb2">${{product.bids[bidsLength].bid}} </p>
                </div>
                <div v-else>
                  <p class="pcb2">${{ product.price }}</p>
                </div>
                <div class="leftAligned">
                  <div class="ui input">
                    <input type="text" pattern="[0-9]+" placeholder="Bid" v-model="bidValue">
                  </div>
                </div>
                
              </div>
              <!-- No Auction -->
              <div v-else>
                <div class="priceNum">
                  <p class="pcb2">${{ product.price }}</p>
                </div>
              </div>

            </div>
            <div class="left aligned six wide column">
              <!-- Auction -->
              <div v-if="product.is_auction == true">
                <div v-if="product.bids != ''">
                  <router-link :to="{name: 'productBids', params: { pId: product.id } }">[ {{ product.bids.length }} bids ]</router-link>
                </div>
                <div v-else>
                  <p>[ {{ product.bids.length }} bids ]</p>
                </div>
                <div v-if="uid == product.user.id">
                  <div class="buttonMargin">
                    <button class="ui disabled blue button" v-on:click.prevent="placeBid">Place Bid</button>
                  </div>
                </div>
                <div v-else>
                  <div class="buttonMargin">
                    <button class="ui blue button" v-on:click.prevent="placeBid">Place Bid</button>
                  </div>
                </div>
              </div>
              <!-- No Auction -->
              <div v-else>
                  <div v-if="inCart || uid == product.user.id">
                    <div class="buttonMargin2">
                      <button class="ui disabled blue button" v-on:click.prevent="addToCart($route.params.pId)">Add to Cart</button>
                    </div>
                  </div>
                  <div v-else>
                    <div class="buttonMargin2">
                      <button class="ui blue button" v-on:click.prevent="addToCart($route.params.pId)">Add to Cart</button>
                    </div>
                  </div>
              </div>

            </div>
          </div>
        </div>

        <!-- SEGUNDO GRUPO DE INFO -->
        <div class="ui grid">
          <div class="right aligned four wide column">
            <p class="pc">Shipping Details:</p>
          </div>
          <div class="left aligned twelve wide column">
            <p> {{ product.shipping_description }} </p>
          </div>
        </div>

        <!-- PARTICION POR TITULO ORIGIN DETAILS -->
        <h3>Origin Details</h3>

        <!-- TERCER GRUPI DE INFO -->
        <div class="ui grid">
          <div class="right aligned four wide column">
            <p class="pc">Country:</p>
            <p class="pc">State:</p>
            <p class="pc">City:</p>
            <p class="pc">Postal Code:</p>
            <p class="pc">Address:</p>
            <p class="pc">Description:</p>
          </div>
          <div class="left aligned twelve wide column">
            <p> {{ product.origin.country }} </p>
            <p> {{ product.origin.state }} </p>
            <p> {{ product.origin.city }} </p>
            <p> {{ product.origin.postal_code }} </p>
            <p> {{ product.origin.address }} </p>
            <p> {{ product.origin.description }} </p>
          </div>
        </div>

      </div>
    </div>
    </div>

    <div v-else>
      <div class="ui centered grid">
        <div class="centeredMessage">
          <h2>This product has been blocked.</h2>
        </div>  
      </div>
    </div>


    <!-- <router-link to="/">Home</router-link>
    <div v-if="tokenExists === true">
        <button v-on:click.prevent="userLogout">Logout</button>
    </div>
    <div v-else>
      <router-link to="/login">Login</router-link>
      or 
      <router-link to="/register">Register</router-link>
    </div> -->



    <!-- PARTE FUNCIONAL -->
    <!-- <div v-if="user_owner === true">
      <router-link to="/editProduct">Edit Product</router-link>
    </div>
    <button v-on:click.prevent="test">Test</button>
    <h1>Product Works!</h1>
    <h2>Product to show: {{ $route.params.pId }}</h2>
    <h2> {{ product.name }}</h2>
    <h3>
      USER ID:
      <router-link :to="{name: 'user', params: { uId: product.user_id } }"> {{ product.user_id }} </router-link>
    </h3>
    <h4>Description: {{ product.description }} </h4>
    <h4>Category: {{ product.category }} </h4>
    <h4>Shipping Description: {{ product.shipping_description }} </h4>
    
    <div class="originInfo">
      <h2>Origin Info:</h2>
      <h3>Country: {{ product.origin.country }} </h3>
      <h3>State: {{ product.origin.state }} </h3>
      <h3>City: {{ product.origin.city }} </h3>
      <h3>Postal Code: {{ product.origin.postal_code }} </h3>
      <h3>Address: {{ product.origin.address }} </h3>
      <h3>Description: {{ product.origin.description }} </h3>
    </div>
    
    <h4>User id: {{ product.user_id }} </h4>
    <h4>Stock: {{ product.stock }} </h4>
    <h2>Price: {{ product.price }} </h2>

    <div v-if="product.is_used"> 
      <h4>Product Used</h4>
    </div>
    <div v-else>
      <h4>New Product</h4>
    </div>

    <div v-if="product.is_auction">  
      <h2>Product is Auction</h2>
      <div v-if="product.last_bid === null">
        <h3>Current bid: No current bids </h3>
      </div>
      <div v-else>
        <h3>Current bid: {{ product.last_bid }} </h3>
      </div>
      <input type="text" pattern="[0-9]+" placeholder="Place Bid" v-model="bidValue">
      <button v-on:click.prevent="placeBid">Place Bid</button>
    </div>
    <div v-else>
      <h2>Product is not Auction</h2>
      <button v-on:click.prevent="addToCart(product.id)">Add to Cart</button>
    </div>

    <h4>Date created: {{ product.created_at }} </h4> -->

  </div>
</div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'

var urlServer = 'http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5007';
export default {
  name: 'Product',
  components: {
    HeaderBar
  },
  data(){
      return {
          user_owner: false,
          tokenExists: false,
          id: '',
          product: {
            origin: ''
          },
          userCookie: {
            id: '',
            secret: '',
            expire_at: ''
          },
          bidValue: '',
          cart: [],
          pictures: [],
          bidsLength: 0,
          inCart: false,
          uid: ''
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
          this.uid = userInfo.user_id;
          this.secret = userInfo.secret;
          this.expire_at = userInfo.expire_at;

          this.nameOfUser = userInfo.name;
        }
      },
      loadProductInfo(){
        this.id = this.$route.params.pId;
        this.$http.get(urlServer + '/products/' + this.id).then(function(response){
            this.product = response.data;
            this.pictures = response.data.product_picture;
            setTimeout(() => this.bids = this.product.bids, 500);
            setTimeout(() => this.bidsLength = this.bids.length - 1, 500);
            // console.log('RESPONSE: ' + this.product);
        })
      },
      loadProductOrigin(){
        // this.$http.get(urlServer + '/products/' + this.id).then(function(response){
        //     this.product = response.data;
        // })
        //PENDIENTE PETICION DE HEADER

        this.$http.headers.common.Authorization = 'Token token=' + this.secret;

        // console.log(this.secret);
        // console.log(this.id);

        this.$http.get(urlServer + '/origins/' + this.id, function(data) {
            // console.log(data);
        },
      (err) => {
        console.log("Err", err);
      })
      },
      placeBid(){
        if (this.$cookie.get('secret') == null) {
          this.$router.push('/login');
        } else {
        this.$http.post((urlServer + '/products/' + this.product.id + '/bids'),{
          bid: parseFloat(this.bidValue)
        }
        , {headers: {'Authorization': 'Token token=' + this.secret}})
        .then(response => response.json())
        .then(function(json){
          if (json.id != "0"){
            // console.log("Bid creado con exito");
          }
          // console.log('Data json: ' + json.data);
          setTimeout(() => location.reload(), 500);
        },
        (err) => {
          console.log("Err", err);
        }
        );
        }
      },
      addToCart(productID){
        if (this.$cookie.get('secret') == null) {
          this.$router.push('/login');
        } else {
        var i = 0;
        while (i < this.cart.length && this.inCart == false) {
          if (this.cart[i] == this.$route.params.pId) {
            this.inCart = true;
          }
          i++;
        }
        if (this.inCart == false) {
          this.cart.push(productID);  
          this.$cookie.set('cart', JSON.stringify(this.cart), 1);
          // console.log(this.$cookie.get('cart'));
          setTimeout(() => location.reload(), 500);
        }
        }
      },
      loadCart(){
        this.cart = [];
        if (JSON.parse(this.$cookie.get('cart')) != '' && JSON.parse(this.$cookie.get('cart')) != null){
          this.cart = JSON.parse(this.$cookie.get('cart'));
        } else {
          this.cart = [];
        }
        var i = 0;
        while (i < this.cart.length && this.inCart == false) {
          if (this.cart[i] == this.$route.params.pId) {
            this.inCart = true;
          }
          i++;
        }
      },
      checkOwner(){
        if (this.product.user.id == this.userCookie.id) {
          this.user_owner = true;
          console.log('OWNER:',this.user_owner);
        }
      },
      test(){
        // console.log('URL: ' + urlServer);
        // console.log('Bid value: ' + this.bidValue);
        // console.log('Product ID: ' + this.id);
        // console.log('Secret: ' + this.secret);
      }
  },
  created(){
      this.checkToken();
      this.loadProductInfo();
      this.loadCart();
      this.checkOwner();
      // console.log('COOKIE CART: ');
      // console.log(this.$cookie.get('cart'));
    //   this.loadProductOrigin();
  },
  beforeDestroy(){
      // console.log('DESTRUIDO')
      this.$cookie.set('cart', JSON.stringify(this.cart), 1);
  }
}
</script>

<style src="../assets/css/estilos.css">

</style>

<style scoped>
  p {
    font-size: 15px;
  }
  .pc {
    font-size: 15px;
    color: #797675;
  }
  .pcb1 {
    font-size: 15px;
    color: #797675;
    margin-right: 6px;
    margin-top: 4px;
  }
  .pcb2 {
    font-size: 18px;
    margin-left: -7px;
    font-weight: bold;
  }
  .nivelar{
    height: 15px;
  }
  .leftAligned {
    margin-left: -7px;
    margin-top: 10px;
  }
  .buttonMargin{
    margin-top: 15px;
    margin-left: -30px;
  }
  .buttonMargin2{
    margin-left: -80px;
  }
  .priceNum{
    margin-top: 5px;
  }
  .priceNum2{
    margin-top: 7px;
  }
  .singleProdPicture {
    display: inline-block;
    width: 80px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .inlinePictures {
    overflow-x: scroll;
    overflow-y: hidden;
    height: 80px;
    white-space:nowrap;
  }
  .centeredMessage {
    margin-top: 100px;
    margin-bottom: 50px;
  }

</style>
