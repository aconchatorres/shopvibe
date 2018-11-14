<template>
  <div id="app">
    <vue-headful
            title="Shopvibe"
        />
    <!-- <HeaderBar></HeaderBar> -->
      <!-- <link type="text/css" rel="stylesheet" href="./assets/css/bootstrap.min.css"/>
      <link type="text/css" rel="stylesheet" href="./assets/css/slick.css"/>
      <link type="text/css" rel="stylesheet" href="./assets/css/slick-theme.css"/>
      <link type="text/css" rel="stylesheet" href="./assets/css/nouislider.min.css"/>
      <link rel="stylesheet" href="./assets/css/font-awesome.min.css">
      <link type="text/css" rel="stylesheet" href="./assets/css/style.css"/> -->
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<!-- <script src="./assets/js/jquery.min.js"></script>
<script src="./assets/js/bootstrap.min.js"></script>
<script src="./assets/js/slick.min.js"></script>
<script src="./assets/js/nouislider.min.js"></script>
<script src="./assets/js/jquery.zoom.min.js"></script>
<script src="./assets/js/main.js"></script> -->

<script>
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Footer from './components/Footer.vue'
import HeaderBar from './components/HeaderBar.vue'


export default {
  name: 'app',
  components: {
    Login,
    Home,
    Footer,
    HeaderBar
  },
  data(){
    return {
      categories: [],
      categoriesServer: []
    }
  },
  methods: {
    loadCategories(){
            this.categories[0] = 'All Categories';
			      this.categories[1] = 'Antiques';
						this.categories[2] = 'Art';
						this.categories[3] = 'Baby';
						this.categories[4] = 'Books';
						this.categories[5] = 'Business and Industrial';
						this.categories[6] = 'Cameras and Photo';
						this.categories[7] = 'Cellphones and Accessories';
						this.categories[8] = 'Clothing, Shoes and Accessories';
						this.categories[9] = 'Coins and Paper Money';
						this.categories[10] = 'Collectibles';
						this.categories[11] = 'Computers/Tablets and Networking';
						this.categories[12] = 'Consumer Electronics';
						this.categories[13] = 'Crafts';
						this.categories[14] = 'Dolls and Bears';
						this.categories[15] = 'DVDs and Movies';
						this.categories[16] = 'eBay Motors';
						this.categories[17] = 'Entertainment Memorabilia';
						this.categories[18] = 'Gift Cards and Coupons';
						this.categories[19] = 'Health and Beauty';
						this.categories[20] = 'Home and Garden';
						this.categories[21] = 'Jewelry and Watches';
						this.categories[22] = 'Music';
						this.categories[23] = 'Musical Instruments and Gear';
						this.categories[24] = 'Pet Supplies';
						this.categories[25] = 'Pottery and Glass';
						this.categories[26] = 'Real Estate';
						this.categories[27] = 'Specialty Services';
						this.categories[28] = 'Sporting Goods';
						this.categories[29] = 'Sports Mem, Cards and Fan Shop';
						this.categories[30] = 'Stamps';
						this.categories[31] = 'Tickets and Experiences';
						this.categories[32] = 'Toys and Hobbies';
						this.categories[33] = 'Travel';
						this.categories[34] = 'Video Games and Consoles';
						this.categories[35] = 'Everything Else';
    },
    loadCategoriesServer(){
      this.categoriesServer[0] = 'all_categories';
      this.categoriesServer[1] = 'antiques';
      this.categoriesServer[2] = 'art';
      this.categoriesServer[3] = 'baby';
      this.categoriesServer[4] = 'books';
      this.categoriesServer[5] = 'business_and_industrial';
      this.categoriesServer[6] = 'cameras_and_photo';
      this.categoriesServer[7] = 'cellphones_and_accessories';
      this.categoriesServer[8] = 'clothing_shoes_and_accessories';
      this.categoriesServer[9] = 'coins_and_paper_money';
      this.categoriesServer[10] = 'collectibles';
      this.categoriesServer[11] = 'computers_tablets_and_networking';
      this.categoriesServer[12] = 'consumer_electronics';
      this.categoriesServer[13] = 'crafts';
      this.categoriesServer[14] = 'dolls_and_bears';
      this.categoriesServer[15] = 'dvds_and_movies';
      this.categoriesServer[16] = 'ebay_motors';
      this.categoriesServer[17] = 'entertainment_memorabilia';
      this.categoriesServer[18] = 'gift_cards_and_coupons';
      this.categoriesServer[19] = 'health_and_beauty';
      this.categoriesServer[20] = 'home_and_garden';
      this.categoriesServer[21] = 'jewelry_and_watches';
      this.categoriesServer[22] = 'music';
      this.categoriesServer[23] = 'musical_instruments_and_gear';
      this.categoriesServer[24] = 'pet_supplies';
      this.categoriesServer[25] = 'pottery_and_glass';
      this.categoriesServer[26] = 'real_estate';
      this.categoriesServer[27] = 'specialty_services';
      this.categoriesServer[28] = 'sporting_goods';
      this.categoriesServer[29] = 'sports_mem_cards_and_fan_shop';
      this.categoriesServer[30] = 'stamps';
      this.categoriesServer[31] = 'tickets_and_experiences';
      this.categoriesServer[32] = 'toys_and_hobbies';
      this.categoriesServer[33] = 'travel';
      this.categoriesServer[34] = 'video_games_and_consoles';
      this.categoriesServer[35] = 'everything_else';
    }
  },
  created() {
    this.$cookie.delete('categories');
    this.$cookie.delete('categoriesServer');
    this.loadCategories();
    this.loadCategoriesServer();
    this.$cookie.set('categories', JSON.stringify(this.categories), 1);
    this.$cookie.set('categoriesServer', JSON.stringify(this.categoriesServer), 1);
  },
  mounted(){
    console.log(this.$options.name);
  }
}
</script>

<style>
#app {
  background: #f4f6f7;
  /* height: 100%; */
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* color: #2c3e50;
  margin-top: 60px; */
}
</style>