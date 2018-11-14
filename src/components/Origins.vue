<template>
    <div class="origins">
        <div class="headTiBtn">
            <h3>Origins</h3>
            <button class="ui right floated basic blue button" v-on:click.prevent="gotoNewOrigin">New Origin</button>
        </div>
        <div v-if="origins != ''">
        <div class="ui two cards">
        <div v-for="origin in origins" :key="origin" class="card">
            <div class="originCard">
            <div class="ui grid">
                <div class="right aligned four wide column">
                    <p class="pb">Country:</p>
                    <p class="pb">State:</p>
                    <p class="pb">City:</p>
                    <p class="pb">Postal Code:</p>
                    <p class="pb">Address:</p>
                    <p class="pb">Description:</p>
                </div>
                <div class="ten wide column">
                    <p> {{ origin.country }} </p>
                    <p> {{ origin.state }} </p>
                    <p> {{ origin.city }} </p>
                    <p> {{ origin.postal_code }} </p>
                    <p> {{ origin.address }} </p>
                    <p> {{ origin.description }} </p>
                </div>
            </div>
            </div>
            <hr>
        </div>
        </div>
        </div>
        <div v-else>
            <br>
            <div class="ui centered grid">
                <h1>You have currently no origins.</h1>
            </div>
        </div>
    </div>
</template>

<script>
var urlServer = 'http://ec2-18-191-128-123.us-east-2.compute.amazonaws.com:5005';

export default {
    name: 'origins',
    data(){
        return{
            tokenExists: false,
            userCookie: {
                id: '',
                secret: '',
                expire_at: ''
            },
            origins: []
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
        gotoNewOrigin(){
            this.$router.push('/newOrigin');
        }
    },
    created(){
        this.checkToken();
        this.loadUserOrigins();
    }
}
</script>

<style scope>
    .pb{
        font-weight: bold;
    }
    .originCard {
        margin-top: 10px;
    }
    .headTiBtn {
        display: inline-block;
        width: 100%;
        margin-bottom: 10px;
    }
    h3 {
        display: inline-block;
    }   
</style>
