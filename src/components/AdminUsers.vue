<template>
    <div class="adminUsers">
        <!-- <h1>Admin Users works</h1> -->
        <div v-for="user in users" :key="user" class="card">
            <div class="originCard">
            <div class="ui grid">
                <div class="two wide column">
                    <!-- <div class="ui segment"></div> -->
                    <div v-if="user.picture == null">
                        <img src="../assets/imagenes/avatar.png" width="100%" height="100%">
                    </div>
                    <div v-else>
                        <img v-bind:src="user.picture.url" width="100%" height="100%">
                    </div>
                </div>
                <div class="right aligned two wide column">
                    <!-- <div class="ui segment"></div> -->
                    <p class="pb">Name:</p>
                    <p class="pb">ID:</p>
                    <p class="pb">Username:</p>
                </div>
                <div class="three wide column">
                    <!-- <div class="ui segment"></div> -->
                    <p> {{ user.name }} </p>
                    <p> {{ user.id }} </p>
                    <p> {{ user.username }} </p>
                </div>
                <div class="right aligned two wide column">
                    <!-- <div class="ui segment"></div> -->
                    <p class="pb">Email:</p>
                    <p class="pb">Created at:</p>
                    <p class="pb">Updated at:</p>
                </div>
                <div class="four wide column">
                    <!-- <div class="ui segment"></div> -->
                    <p> {{ user.email }} </p>
                    <p> {{ user.created_at }} </p>
                    <p> {{ user.updated_at }} </p>
                </div>
                <div class="two wide center aligned column">
                    <div class="btnsAdmin">
                        <button class="ui blue button" v-on:click.prevent="gotoUserDetails(user.id)">Details</button>
                    </div>
                    <div class="btnsAdmin">
                        <div v-if="user.block === null">
                            <div v-if="user.role === 'admin'">
                                <button class="ui disabled red button">Block</button>
                                <p>(Admin User)</p>
                            </div>
                            <div v-else>
                                <button class="ui red button" v-on:click.prevent="blockUser(user.id)">Block</button>
                            </div>
                        </div>
                        <div v-else>
                            <button class="ui green button" v-on:click.prevent="unblockUser(user.id)">Unblock</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <hr>
        </div>
        <!-- <button class="ui blue button" v-on:click.prevent="test()">TEST</button> -->
    </div>
</template>

<script>
var urlServer = 'https://disenosback.ddns.net:2003';

export default {
    name: 'AdminUsers',
    data(){
        return{
            users: [],
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
        loadUsers(){
            this.$http.get(urlServer + '/users').then(function(response){
                this.users = response.data;
            })
        },
        gotoUserDetails(userid){
            this.$router.push({name: 'user', params: { uId: userid } });
        },
        blockUser(userid){
            // console.log(this.secret);
            
            this.$http.put((urlServer + '/users/' + userid + '/block'), {emulateJSON:true}, {headers: {'Authorization': 'Token token=' + this.secret}})
            .then(function(response){
                // console.log(response);
            },
            (err) => {
                console.log("Err", err);
            });
            setTimeout(() => location.reload(), 500);
        },
        unblockUser(userid){
            this.$http.put((urlServer + '/users/' + userid + '/unblock'), {emulateJSON:true}, {headers: {'Authorization': 'Token token=' + this.secret}})
            .then(function(response){
                // console.log(response);
            },
            (err) => {
                console.log("Err", err);
            });
            setTimeout(() => location.reload(), 500);
        },
        test() {
            console.log(this.users[1].block)
        }
    },
    created(){
        this.checkToken();
        this.loadUsers();
    }
}
</script>

<style scoped>
    .pb{
        font-weight: bold;
    }
    .btnsAdmin {
        margin-bottom: 10px;
        margin-top: 10px;
    }
</style>