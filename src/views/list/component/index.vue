<template>
  <a-form
    :form="form"
    class="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
    @submit="handleSubmit"
    layout="vertical">
    <a-form-item label="会议名称">
       <a-input v-decorator="['meeting',{rules: [{ required: true, message: 'meeting name is required!' }],},]"/>
    </a-form-item>
    <a-form-item label="主办方">
       <a-input v-decorator="['organizer',{rules: [{ required: true, message: 'organizer is required!' }],},]"/>
    </a-form-item>
    <a-form-item label="参与者">
       <a-input v-decorator="['participant',{rules: [{ required: true, message: 'participant is required!' }],},]"/>
    </a-form-item>
    <a-form-item label="会议地址">
       <a-input v-decorator="['address',{rules: [{ required: true, message: 'address is required!' }],},]"/>
    </a-form-item>
    <a-form-item label="腾讯会议号">
       <a-input v-decorator="['meetingnumber',{rules: [{ required: true, message: 'meetingnumber is required!' }],},]"/>
    </a-form-item>
    <a-form-item label="会议时间">
      <a-date-picker
        v-decorator="['meetingtime', {rules: [{ required: true, message: 'meetingtime name is required!' }],}]"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
      />
    </a-form-item>
    <a-form-item label="会议时长">
      <a-range-picker
        v-decorator="['duration', {rules: [{ required: true, message: 'duration is required!' }],}]"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
      />
    </a-form-item>
    <a-form-item label='会议人数'>
      <a-input-number
        :min=1
        v-decorator="[ 'limit', {rules: [{ required: true, message: 'limit is required!' }],},]"
      />
    </a-form-item>
    <a-form-item label="会议图片">
      <a-upload
        :beforeUpload="beforeUpload"
        :multiple="false"
        v-decorator="[
          'upload',
          {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          },
        ]"
        name="logo"
        action="/upload.do"
        list-type="picture"
      >
        <a-button> <a-icon type="upload" /> Click to upload </a-button>
      </a-upload>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">
        提交
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
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'validate_other' })
  },
  methods: {
    handleSubmit: function (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
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

<style scoped>
.form {
 display: flex;
 flex-wrap: wrap;
 justify-content: space-evenly;
 align-items: center;
 width: 100%;
}
.form >>> .ant-form-item {
  width: 33%;
}
</style>
