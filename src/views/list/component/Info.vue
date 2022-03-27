<template>
  <div class="info">
    <a-row>
      <a-col :span="8" class="col"><span>会议名称：</span><span>{{data.meeting}}</span></a-col>
      <a-col :span="8" class="col"><span>主办方：</span><span>{{data.organizer}}</span></a-col>
      <a-col :span="8" class="col"><span>参会者：</span><span>{{data.participant}}</span></a-col>
      <a-col :span="8" class="col"><span>地点：</span><span>{{data.address}}</span></a-col>
      <a-col :span="8" class="col"><span>会议时间：</span><span>{{moment(data.meetingtime).utc(8).format('YYYY-MM-DD HH:mm:ss')}}</span></a-col>
      <a-col :span="8" class="col"><span>会议时长：</span><span>{{data.duration}}</span></a-col>
      <a-col :span="8" class="col"><span>腾讯会议号：</span><span>{{data.meetingnumber}}</span></a-col>
      <a-col :span="8" class="col"><span>会议图片：</span><span>{{data.file}}</span></a-col>
    </a-row>
    <a-row class="btn">
      <a-col :offset="8"><a-button>返回</a-button></a-col>
    </a-row>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'meetingInfo',
  data () {
    return {
      data: {
        id: 2,
        meeting: '会议名称',
        organizer: '主办方',
        participant: '参会方',
        address: '地点',
        meetingtime: 1648209798000,
        duration: 3,
        meetingnumber: 441444,
        file: ''
      }
    }
  },
  methods: {
    moment
  }
}
</script>

<style>
.col {
  height: 100px;
  font-weight: 500;
  font-size: 16px;
}
.btn {
  position: absolute;
  bottom: 0;
  left: 45%;
}
</style>
