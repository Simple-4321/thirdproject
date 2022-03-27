<template>
  <div>
    <a-button type="primary" class="addbtn" @click="add">
      新增
      </a-button>
      <a-table :columns="columns" :data-source="data" rowKey="id">
      <span slot="index" slot-scope="text, record, index">{{ index }}</span>
      <div slot="action" slot-scope="text, record">
        <a href="#" @click="() => edit(record)">编辑</a>
        <span>&nbsp;|&nbsp;</span>
        <a href="#" @click="() => del(record)">删除</a>
      </div>
      <span slot="meetingtime" slot-scope="text">
        {{
          text ? moment(text).utc(8).format('YYYY-MM-DD HH:mm:ss') : ''
        }}
        </span>
    </a-table>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'list',
  data () {
      return {
          columns: [{
            dataIndex: 'index',
            key: 'index',
            slots: { title: '序号' },
            scopedSlots: { customRender: 'index' }
          }, {
            dataIndex: 'meeting',
            key: 'meeting',
            title: '会议名称'
          }, {
            dataIndex: 'organizer',
            key: 'organizer',
            title: '主办方'
          }, {
            dataIndex: 'participant',
            key: 'participant',
            title: '参会方'
          }, {
            dataIndex: 'address',
            key: 'address',
            title: '地点'
          }, {
            dataIndex: 'meetingtime',
            key: 'meetingtime',
            title: '时间',
            scopedSlots: { customRender: 'meetingtime' }
          }, {
            dataIndex: 'action',
            key: 'action',
            title: '操作',
            scopedSlots: { customRender: 'action' }
          }
      ],
          data: [{
              id: 1,
              meeting: '会议名称',
              organizer: '主办方',
              participant: '参会方',
              address: '地点',
              meetingtime: 1648209798000
          }, {
              id: 2,
              meeting: '会议名称',
              organizer: '主办方',
              participant: '参会方',
              address: '地点',
              meetingtime: 1648209798000
          }]
    }
  },
  methods: {
    moment,
    edit: function () {
      this.$router.push('/list/edit')
    },
    del: function () {
      console.log('bbb')
    },
    add: function () {
      this.$router.push('/list/edit')
    }
  }
}
</script>
<style>
.addbtn {
  margin-bottom:14px
}
</style>
