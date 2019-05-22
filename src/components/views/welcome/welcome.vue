<template>

  <div class="view">
    <div class="text">
      <span>{{currentDate}}</span>
      <span>{{currentDay}}</span>
      <span>{{currentTime}}</span>
      <el-image :src="src"></el-image>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: "",
      currentTime: "",
      currentDay: "",
      value: new Date(),
    };
  },
  mounted() {
    var date;
    var year;
    var mon;
    var da;
    var day;
    var h;
    var m;
    var s;
    var week;
    var mm;
    var ss;
    setInterval(() => {
      date = new Date();
      year = date.getFullYear(); //获取当前年份
      mon = date.getMonth() + 1; //获取当前月份
      da = date.getDate(); //获取当前日
      day = date.getDay(); //获取当前星期几
      h = date.getHours(); //获取小时
      m = date.getMinutes(); //获取分钟
      s = date.getSeconds(); //获取秒
      // 当分秒不足10时，前面加0
      if (m < 10) {
        mm = "0" + m;
      } else {
        mm = m;
      }
      if (s < 10) {
        ss = "0" + s;
      } else {
        ss = s;
      }
      if (day === 1) {
        week = "一";
      } else if (day === 2) {
        week = "二";
      } else if (day === 3) {
        week = "三";
      } else if (day === 4) {
        week = "四";
      } else if (day === 5) {
        week = "五";
      } else if (day === 6) {
        week = "六";
      } else if (day === 0) {
        week = "日";
      }
      this.currentDate = year + "年" + mon + "月" + da + "日";
      this.currentTime = h + ":" + mm + ":" + ss;
      this.currentDay = "星期" + week;
    }, 1000);
  }
};
</script>

<style lang="less" scoped>
.view {
  margin: 0;
  padding: 0;
}
.bg {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 0;
  background: url()
}

.text {
  // position: absolute;
  // top: 6rem;
  // left: 6rem;
  // width: 22rem;
  text-align: center;
  font-size: 2rem;
  // border: 1px solid black;
}
</style>
