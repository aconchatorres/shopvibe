<template>
<div class=todo>
<HeaderBar></HeaderBar>
  <div class="contenido">
    <br>
    <div v-if="user.blocked_user == null">
      <img src="../assets/imagenes/profile_coverimg_wood.jpg" width="100%">
      <div class="userSegment">
        <div class="ui center raised segment">
            <div class="ui grid">
                <div class="three wide column">
                    <div class="imageSegment">
                    <div v-if="user.picture == null">
                        <img src="../assets/imagenes/avatar.png" width="100%" height="100%">
                    </div>
                    <div v-else>
                        <img v-bind:src="user.picture.url" width="100%" height="100%">
                    </div>
                    </div>
                </div>
                <div class="seven wide column">
                    <h3> {{ user.name }} </h3>
                    <p class="usernameText"> {{ user.username }} </p>
                </div>
                
                <div class="right aligned six wide column">
                    <div v-if="user_owner === true">
                        <h3>Seller Score:</h3>
                        <p v-if="this.user_seller_score == ''"> No ratings </p>
                        <p v-else>  {{ this.user_seller_score }} </p>
                        <h3>Buyer Score:</h3>
                        <p v-if="this.user_buyer_score == ''"> No ratings </p>
                        <p v-else>  {{ this.user_buyer_score }} </p>
                    </div>
                </div>
            </div>
            
        </div>
      </div>

    <div v-if="user_owner === true">
        <br>
        <div class="ui secondary pointing menu">
            <a class="item" :class="{ active: isPInfoActive }" @click="switchTabs('pInfo')">
                <router-link to="/pInfo">Personal Information</router-link>
            </a>
            <a class="item" :class="{ active: isOriginsActive }" @click="switchTabs('origins')">
                <router-link to="/origins">Origins</router-link>
            </a>
            <a class="item" :class="{ active: isUserProductsActive }" @click="switchTabs('userProducts')">
                <router-link to="/userProducts">My Products</router-link>
            </a>
            <a class="item" :class="{ active: isPurchasesActive }" @click="switchTabs('purchases')">
                <router-link to="/purchases">Purchases</router-link>
            </a>
            <a class="item" :class="{ active: isSalesActive }" @click="switchTabs('sales')">
                <router-link to="/sales">Sales</router-link>
            </a>
            <!-- <a class="item" :class="{ active: isBidsActive }" @click="switchTabs('bids')">
                <router-link to="/bids">Bids</router-link>
            </a> -->
        </div>
        <div v-if="clicked == true">
            <div class="ui segment">
                <router-view/>
            </div>
        </div>
    </div>

    <div v-else>
        <br>
        <div class="ui centered grid">
            <div class="row">
                <h1>Seller Score</h1>
            </div>
            <div class="row">
                <!-- <h1> {{ this.user_seller_score }} </h1> -->
                <h3 v-if="this.user_seller_score == ''"> No ratings </h3>
                <h3 v-else>  {{ this.user_seller_score }} </h3>
            </div>
            <div class="row">
                <h1>Buyer Score</h1>
            </div>
            <div class="row">
                <!-- <h1> {{ this.user_buyer_score }} </h1> -->
                <h3 v-if="this.user_buyer_score == ''"> No ratings </h3>
                <h3 v-else>  {{ this.user_buyer_score }} </h3>
            </div>
        </div>
    </div>

      <!-- <div v-if="tokenExists === true">
        <div v-if="user_owner === true">
            <router-link to="/editUserInfo">Edit Information</router-link>
            <router-link :to="{name: 'newProduct'}">
                <button id="myButton" class="foo bar">Create Product</button>
            </router-link>
        </div>
        
      </div>
      <button v-on:click.prevent="test">Test</button>
      <h1>User Info</h1>
      <h2> {{ user.name }} </h2>
      <h3 v-if="this.user.company">Company Account</h3>
      <h3 v-else>Personal Account</h3>
      <h3>Username: {{ user.username }} </h3>
      <h3>Email: {{ user.email }} </h3>
      <h3>Birthdate: {{ user.birthdate }} </h3>
      <h3>Gender: {{ user.gender }} </h3>
      <br>
      <h2>User Seller-Score</h2>
      <h3> {{ this.user_seller_score }} </h3>
      <h2>User Buyer-Score</h2>
      <h3> {{ this.user_buyer_score }} </h3>
      <br>
      <h2>Origins</h2>
      <div v-for="origin in origins" :key="origin" class="singleOrigin">
          <h3>Country: {{ origin.country }} </h3>
          <h3>State: {{ origin.state }} </h3>
          <h3>City: {{ origin.city }} </h3>
          <h3>Postal Code: {{ origin.postal_code }} </h3>
          <h3>Address: {{ origin.address }} </h3>
          <h3>Description: {{ origin.description }} </h3>
          <hr>
      </div> -->
      <!-- <pre>
        {{ $data | response }}
      </pre> -->
      </div>
      <div v-else>
          <br>
          <br>
          <br>
          <br>
          <div class="ui centered grid">
            <h1>This user has been blocked.</h1>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'

