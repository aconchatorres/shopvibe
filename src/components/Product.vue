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

      </div>

      <!-- columna info producto -->
      <div class="ten wide column">
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

        <!-- PARTICION POR PRICE -->
        <div class="ui tertiary segment">
          <div class="ui grid">
            <div class="right aligned four wide column">

              
              <div v-if="product.is_auction == true">
                <p class="pcb1">Currend bid:</p>
              </div>
              
              <div v-else>
                <div class="priceNum2">
                  <p class="pcb1">Price:</p>
                </div>
              </div>

            </div>
            <div class="left aligned six wide column">
                <div class="priceNum">
                  <p class="pcb2">${{ product.price }}</p>
                </div>

            </div>
            <div class="left aligned six wide column">
                  <div v-if="inCart || uid == product.user.id">
                    <div class="buttonMargin2">
                      <button class="ui disabled red button" v-on:click.prevent="addToCart($route.params.pId)">Add to Cart</button>
                    </div>
                  </div>
                  <div v-else>
                    <div class="buttonMargin2">
                      <button class="ui red button" v-on:click.prevent="addToCart($route.params.pId)">Add to Cart</button>
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
  </div>
</div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'

var urlServer = 'https://disenosback.ddns.net:2003';
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
        })
      },
      loadProductOrigin(){
        this.$http.headers.common.Authorization = 'Token token=' + this.secret;

        this.$http.get(urlServer + '/origins/' + this.id, function(data) {
        },
        (err) => {
          console.log("Err", err);
        })
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
