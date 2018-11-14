<template>
  <div class="newProduct">
      <HeaderBar></HeaderBar>
      <div class="contenido">
          <br>
          <!-- <button v-on:click.prevent="test">Test</button> -->
      <!-- <div class="ui segment"> -->
      <!-- <router-link to="/">Home</router-link> -->
      <h1>Create New Origin</h1>
        <div class="ui segment">
            <div class="ui grid">
                <div class="right aligned two wide column">
                    <p>Country:</p>
                    <p>State:</p>
                    <p>City:</p>
                </div>

                <div class="four wide column">
                    <!-- <div class="ui segment"></div> -->
                    <div class="inputsForm">
                        <div class="ui input">
                            <input placeholder="Country" type="text" v-model="originData.country">
                        </div>
                    </div>
                    <div class="inputsForm">
                        <div class="ui input">
                            <input placeholder="State" type="text" v-model="originData.state">
                        </div>
                    </div>
                    <div class="inputsForm">
                        <div class="ui input">
                            <input placeholder="City" type="text" v-model="originData.city">
                        </div>
                    </div>
                    
                </div>

                <div class="right aligned two wide column">
                    <p>Postal Code:</p>
                    <p>Address:</p>
                    <p>Description:</p>
                </div>

                <div class="four wide column">
                    <div class="inputsForm">
                        <div class="ui input">
                            <input placeholder="Postal Code" type="text" v-model="originData.postal_code">
                        </div>
                    </div>
                    <div class="inputsForm">
                        <div class="ui input">
                            <input placeholder="Address" type="text" v-model="originData.address">
                        </div>
                    </div>
                    <div class="inputsForm">
                        <div class="ui input">
                            <input placeholder="Description" type="text" v-model="originData.description">
                        </div>
                    </div>
                </div>
            </div>

            <div class="ui centered grid">
                <div class="btnCreate">
                    <button class="ui large blue button" v-on:click.prevent="createOrigin">Create</button>
                </div>
                <div class="btnCreate">
                    <button class="ui large red button" v-on:click.prevent="cancelCreate">Cancel</button>
                </div>
            </div> 

        </div>
      <!-- <br>
      <br>
      <input type="file" @change="onFileChanged">
      <button @click="onUpload">Upload</button> -->
  <!-- </div> -->
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import HeaderBar from './HeaderBar.vue';

var urlServer = 'http://ec2-18-191-128-123.us-east-2.compute.amazonaws.com:5005';
export default {
    name: 'newOrigin',
    components: {
        HeaderBar
    },
    data() {
        return{
            userCookie: {
                id: '',
                secret: '',
                expire_at: ''
            },
            originData: {
                country:'',
                state:'',
                city:'',
                postal_code:'',
                address:'',
                description:'',
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
        createOrigin(){
            this.$http.post((urlServer + '/origins'),{
                country: this.originData.country,
                state: this.originData.state,
                city: this.originData.city,
                postal_code: this.originData.postal_code,
                address: this.originData.address,
                description: this.originData.description
            }
            , {headers: {'Authorization': 'Token token=' + this.secret}})
            .then(function(response){
                setTimeout(() => this.$router.push('/'), 500);
            },
            (err) => {
                console.log("Err", err);
            }
            );
        },
        cancelCreate(){
            this.$router.push('/');
        },
        test(){
            // console.log(this.originData.country)
        }
    },
    created(){
        this.checkToken();
    }
}
</script>

<style src="../assets/css/estilos.css">

</style>

<style scoped>
    .inputsForm {
        margin-top: 15px;
        margin-bottom: 15px;
    }
    p {
        margin-top: 25px;
        margin-bottom: 32px;
    }
    .originDd {
        margin-top: 25px;
        margin-bottom: 10px;
    }
    .p2 {
        margin-bottom: 30px;
    }
    .checks {
        margin-top: 25px;
        margin-bottom: 30px;
    }
    .btnCreate {
        margin-bottom: 20px;
    }
</style>
