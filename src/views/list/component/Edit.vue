<template>
  <div>
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
          action="http://localhost:3000/file"
          @change="handleFileChange"
        >
          <a-button> <a-icon type="upload" />点击上传</a-button>
        </a-upload>
      </a-form-item>
      </div>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }" class="sub-btn">
        <a-button type="primary" html-type="submit" :loading="uploading">
          提交
        </a-button>
        <a-button @click="() => this.$router.push('/meeting/Manage/list')">
          取消
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import { addMeeting, getMeetingInfo, updateMeeting } from '@/api/meeting'
export default {
  name: 'EditFrom',
  data: () => {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      fileList: [],
      editInfo: {},
      uploading: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'validate' })
  },
  mounted () {
    if (typeof (this.$route.params.id) !== 'undefined') {
      getMeetingInfo({ id: this.$route.params.id }).then(res => {
        if (res.code === 200) {
          const file = {
            uid: res.data.file.id,
            status: 'done',
            name: res.data.file.filename,
            url: res.data.file.url,
            response: {
              code: 200,
              data: res.data.file,
              message: ''
            }
          }
          this.fileList = [file]
          this.form.setFieldsValue({
            ...res.data
          }, () => {})
        }
      })
    }
  },
  methods: {
    handleCancel (e) {
      this.visible = false
    },
    handleFileChange (info) {
      let fileList = [...info.fileList]
      fileList = fileList.slice(-1)
      this.fileList = fileList
      if (info.file.status === 'done' && info.file.response?.code === 200) {
        this.fileList[0].thumbUrl = info.file.response.data.url
      } else {
        info.file.response = info.file.response?.message
      }
    },
    getBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.uploading = true
          let file = {}
          if (this.fileList.length !== 0) {
            file = this.fileList[0]
            if (file.status !== 'done') {
              message.warn('请确认文件上传状态')
              return
            }
          }
          if (typeof (this.$route.params.id) !== 'undefined') {
            updateMeeting({ id: this.$route.params.id, file: file.response.data || file, ...values }).then(res => {
              if (res.code === 200) {
                this.uploading = false
                message.success('更新成功')
                this.$router.push('/meeting/Manage/list')
              } else {
                this.uploading = false
                message.error('更新失败，请稍后重试')
              }
            })
          } else {
            addMeeting({ file: file.response.data || file, ...values }).then(res => {
              if (res.code === 200) {
                this.uploading = false
                message.success('上传成功，正在跳转列表页')
                this.$router.push('/meeting/Manage/list')
              } else {
                this.uploading = false
                message.error('保存失败，请稍后重试')
              }
            })
          }
        }
      })
    },
    normFile (e) {
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    beforeUpload (file) {
      if (file.size >= 10 * 1024 * 1024 || !file.name.match(/\.(jpg|jpeg|bmp|gif|png)$/)) {
        message.warn('文件格式错误')
        return new Promise((resolve, reject) => {
          reject(new Error('error'))
        })
      }
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
