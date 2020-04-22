<template>
  <div class="movie_body" ref="movie_body">
    <section v-if="errored">
      <p style="text-align:center;">对不起，无法获取信息，请稍后再试.</p>
    </section>
    <Loading v-if="isLoading" />
    <Scroller v-else v-on:handleToScroll="handleToScroll" v-on:handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="pullDown">{{ pullDownMsg }}</li>
        <li v-for="(item, index) in movieList" :key="index">
          <div class="pic_show" @tap="handleToDetail(item.id)">
            <img :src="item.img | replaceWh('128.180')" />
          </div>
          <div class="info_list">
            <h2 @tap="handleToDetail(item.id)">
              {{ item.nm }}
              <img v-if="item.version" src="@/assets/maxs.png" alt />
            </h2>
            <p>
              观众评
              <span class="grade">{{ item.sc }}</span>
            </p>
            <p>主演: {{ item.star }}</p>
            <p>{{ item.showInfo }}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class NowPlaying extends Vue {
  // 原来的data
  isLoading = false;
  movieList = [];
  pullDownMsg = "";
  prevCityId = -1;
  errored = false;
  //原来的prop
  @Prop() private movieId!: number

  handleToDetail(movieId: number): void {
    this.$router.push(`/movie/detail/${movieId}`);
  }

  handleToScroll(pos: any) {
    if (pos.y > 30) {
      this.pullDownMsg = "正在更新....";
    }
  }
  handleToTouchEnd(pos: any) {
    if (pos.y > 30) {
      const cityId = this.$store.state.city.cityId;
      this.$api.movie
        .movieOnList({ cityId: cityId })
        .then((res: any) => {
          const status = res.data.status;
          if (status === 0) {
            this.pullDownMsg = "更新成功";
            setTimeout(() => {
              this.movieList = this.movieList.concat(res.data.data.movieList);
              this.pullDownMsg = "";
            }, 1000);
          }
        })
        .catch((err: string) => {
          console.log(err);
          this.errored = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
  activated() {
    const cityId = this.$store.state.city.cityId;
    if (this.prevCityId == cityId) return;
    this.isLoading = true;
    this.$api.movie
      .movieOnList({ cityId: cityId })
      .then((res: any) => {
        const status = res.data.status;
        if (status === 0) {
          this.movieList = res.data.data.movieList;
          this.isLoading = false;
          this.prevCityId = cityId;
        }
      })
      .catch((err: string) => {
        console.log(err);
        this.isLoading = false;
      }).finally(()=>{
        this.isLoading = false;
      })
  }
}
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pullDown {
  margin: 0;
  padding: 0;
  border: none;
  justify-content: center;
}
</style>