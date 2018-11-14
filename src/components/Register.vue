<template>
  <div class="register">
    <div class="ui middle aligned center aligned grid">
        <!-- Logo eBay -->
        <router-link to="/">
          <!-- <div class="ui small image"> -->
  				  <img to="/" src="../assets/imagenes/logoCompleto.png" width="90%">
  			  <!-- </div> -->
        </router-link>
        </div>

        <div class="ui middle aligned center aligned grid">
            <div class="column">
                <h2 class="ui red image header">
                    <div class="content">
                        Register your account
                    </div>
                </h2>
                <form class="ui large form">
                    <div class="ui stacked segment">
                        <!-- COMPANY CHECKBOX -->
                        <div class="spaceComponentsRegister">
                            <div class="ui checkbox">
                                <input name="company" type="checkbox" v-model="userData.company">
                                <label>Company</label>
                            </div>
                        </div>

                        <!-- NAME INPUT -->
                        <div class="field">
                            <div class="ui left icon input">
                                <i class="user outline icon"></i>
                                <input type="text" name="name" placeholder="Name" v-model="userData.name">
                            </div>
                        </div>

                        <!-- GENDER SELECTION     -->
                        <div class="spaceComponentsRegister">
                            <div class="inline fields">
                                <label>Gender:</label>
                                <div class="field">
                                    <div class="ui radio checkbox">
                                        <input name="frequency" checked="checked" type="radio" v-model="userData.gender" value="male">
                                        <label>Male</label>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="ui radio checkbox">
                                        <input name="frequency" type="radio" v-model="userData.gender" value="female">
                                        <label>Female</label>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="ui radio checkbox">
                                        <input name="frequency" type="radio" v-model="userData.gender" value="other">
                                        <label>Other</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- BIRTHDAY INPUT -->
                        <div class="field">
                            <div class="ui left icon input">
                                <i class="birthday cake icon"></i>
                                <input type="text" name="birthday" placeholder="DD/MM/YYYY" v-model="userData.birthdate">
                            </div>
                        </div>

                        <!-- EMAIL INPUT -->
                        <div class="field">
                            <div class="ui left icon input">
                                <i class="envelope icon"></i>
                                <input type="text" name="email" placeholder="E-mail address" v-model="userData.email">
                            </div>
                        </div>

                        <!-- USERNAME INPUT -->
                        <div class="field">
                            <div class="ui left icon input">
                                <i class="user icon"></i>
                                <input type="text" name="email" placeholder="Username" v-model="userData.username">
                            </div>
                        </div>

                        <!-- PASSWORD INPUT -->
                        <div class="field">
                            <div class="ui left icon input">
                                <i class="lock icon"></i>
                                <input type="password" name="password" placeholder="Password" v-model="userData.password">
                            </div>
                        </div>
                        <div class="ui fluid large red submit button" v-on:click.prevent="userRegister">Register</div>
                    </div>

                    <div class="ui error message"></div>

                </form>

                <div class="ui message">
                    Already have an account? <router-link to="/login">Login</router-link>
                </div>
            </div>
        </div>

      <!-- PARTE FUNCIONAL -->
      <!-- <router-link to="/">Home</router-link> -->
      <!-- <h1>Register</h1> -->
      <!-- Company: <input type="checkbox" name="checkbox" v-model="userData.company"> -->
      <!-- <input type="text" placeholder="Name" v-model="userData.name">
      <input type="text" placeholder="Username" v-model="userData.username">
      <input type="password" placeholder="Password" v-model="userData.password">
      <input type="text" placeholder="DD/MM/YYYY" v-model="userData.birthdate">
      <input type="text" placeholder="Gender" v-model="userData.gender">
      <input type="text" placeholder="Email" v-model="userData.email">
      <button v-on:click.prevent="userRegister">Register</button> -->
      <!-- <button v-on:click.prevent="test">Test</button> -->
  </div>
</template>

<script>
var urlServer = 'http://ec2-18-191-128-123.us-east-2.compute.amazonaws.com:5005';

export default {
  name: 'Register',
  data(){
      return{
          userData: {
              company: false,
              name: "",
              username: "",
              password: "",
              birthdate: "",
              gender: "",
              email: ""
          }
      }
  },
  methods: {
      userRegister(){
        this.$http.post(urlServer + '/users',{
            company: this.userData.company,
            name: this.userData.name,
            username: this.userData.username,
            password: this.userData.password,
            birthdate: this.userData.birthdate,
            gender: this.userData.gender,
            email: this.userData.email
        }).then(response => response.json())
        .then(function(json){
          if (json.id != "0"){
            //   console.log("Usuario creado con exito");
          }
        },
        (err) => {
          console.log("Err", err);
        }
        );
        setTimeout(() => this.$router.push('/'), 500);
      },
      test(){
          console.log('company',this.userData.company);
          console.log('name',this.userData.name);
          console.log('username',this.userData.username);
          console.log('password',this.userData.password);
          console.log('birthdate',this.userData.birthdate);
          console.log('gender',this.userData.gender);
          console.log('email',this.userData.email);
      }
  },
  created(){

  }
}
</script>

<style scoped>
  .column {
    max-width: 450px;
  }
  .register {
    position: relative;
    transform: translateY(15%);
    margin-bottom: 200px;
  }
</style>

<style src="../assets/css/estilos.css" scoped>

</style>