var urlServer = 'http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5007';
export default {
  name: 'User',
  components: {
    HeaderBar
  },
  data(){
      return{
          user_owner: false,
          user_buyer_score: '',
          user_seller_score: '',
          tokenExists: false,
          userId: '',
          user: [],
          user_company: false,
          userCookie: {
            id: '',
            secret: '',
            expire_at: ''
          },
          origins: [],
          isPInfoActive: false,
          isOriginsActive: false,
          isUserProductsActive: false,
          isPurchasesActive: false,
          isSalesActive: false,
          isBidsActive: false,
          clicked: false
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
    loadUserInfo(){
        this.userId = this.$route.params.uId;
        this.$http.get(urlServer + '/users/' + this.$route.params.uId).then(function(response){
            this.user = response.data.user;
            this.user_company = this.user.company;
        });

        // console.log(this.$route.params.uId)
        // console.log(urlServer)
        this.$http.get(urlServer + '/user_seller_score/' + this.$route.params.uId).then(function(response){
            this.user_seller_score = response.data;
            // console.log('seller response: ' + response.data);
        }),
        (err) => {
          console.log("Err", err);
        },
        (Authorization) => {
            console.log("Auth", Authorization)
        };

        this.$http.get(urlServer + '/user_buyer_score/' + this.$route.params.uId).then(function(response){
            this.user_buyer_score = response.data;
            // console.log('buyer response: ' + response.data);
        }),
        (err) => {
          console.log("Err", err);
        };
    },
    loadUserOrigins(){
        this.$http.get((urlServer + '/origins'), {headers: {'Authorization': 'Token token=' + this.secret}})
        .then(function(response){
            this.origins = response.data;
        }),
        (err) => {
          console.log("Err", err);
        };
    },
    checkUserOwner(){
        if (this.userId === this.id){
          this.user_owner = true;
        }
    },
    switchTabs(tab) {
      this.clicked = true;
      if (tab === 'pInfo') {
        this.isPInfoActive = true;
        this.isOriginsActive = false;
        this.isUserProductsActive = false;
        this.isPurchasesActive = false;
        this.isSalesActive = false;
        this.isBidsActive = false;
      } else if (tab === 'origins') {
        this.isPInfoActive = false;
        this.isOriginsActive = true;
        this.isUserProductsActive = false;
        this.isPurchasesActive = false;
        this.isSalesActive = false;
        this.isBidsActive = false;
      } else if (tab === 'userProducts') {
        this.isPInfoActive = false;
        this.isOriginsActive = false;
        this.isUserProductsActive = true;
        this.isPurchasesActive = false;
        this.isSalesActive = false;
        this.isBidsActive = false;
      } else if (tab === 'purchases') {
        this.isPInfoActive = false;
        this.isOriginsActive = false;
        this.isUserProductsActive = false;
        this.isPurchasesActive = true;
        this.isSalesActive = false;
        this.isBidsActive = false;
      } else if (tab === 'sales') {
        this.isPInfoActive = false;
        this.isOriginsActive = false;
        this.isUserProductsActive = false;
        this.isPurchasesActive = false;
        this.isSalesActive = true;
        this.isBidsActive = false;
      } else {
      	this.isPInfoActive = false;
        this.isOriginsActive = false;
        this.isUserProductsActive = false;
        this.isPurchasesActive = false;
        this.isSalesActive = false;
        this.isBidsActive = true;
      }
    }
  },
  created(){
      this.checkToken();
      this.loadUserInfo();
      this.checkUserOwner();
  }
}
</script>

<style src="../assets/css/estilos.css">

</style>

<style scoped>
    .userSegment{
        width: 80%;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        margin-top: -177px;
    }
    .usernameText {
        color: #797675;
        margin-top: -10px;
    }
    .space{
        margin-top:15px;
        margin-bottom:10px;
        width: 100vh;
        /* background: red; */
    }
    .pb{
        font-weight: bold;
    }
    .imageSegment {
        height: 142px;
    }
</style>
