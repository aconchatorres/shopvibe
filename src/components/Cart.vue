<template>
    <div class="cart">
        <HeaderBar></HeaderBar>
        <br>
        <div class="contenido">
            <h1>Cart</h1>
            <!-- <button v-on:click.prevent="test">Test</button> -->
            <!-- <button v-on:click.prevent="resetCart">Eliminar Cookie Cart</button> -->
            <div class="ui segment">
            <div v-if="cart != ''">
            <div class="spaceReset"></div>
            <button class="ui red basic right floated button" v-on:click.prevent="resetCart">Reset Cart</button>
            <div class="spaceResetBottom"></div>
            <div v-for="(product, index) in cartProducts" :key="index" class="singleProduct">
                <div class="ui grid">
                    <div class="three wide column">
                        <!-- <div class="ui segment"></div> -->
                    <div v-if="product.cover == null">
                        <img src="../assets/imagenes/noImage.png" width="100%" height="100%">
                    </div>
                    <div v-else>
                        <img v-bind:src="product.cover" width="100%" height="100%">
                    </div>
                    </div>
                    <div class="six wide column">
                        <h3>
                            <router-link :to="{name: 'product', params: { pId: product.id } }"> {{ product.name }} </router-link>
                        </h3>
                        <p><b>Description:</b> {{ product.description }}</p>
                        <p><b>Stock:</b> {{ product.stock }}</p>
                        <p><b>Price:</b> {{ product.price }}</p>
                    </div>
                    <div class="three wide column">
                        <!-- <div class="ui segment"></div> -->
                        <div class="ui input">
                            <input type="text" placeholder="Quantity" v-model="quantity[index]">
                        </div>
                        <div class="destiny">
                        <b class="bDestiny">Destiny</b>
                        <select name="origin" id="origin" v-model="destiny[index]">
                            <option v-for ="origin in origins" :key="origin" :value="origin.id" > {{ origin.address }} </option>
                        </select>
                        </div>
                    </div>
                    <div class="three wide center aligned column">
                        <!-- <div class="ui segment"></div> -->
                        <div class="buttonMargin">
                            <button class="ui blue button" v-on:click.prevent="buyProduct(product.id, quantity[index], destiny[index])">Buy</button>
                        </div>
                        <div class="buttonMargin">
                            <button class="ui red button" v-on:click.prevent="remove(product.id)">Remove</button>
                        </div>
                        
                    </div>
                </div>
                <hr>
            </div>
            </div>
            <div v-else>
                <br>    
                <div class="ui centered grid">
                    <h1>No currently products in your cart.</h1>
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
  name: 'Cart',
  components: {
    HeaderBar
  },
  data(){
      return{
          cartProducts: [],
          productResponse: '',
          cart: [],
          quantity: [],
          destiny: [],
          origins: [],
          userCookie: {
            id: '',
            secret: '',
            expire_at: '',
            name: ''
        },
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
          this.name = userInfo.name

          this.nameOfUser = userInfo.name;
      }
    },
      loadCart(){
          if (JSON.parse(this.$cookie.get('cart')) != null) {
        this.cart = JSON.parse(this.$cookie.get('cart'));
        var i;
        for (i = 0; i < this.cart.length; i++) {
            var productID = this.cart[i];
            this.$http.get(urlServer + '/products/' + productID).then(function(response){
                var idServer = response.data.id;
                if (response.data.cover != null) {
                    var coverServer = response.data.cover.url;
                } else {
                    var coverServer = null;
                }
                var nameServer = response.data.name;
                var descriptionServer = response.data.description;
                var stockServer = response.data.stock;
                var priceServer = response.data.price;
                var product = {
                    id: idServer, 
                    cover: coverServer, 
                    name: nameServer, 
                    description: descriptionServer, 
                    stock: stockServer, 
                    price: priceServer
                };
                this.cartProducts.push(product);
            })
        }
        } 
      },
      buyProduct(productid, quantity, destiny){
        //   console.log('productid:',productid);
        //   console.log('quantity:',quantity);
        //   console.log('destiny:',destiny);
        this.$http.post((urlServer + '/purchases'), {headers: {'Authorization': 'Token token=' + this.secret}} ,{
            product_id: productid,
            destiny: destiny,
            quantity: quantity
        }).then(response => response.json())
        .then(function(json){
        },
        (err) => {
          console.log("Err", err);
        }
        );


        // setTimeout(() => 
        //     this.remove(productid),
        //     location.reload()
        // , 500);
      },
      loadUserOrigins(){
            this.$http.get((urlServer + '/origins'), {headers: {'Authorization': 'Token token=' + this.secret}})
            .then(function(response){
                this.origins = response.data;
                // console.log('ORIGINS PRINT: ' + this.origins[0].id);
            }),
            (err) => {
                console.log("Err", err);
            };
        },
        resetCart(){
            this.$cookie.delete('cart');
            setTimeout(() => location.reload(), 500);
        },
        remove(productId){
            // console.log(productId);
            var index = this.cart.indexOf(productId);
            this.cart.splice(index, 1);
            this.$cookie.set('cart', JSON.stringify(this.cart), 1);
            setTimeout(() => location.reload(), 500);
        },
      test(){
          console.log('secret:', this.secret);
      }
  },
  created(){
    this.checkToken();
    this.loadCart();
    this.loadUserOrigins();
    // console.log('COOKIE CART: ');
    // console.log(this.$cookie.get('cart'));
  }
}
</script>

<style src="../assets/css/estilos.css">

</style>

<style scoped>
    .buttonMargin{
        margin-top: 15px;
        margin-left: 30px;
    } 
    .ui input {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .destiny {
        margin-top: 20px;
        margin-left: 10px;
    }
    .bDestiny {
        margin-right: 10px;
    }
    .spaceResetTop {
        height: 10px;
    }
    .spaceResetBottom {
        height: 60px;
    }
</style>
