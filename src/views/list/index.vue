<template>
  <div>
    <a-button type="primary" class="addbtn" @click="add">
      新增
      </a-button>
      <a-table
        :columns="columns"
        :data-source="data.list"
        rowKey="id"
        @change="changeParams"
        :pagination="{
          current: data.page,
          pageSize: data.limit,
          total: data.count,
          showTitle: true,
          showTotal: (total, range) => `${range[0]}-${range[1]}条 共${total}条`,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '40', '50']
        }"
        >
        <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px"
        >
          <a-input
            v-ant-ref="c => (searchInput = c)"
            placeholder="查找会议"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block;"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            Search
          </a-button>
          <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
            Reset
          </a-button>
        </div>
        <span slot="index" slot-scope="text, record, index">{{ (data.page - 1) * data.limit + index + 1 }}</span>
        <span
          slot="meeting"
          class="meeting-name"
          slot-scope="text, record"
          @click="() => checkInfo(record)"
        >
          {{ text }}
        </span>
        <div slot="action" slot-scope="text, record">
          <span @click="() => edit(record)" class="edit">编辑</span>
          <span>&nbsp;|&nbsp;</span>
          <span @click="() => del(record)" class="edit">删除</span>
        </div>
        <span slot="meetingtime" slot-scope="text">
          {{
            text ? moment(text).utc(8).format('YYYY-MM-DD HH:mm:ss') : ''
          }}
        </span>
    </a-table>
    <template slot="buildOptionText" slot-scope="props">
      <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
      <span v-if="props.value === '50'">全部</span>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import { getList, delMeeting } from '@/api/meeting'
import { message } from 'ant-design-vue'

export default {
  name: 'list',
  data () {
    return {
      columns: [
        {
          dataIndex: 'index',
          key: 'index',
          title: '序号',
          scopedSlots: { customRender: 'index' }
        }, {
          dataIndex: 'meeting',
          key: 'meeting',
          title: '会议名称',
          scopedSlots: {
            customRender: 'meeting',
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon'
          }
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
      data: {
        page: 1,
        limit: 10,
        count: 0,
        list: []
      },
      defaultParams: {
        limit: 10,
        page: 1
      },
      search: ''
    }
  },
  created () {
    this.fetchList()
  },
  mounted () {
  },
  methods: {
    moment,
    handleSearch (selectedKeys, confirm, dataIndex) {
      confirm()
      this.search = selectedKeys.join()
      this.fetchList({
        search: selectedKeys.join()
      })
    },
    handleReset (clearFilters) {
      clearFilters()
      this.search = ''
      this.fetchList({
        search: ''
      })
    },
    fetchList (params) {
      if (this.search !== '') {
        params.search = this.search
      }
      getList({ ...this.defaultParams, ...params }).then(res => {
        if (res.code === 200) {
          this.data = res.data
        }
      })
    },
    changeParams (pagination, filters, sorter, { currentDataSource }) {
      this.fetchList({ limit: pagination.pageSize, page: pagination.current })
    },
    edit (record) {
      this.$router.push(`/meeting/Manage/edit/${record.id}`)
    },
    checkInfo (record) {
      this.$router.push(`/meeting/Manage/Detail/${record.id}`)
    },
    del (record) {
      delMeeting({ id: record.id }).then((res) => {
        if (res.code === 200) {
          message.success('删除成功')
          this.fetchList()
        } else {
          message.error('删除失败')
        }
      })
    },
    add () {
      this.$router.push('/meeting/Manage/add')
    }
  }
}
</script>
<style>
.addbtn {
  margin-bottom:14px
}
.meeting-name {
  cursor: pointer;
}
.edit {
  cursor: pointer;
  color: #40a9ff;
}
</style>
