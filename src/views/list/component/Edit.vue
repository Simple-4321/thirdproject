<template>
  <a-form
    :form="form"
    class="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
    @submit="handleSubmit"
    layout="vertical">
    <div class="flex-wrapper">
      <a-form-item label="会议名称">
        <a-input
          :placeholder="$t('please input meeting name')"
          v-decorator="
            ['meeting',
              {rules: [{ required: true, message: $t('please input meeting name') }]
            }]"
          />
      </a-form-item>
      <a-form-item label="主办方">
        <a-input
          :placeholder="$t('please input organizer')"
          v-decorator="
            ['organizer',
              {rules: [{ required: true, message: $t('please input organizer') }]
              }
            ]"
          />
      </a-form-item>
      <a-form-item label="参与者">
        <a-input
          :placeholder="$t('please input participant')"
          v-decorator="
            ['participant',
              {rules: [{ required: true, message: $t('please input participant') }]
              },
            ]"
          />
      </a-form-item>
      <a-form-item label="会议地址">
        <a-input
          :placeholder="$t('please input address')"
          v-decorator="['address',
              {rules: [{ required: true, message: $t('please input address') }]}
          ]"
          />
      </a-form-item>
      <a-form-item label="腾讯会议号">
        <a-input
          :placeholder="$t('please input meetingnumber')"
          v-decorator="['meetingnumber',
              {rules: [{ required: true, message: $t('please input meetingnumber') }]}
            ]"
          />
      </a-form-item>
          <a-form-item label='参会人上限'>
        <a-input-number
          :placeholder="$t('please input limit')"
          :min=1
          v-decorator="[ 'limit',
            {rules: [{ required: true, message: $t('please input limit') }]}
          ]"
        />
      </a-form-item>
    </div>
    <div class="time-wrapper">
      <a-form-item label="会议时间">
        <a-date-picker
          :placeholder="$t('please input meetingtime')"
          v-decorator="['meetingtime',
            {rules: [{ required: true, message: $t('please input meetingtime') }]}
            ]"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>
      <a-form-item label="会议时长">
        <a-range-picker
          v-decorator="['duration',
            {rules: [{ required: true, message: $t('please input duration') }]}
          ]"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>
    <a-form-item label="会议图片" class="meeting-img">
      <a-upload
        :beforeUpload="beforeUpload"
        :multiple="false"
        list-type="picture"
        :file-list="fileList"
        class="upload-btn"
        name="file"
        action="http://192.168.0.9:8000/upload"
        @change="handleFileChange"
      >
        <a-button> <a-icon type="upload" />点击上传</a-button>
      </a-upload>
    </a-form-item>
    </div>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }" class="sub-btn">
      <a-button type="primary" html-type="submit">
        提交
      </a-button>
      <a-button @click="() => this.$router.push('/meeting/Manage/list')">
        取消
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'EditFrom',
  data: () => {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      fileList: [],
      editInfo: {}
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'validate' })
  },
  created () {
    this.$watch(
      () => {
        if (this.$route.params.type === 'edit' && this.$route.query) {
          console.log(this.$route.query.id)
          if (this.$route.query.id) {
            this.editInfo = {
              meeting: '会议名称'
            }
          }
        }
      }
    )
  },
  mounted () {
    this.form.setFieldsValue({
      ...this.editInfo
    }, () => {})
  },
  methods: {
    handleFileChange: function (info) {
      let fileList = [...info.fileList]
      fileList = fileList.slice(-1)
      this.fileList = fileList
    },
    handleSubmit: function (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(this.fileList)
          console.log('Received values of form: ', values)
        }
      })
    },
    normFile (e) {
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    beforeUpload (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="less">
.flex-wrapper {
 display: flex;
 flex-wrap: wrap;
 justify-content: space-evenly;
 align-items: center;
 width: 100%;
}
.time-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  /deep/ .ant-form-item {
    width: 33% !important;
  }
}
.form {
  .meeting-img {
    height: 200px;
  }
   /deep/ .ant-form-item {
    width: 33%;
  }
   /deep/ .ant-form-item-children {
     width: 100%;
     > div {
       width: 100%;
     }
     > span {
       display: block;
       width: 100% !important;
     }
     .upload-btn {
       width: 100%;
       > div {
         width: 100% !important;
         .ant-btn {
           width: 100%;
         }
       }
     }
  }
  .sub-btn {
    position: absolute;
    bottom: 0;
    left: 40%;
    /deep/ .ant-btn {
      margin-right: 16px;
    }
  }
}
</style>
