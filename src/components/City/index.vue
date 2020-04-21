<template>
  <div class="city_body">
    <div class="city_list">
      <Loading v-if="isLoading" />
      <Scroller v-else ref="city_List">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li
                v-for="item in hotList"
                :key="item.id"
                @tap="handleToCity(item.nm , item.id)"
              >{{ item.nm }}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="item in cityList" :key="item.index">
              <h2>{{ item.index }}</h2>
              <ul>
                <li
                  v-for="itemList in item.list"
                  :key="itemList.id"
                  @tap="handleToCity(itemList.nm , itemList.id)"
                >{{ itemList.nm }}</li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(item,index) in cityList"
          :key="item.index"
          @touchstart="handleToIndex(index)"
        >{{ item.index }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "City",
  data() {
    return {
      cityList: [],
      hotList: [],
      isLoading: true
    };
  },
  mounted() {
    this.$api.city
      .cityList()
      .then(res => {
        const msg = res.data.msg;
        if (msg === "ok") {
          this.isLoading = false;
          const cities = res.data.data.cities;
          //[ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
          const { cityList, hotList } = this.formatCityList(cities);
          this.$data.cityList = cityList;
          this.$data.hotList = hotList;
          window.localStorage.setItem("cityList", JSON.stringify(cityList));
          window.localStorage.setItem("hotList", JSON.stringify(hotList));
        }
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err);
      });
  },
  updated(){
      this.$nextTick(function(){
            this.generateScrollTop();
      });
  },
  methods: {
    toCom(firstLetter,cityList) {
        return !cityList.some(item => {
          return item.index === firstLetter;
        });
      },
    formatCityList(cities) {
      const cityList = [];
      let hotList = [];
      hotList = cities.filter(item => {
        return item.isHot === 1;
      });

      for (let i = 0; i < cities.length; i++) {
        const firstLetter = cities[i].py.substring(0, 1).toUpperCase();
        



        if (this.toCom(firstLetter,cityList)) {
          //新添加index
          cityList.push({
            index: firstLetter,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          });
        } else {
          //累加到已有index中
          for (let j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
            }
          }
        }
      }

      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });
      return {
        cityList,
        hotList
      };
    },

    generateScrollTop() {
      if (this.$refs.city_sort) {
        const h2 = this.$refs.city_sort.getElementsByTagName("h2");
        this.offsetTopArr = Array.from(h2).map(item => {
          return item.offsetTop;
        });
      }
    },

    handleToIndex(index) {
      const offsetTop = this.offsetTopArr[index];
      this.$refs.city_sort.parentNode.style.transform =
        "translateY(" + -offsetTop + "px)";
      // this.$refs.city_sort.parentNode.style.transform = `translateY('${offsetTop}'px)`;
    },
    handleToCity(cityName, cityId) {
      this.$store.commit("city/CITY_INFO", { cityName, cityId });
      window.localStorage.setItem("nowNm", cityName);
      window.localStorage.setItem("nowId", cityId);
      this.$router.push("/movie/nowPlaying");
    }
  }
};
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
