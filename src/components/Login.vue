<template>
    <div class="login">
      <div class="ui middle aligned center aligned grid">
        <!-- Logo eBay -->
        <router-link to="/">
          <div class="ui small image">
  				  <img to="/" src="../assets/imagenes/basic_trans.png" width="100%">
  			  </div>
        </router-link>
      </div>
      
      <div class="ui middle aligned center aligned grid">
        <div class="column">
          <h2 class="ui blue image header">
            <div class="content">
              Log-in to your account
            </div>
          </h2>
          <form class="ui large form">
            <div class="ui stacked segment">
              <div class="field">
                <div class="ui left icon input">
                  <i class="user icon"></i>
                  <input type="text" name="email" placeholder="Username" v-model="userCredentials.username">
                </div>
              </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" v-model="userCredentials.password">
              </div>
            </div>
          <div class="ui fluid large blue submit button" v-on:click.prevent="userLogin">Login</div>
        </div>

          <div class="ui error message"></div>

          </form>

          <div class="ui message">
            New to us? <router-link to="/register">Sign Up</router-link>
          </div>
        </div>
      </div>

      <!-- PARTE FUNCIONAL -->
      <!-- <h1>Login</h1>
      <input type="text" placeholder="Username" v-model="userCredentials.username">
      <input type="password" placeholder="Password" v-model="userCredentials.password">
      <button v-on:click.prevent="userLogin">Login</button> -->

      <!-- <button v-on:click.prevent="test">Test</button> -->
    </div>
  </template>

<script>
var urlServer = 'http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5007';
export default {
  name: 'Login',
  data() {
    return {
      userCredentials: {
        username: "",
        password: "",
      },
      userCookie: {
          secret: '',
          user_id: '',
          company: '',
          name: '',
          username: '',
          role: '',
          email: '',
          birthdate: '',
          gender: '',
          created_at: '',
          expire_at: '',
          password: '',
          picture: '',
          block: ''
      },
    }
  },
  methods: {
    userLogin: function() {
      // console.log('SIRVE');
      this.$http.post((urlServer + '/sessions'),{
        username: this.userCredentials.username,
        password: this.userCredentials.password
      }).then(response => response.json())
      .then(function(json){
        // console.log('USER LOGIN' + json);
        this.userCookie.user_id = json.user_id;
        this.userCookie.secret = json.secret;
        this.userCookie.expire_at = json.expire_at;
        this.extraData(json.user_id);
        setTimeout(() => this.$router.push('/'), 500);
      },
      (err) => {
        console.log("Err", err.body.single_authentication);
        if (err.body.single_authentication == 'invalid credentials') {
          alert("Invalid Credentials");
          this.userCredentials.username = '';
          this.userCredentials.password = '';
        } else if (err.body.single_authentication == 'user is blocked') {
          alert("This user has been blocked.");
          this.userCredentials.username = '';
          this.userCredentials.password = '';
        } else {
          setTimeout(() => this.$router.push('/'), 500);
        }
      }
      );
    },
    extraData(user_id){
      // PETICIONES DE DATOS EXTRA DEL USUARIO PARA GUARDAR EN COOKIE
      this.$http.get(urlServer + '/users/' + user_id)
      .then(response => response.json())
      .then(function(json){
        // console.log('EXTRA DATA' + json);
        this.userCookie.company = json.user.company;
        this.userCookie.name = json.user.name;
        this.userCookie.username = json.user.username;
        this.userCookie.role = json.user.role;
        this.userCookie.email = json.user.email;
        this.userCookie.birthdate = json.user.birthdate;
        this.userCookie.gender = json.user.gender;
        this.userCookie.created_at = json.user.created_at;
        this.userCookie.picture = json.user.picture;
        this.userCookie.block = json.user.block;

        this.userCookie.password = this.userCredentials.password
        
        this.$cookie.set('secret', JSON.stringify(this.userCookie), 1);
        // console.log('COOKIE SECRET: ' + this.$cookie.get('secret'));
      })      
    },
    test(){

    }
    
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .column {
    max-width: 450px;
  }
  .login {
    position: relative;
    transform: translateY(40%);
    margin-bottom: 320px;
  }
</style>
