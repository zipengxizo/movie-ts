<template>
  <div id="detailContrainer" class="slide-enter-active">
    <Header title="影片详情">
      <i class="iconfont icon-right" @touchstart="handleToBack"></i>
    </Header>
    <Loading v-if="isLoading" />
    <div v-else id="content" class="contentDetail">
      <div class="detail_list">
        <div
          class="detail_list_bg"
          :style="{ 'background-image' : 'url('+ backgroundImg +')' }"
        ></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="detailMovie.img | replaceImgUrl" alt />
          </div>
          <div class="detail_list_info">
            <h2>{{ detailMovie.nm }}</h2>
            <p>{{ detailMovie.enm }}</p>
            <p>{{ detailMovie.sc }}</p>
            <p>{{ detailMovie.cat }}</p>
            <p>{{srcAnddur}}</p>
            <p>{{ detailMovie.pubDesc }}</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>{{ detailMovie.dra }}</p>
      </div>
      <div class="detail_player swiper-container" ref="detail_player">
        <ul class="swiper-wrapper">
          <li v-for="(item,index) in filterPhotos" :key="index" class="swiper-slide">
            <div>
              <img :src="item" alt />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header/index.vue";
import { Component,Prop,Vue} from "vue-property-decorator";
interface DetailMovie {
  photos: string[];
  src: string;
  dur: string;
  img: string;
}
@Component({
  components:{
    Header
  },
  filters:{
     replaceImgUrl(value: string){
      return value.replace(/w\.h/g,'140.127');
    }
  }
})
export default class Detail extends Vue {
  detailMovie: DetailMovie = {photos:[],src:'',dur:'',img:''};
  isLoading = true;
  swiperdemo: any;
  @Prop() private movieId!: number;

  public get filterPhotos(){
      return this.detailMovie.photos && this.detailMovie.photos.map((item: string)=>{
          return item.replace(/w\.h/g,'140.127')
      })
  }
  public get srcAnddur(): string {
        return this.detailMovie.src && `${this.detailMovie.src} / ${this.detailMovie.dur} 分钟` 
  }
  public get backgroundImg(): string {
      return this.detailMovie && this.detailMovie.img.replace(/w\.h/,'148.208')
  }
  handleToBack() {
    this.$router.go(-1);
  }
  destroyed(){
   this.swiperdemo && this.swiperdemo.destroy(false)
  }

  mounted() {
    this.$api.movie
      .movieDetail({ movieId: this.movieId })
      .then((res: any) => {
        const msg = res.data.msg;
        if (msg === "ok") {
          this.isLoading = false;
          this.detailMovie = res.data.data.detailMovie;
          this.$nextTick(() => {
            new window.Swiper(this.$refs.detail_player, {
              slidesPerView: "auto",
              freeMode: true,
              freeModeSticky: true
            });
          });
        }
      })
      .catch((err: string) => {
        this.isLoading = false;
        console.log(err);
      });
  }
}
</script>
<style scoped>
#detailContrainer {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 100%;
  background: white;
}
#detailContrainer.slide-enter-active {
  animation: 0.3s slideMove;
}
@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: 0 40%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}
#content .detail_intro {
  padding: 10px;
}
#content .detail_player {
  margin: 20px;
}
.detail_player .swiper-slide {
  width: 70px;
  margin-right: 20px;
  text-align: center;
  font-size: 14px;
}
.detail_player .swiper-slide img {
  width: 100%;
  margin-bottom: 5px;
}
.detail_player .swiper-slide p:nth-of-type(2) {
  color: #999;
}
</style>
