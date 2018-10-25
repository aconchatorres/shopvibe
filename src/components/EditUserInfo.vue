<template>
<div class="todo">
  <HeaderBar></HeaderBar>
  <div class="contenido">
      <!-- <button v-on:click.prevent="test">Test</button> -->
      <br>
      <h1>Edit Profile Picture</h1>
      <!-- Company: <input type="checkbox" v-model="acCompany">
      <input type="text" v-model="acName">
      <input type="text" v-model="acUsername">
      <input type="text" v-model="acPassword">
      <input type="text" v-model="acBirthdate">
      <input type="text" v-model="acGender">
      <input type="text" v-model="acEmail">
      <br>
      <b>Profile Picture</b> -->
      <input type="file" @change="onFileChanged">
      <br>
      <br>
      <button v-on:click.prevent="updateInfo">Update</button>
      <!-- <button v-on:click.prevent="test">Test</button> -->
  </div>
</div>
</template>

<script>
import axios from 'axios';
import HeaderBar from './HeaderBar.vue'

var urlServer = 'http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5007';
export default {
  name: 'EditUserInfo',
  components: {
    HeaderBar
  },
  data(){
      return{
        element: [],
        tokenExists: false,
        userCookie: {
          id: '',
          secret: '',
          expire_at: ''
       },
       newUserInfo: {
           nuCompany: '',
           nuName: '',
           nuUsername: '',
           nuEmail: '',
           nuBirthdate: '',
           nuGender: '',
           nuPassword: ''
       },
       actualUserInfo: {
           acCompany: false,
           acName: '',
           acUsername: '',
           acEmail: '',
           acBirthdate: '',
           acGender: '',
           acPassword: ''
       }
      }
  },
  methods: {
    checkToken(){
      if (this.$cookie.get('secret') == null){
          this.tokenExists = false;
      }else{
          this.tokenExists = true;
          // console.log("COOKIE: " + this.$cookie.get('secret'));
          var userInfo = JSON.parse(this.$cookie.get('secret'));
          this.id = userInfo.user_id;
          this.secret = userInfo.secret;
          this.expire_at = userInfo.expire_at;
          
          this.acName = userInfo.name;
          this.acUsername = userInfo.username;
          this.acEmail = userInfo.email;
          this.acBirthdate = userInfo.birthdate;
          this.acGender = userInfo.gender;
          this.acPassword = userInfo.password;
          // console.log('PASSWORD: ' + this.acPassword);
          this.nameOfUser = userInfo.name;
      }
    },
    updateInfo(){
        this.onUpload();
        // console.log('AAAAAAAA');
        // console.log('company',this.acCompany);
        // console.log('name',this.acName);
        // console.log('username',this.acUsername);
        // console.log('email',this.acEmail);
        // console.log('birthdate',this.acBirthdate);
        // console.log('gender',this.acGender);
        // console.log('password',this.acPassword);
        
        axios.put((urlServer + '/users/2'), {headers: {'Authorization': 'Token token=f7f2c36b7e0946f2b084fa40f312f324'}},{data: {
        // axios.put((urlServer + '/users/' + this.id), {headers: {'Authorization': 'Token token='+ this.secret}},{data: {
        // this.$http.put((urlServer + '/users/2'),{headers: {'Authorization': 'Token token=f7f2c36b7e0946f2b084fa40f312f324'}},{
        // this.$http.put((urlServer + '/users/' + this.id),{headers: {'Authorization': 'Token token=' + this.secret}},{
            company: this.acCompany,
            name: this.acName,
            username: this.acUsername,
            password: this.acPassword,
            birthdate: this.acBirthdate,
            gender: this.acGender,
            email: this.acEmail
        }}).then(response => response.json())
        .then(function(json){
          if (json.id != "0"){
              console.log("Informacion Actualizada");
          }
        //   setTimeout(() => this.$router.push('/'), 500);
        },
        (err) => {
          console.log("Err", err);
        }
        );
    },
    onFileChanged (event) {
        this.selectedFile = event.target.files[0];
        var reader = new FileReader();

        reader.readAsDataURL(this.selectedFile)
        console.log(reader.result)
        reader.onload = (event) => {
            console.log(event.target.result)
            this.selectedFile = event.target.result
        }
    },
    onUpload(){
        axios.put((urlServer + '/profile_pictures'), { image: this.selectedFile}, {headers: {'Authorization': 'Token token=' + this.secret}})
        .then(function(response){
            console.log(response)
        },
        (err) => {
            console.log("Err", err);
        })
        setTimeout(() => this.$router.push('/'), 500);
    },
    test(){
        // console.log('secret', this.secret)
        // console.log('id', this.id)

        // console.log('company',this.acCompany)
        // console.log('name',this.acName)
        // console.log('username',this.acUsername)
        // console.log('email',this.acEmail)
        // console.log('birthdate',this.acBirthdate)
        // console.log('gender',this.acGender)
        // console.log('password',this.acPassword)
    }
  },
  created(){
        this.acCompany = false;
        this.checkToken();
  }
}
</script>

<style src="../assets/css/estilos.css">

</style>

<style>

</style>
