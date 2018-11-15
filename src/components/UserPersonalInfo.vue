<template>
    <div class="personalInfo">
        <div class="headTiBtn">
            <h3>Personal Information</h3>
            <button class="ui right floated basic blue button" v-on:click.prevent="gotoEditInfo">Edit Profile Picture</button>
        </div>
        <br>
        <div class="ui grid">
            <div class="right aligned three wide column">
                <p class="pb">Type:</p>
                <p class="pb">Email:</p>
                <p class="pb">Birthdate:</p>
                <p class="pb">Gender:</p>
                <p class="pb">Created:</p>
            </div>
            <div class="five wide column">
                <p v-if="this.user.company">Company Account</p>
                <p v-else>Personal Account</p>
                <p> {{ user.email }} </p>
                <p> {{ user.birthdate }} </p>
                <p> {{ user.gender }} </p>
                <p> {{ user.created_at }} </p>
            </div>
        </div>
    </div>
</template>

<script>
var urlServer = 'https://disenosback.ddns.net:2003';
export default {
  data(){
      return{
          user: '',
          user_company: false,
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
    loadUserInfo(){
        this.$http.get(urlServer + '/users/' + this.id).then(function(response){
            this.user = response.data.user;
            this.user_company = this.user.company;
        })
        // this.$http.get(urlServer + '/user_seller_score/' + this.userId).then(function(response){
        //     this.user_seller_score = response.data;
        // })
        // this.$http.get(urlServer + '/user_buyer_score/' + this.userId).then(function(response){
        //     this.user_buyer_score = response.data;
        // })
    },
    gotoEditInfo(){
        this.$router.push('/editUserInfo');
    }
  },
  created(){
      this.checkToken();
      this.loadUserInfo();
  }
}
</script>

<style scoped>
    p {
        font-size: 16px;
    }
    .headTiBtn {
        display: inline-block;
        width: 100%;
    }
    h3 {
        display: inline-block;
    }
</style>
