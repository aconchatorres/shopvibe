<template>
  <div class="newProduct">
      <HeaderBar></HeaderBar>
      <div class="contenido">
      <!-- <div class="ui segment"> -->
      <!-- <router-link to="/">Home</router-link> -->
      <h1>Create New Product</h1>

        <div class="ui segment">
            <div class="ui grid">
                <div class="right aligned two wide column">
                    <p>Name:</p>
                    <p>Description:</p>
                    <p>Category:</p>
                    <p>Shipping Description:</p>
                    <p>Image:</p>
                </div>

                <div class="five wide column">
                    <!-- <div class="ui segment"></div> -->
                    <div class="inputsForm">
                        <div class="ui input">
                            <input placeholder="Name" type="text" v-model="productData.name">
                        </div>
                    </div>
                    <div class="inputsForm">
                        <div class="ui input">
                            <input placeholder="Description" type="text" v-model="productData.description">
                        </div>
                    </div>
                    <select name="category" id="category" v-model="productData.category">
                        <option v-for ="category in categoriesCookie" :key="category" :value="category"> {{ category }} </option>
                    </select>
                    <div class="inputsForm">
                        <div class="ui input">
                            <input placeholder="Shipping Description" type="text" v-model="productData.shippingDes">
                        </div>
                    </div>
                    <div class="examinar">
                        <input type="file" @change="onFileChanged">
                    </div>
                </div>

                <div class="right aligned two wide column">
                    <p class="p2">Origin:</p>
                    <p class="p2">Stock:</p>
                    <p class="p2">Price:</p>
                    <p class="p2">Used:</p>
                    <!-- <p class="p2">Auction:</p> -->
                </div>

                <div class="four wide column">
                    <!-- <div class="ui segment"></div> -->
                    <div class="originDd">
                        <select name="origin" id="origin" v-model="productData.originID">
                            <option v-for ="origin in origins" :key="origin" :value="origin.id" > {{ origin.address }} </option>
                        </select>
                    </div>
                    <div class="inputsForm">
                        <div class="ui input">
                            <input placeholder="Stock" type="text" v-model="productData.stock">
                        </div>
                    </div>
                    <div class="inputsForm">
                        <div class="ui input">
                            <input placeholder="Price" type="text" v-model="productData.price">
                        </div>
                    </div>
                    <div class="checks">
                        <input type="checkbox" name="checkbox_is_used" v-model="productData.is_used">
                    </div>
                    <!-- <div>
                        <input type="checkbox" name="checkbox_is_auction" v-model="productData.is_auction">
                    </div> -->
                </div>
            </div>

            <div class="ui centered grid">
                <div class="btnCreate">
                    <button class="ui large blue button" v-on:click.prevent="createProduct">Create</button>
                </div>
                <div class="btnCreate">
                    <button class="ui large red button" v-on:click.prevent="cancelCreate">Cancel</button>
                </div>
                    
            </div> 

        </div>










      <!-- <input type="text" placeholder="Name" v-model="productData.name">
      <input type="text" placeholder="Description" v-model="productData.description">
      
      Category:
      <select name="category" id="category" v-model="productCategory">
        <option v-for ="category in categoriesCookie" :key="category" :value="category"> {{ category }} </option>
      </select>
      
      <input type="text" placeholder="Shipping Description" v-model="productData.shippingDes">
      
      Origin: 
      <select name="origin" id="origin" v-model="productData.originID">
          <option v-for ="origin in origins" :key="origin" :value="origin.id" > {{ origin.address }} </option>
      </select>
      
      <input type="text" placeholder="Stock" v-model="productData.stock">
      <input type="text" placeholder="Price" v-model="productData.price">
      Used: <input type="checkbox" name="checkbox_is_used" v-model="productData.is_used">
      Auction: <input type="checkbox" name="checkbox_is_auction" v-model="productData.is_auction">
      <button v-on:click.prevent="createProduct">Create</button> -->

      <!-- <button v-on:click.prevent="test()">Test</button> -->

      <!-- <br>
      <br>
      <input type="file" @change="onFileChanged">
      <button @click="onUpload">Upload</button>
      <pre>
        {{ $data.imgCode | json }}
    </pre> -->
  <!-- </div> -->
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import HeaderBar from './HeaderBar.vue';

var urlServer = 'https://disenosback.ddns.net:2003';
export default {
    name: 'newProduct',
    components: {
        HeaderBar
    },
    data() {
        return{
            imgCode: '',
            imgFile: '',
            selectedFile: null,
            userCookie: {
                id: '',
                secret: '',
                expire_at: ''
            },
            productData: {
                name: '',
                description: '',
                category: '',
                shippingDes: '',
                originID: '',
                stock: '',
                price: '',
                is_used: false,
                is_auction: false
            },
            responseID: '',
            origins: [],
            categoriesCookie: [],
            categoriesServerCookie: [],
            newProductId: '',
            serverCat: '',
            productCategory: '',
            dataURL: '',
            base64: ''
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
        createProduct(){
            this.setCategoryServer(this.productData.category);

            setTimeout(() =>
            this.$http.post((urlServer + '/products'),{
                name: this.productData.name,
                description: this.productData.description,
                category: this.serverCat,
                shipping_description: this.productData.shippingDes,
                origin_id: this.productData.originID,
                stock: this.productData.stock,
                price: this.productData.price,
                is_used: this.productData.is_used,
                is_auction: this.productData.is_auction
            }
            , {headers: {'Authorization': 'Token token=' + this.secret}})
            .then(response => response.json())
            .then(function(json){
                if (json.id != "0"){
                    console.log("Producto creado con exito");
                    this.responseID = json.id;
                    console.log('ID Asignado (Product): ' + this.responseID);
                }
                setTimeout(() => this.newProductId = json.id, 500);
                setTimeout(() => this.onUpload(), 500);
                setTimeout(() => this.$router.push('/'), 500);

                // this.$router.push('/');
                // location.reload();
            },
            (err) => {
                console.log("Err", err);
            }
            ), 500);
            
        },
        loadUserOrigins(){
            // console.log('entra')
            this.$http.get((urlServer + '/origins'), {headers: {'Authorization': 'Token token=' + this.secret}})
            .then(function(response){
                this.origins = response.data;
                // console.log('ORIGINS PRINT: ' + this.origins[0].id);
            }),
            (err) => {
                console.log("Err", err);
            };
        },
        loadCategories(){
            this.categoriesCookie = JSON.parse(this.$cookie.get('categories'));
        },
        loadCategoriesServer(){
            this.categoriesServerCookie = JSON.parse(this.$cookie.get('categoriesServer'));
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
            axios.put((urlServer + '/products/' + this.responseID + '/upload_pictures'), { cover: this.selectedFile}, {headers: {'Authorization': 'Token token=' + this.secret}})
            .then(function(response){
                console.log(response)
            },
            (err) => {
                console.log("Err", err);
            })
        },
        setCategoryServer(catFilter){
            var index = this.categoriesCookie.indexOf(catFilter);
            this.serverCat = this.categoriesServerCookie[index];
        },
        cancelCreate(){
            this.$router.push('/');
        },
        test(){
            this.setCategoryServer(this.productData.category);
            console.log(this.serverCat);
        }
    },
    created(){
        this.checkToken();
        this.loadUserOrigins();
        this.loadCategories();
        this.loadCategoriesServer();
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
        margin-bottom: 25px;
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
    .examinar {
        margin-top: 30px;  
    }
</style>
