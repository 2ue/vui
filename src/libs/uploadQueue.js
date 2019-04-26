/**
 * @function: 队列上传功能
 * @return: 返回一个promise
 * promise(({ status, successFiles, failedFiles }) => {
 *  status: true表示全部上传成功，false表示全部失败或者部分失败
 *  successFiles: 上传成功的文件
 *  failedFiles: 上传失败的文件
 * }).catch(error => {
 *  报错或者服务错误
 * })
 *
* */

// 初始化实例时默然配置
const DEFAULT_OPTIONS = {
  action: undefined, // 发起请求的实例方法，基于promise模式
  fileName: 'file', // 文件的键值
  uploadConfig: {
    headers: {}, // headers
    params: {},
    data: {}
  },
  uploadAction() {}
}

// 定义一些不能修改的参数配置，防止修改后出错
const NOT_ALLOW_MODIFY_OPTIONS = []

function _getType(para) {
  const type = typeof para
  if (type === 'number' && isNaN(para)) return 'NaN'
  if (type !== 'object') return type
  return Object.prototype.toString
  .call(para)
  .replace(/[\[\]]/g, '')
  .split(' ')[1]
  .toLowerCase()
}

function _isNull(s) {
  const type = _getType(s)
  return type === 'undefined' || type === 'null' || s === ''
}

function _isEmptyObject(s) {
  const type = _getType(s)
  if (s !== 'object') {
    console.error('not a object')
    return
  }
  return Object.keys(s).length === 0
}

//  配置合并，只考虑一般字面量和array，object，不考虑特殊对象
function _mergeConfig (defaultData, data, notAllowModifyOptions) {
  const type = _getType(data)
  if (type === 'object') {
    const mergeData = {}
    const defaultDataKeys = Object.keys(defaultData)
    const dataKeys = Object.keys(data)
    defaultDataKeys.map(key => {
      // 不允许修改的key字段
      if (notAllowModifyOptions.includes(key)) return
      if (dataKeys.includes(key)) {
        mergeData[key] = _mergeConfig(defaultData[key], data[key])
      } else {
        mergeData[key] = defaultData[key]
      }
    })
    dataKeys.map(key => {
      if (!defaultDataKeys.includes(key)) mergeData[key] = data[key]
    })
    return mergeData
  } else if (type === 'array') {
    return data.map(d => _mergeConfig([], d))
  } else {
    return data
  }
}

/**
 * @function: 队列上传功能
 * @param: files [Array]
 * @param:  
 *
* */
export function uploadQueue(files, params) {
  const uploadTask = []
  files.map(file => {
    const formData = new FormData()
    formData.append('file', file.raw || file)  // 添加图片信息的参数
    // 序列化其他参数
    params && Object.keys(params).map(k => {
      formData.append(k, params[k])
    })
    uploadTask.push(axios({
      url: UPLOAD_URL,
      method: 'POST',
      data: formData,
      fetchType: 'file',
      timeout: 1000 * 60 * 10
    }))
  })
  return new Promise((resolve, reject) => {
    Promise.all(uploadTask).then((responses) => {
      const successFiles = []
      const failedFiles = []
      responses.map((response, index) => {
        console.log('response.status====>', response.status)
        if (response.status === 200) {
          successFiles.push(response.data)
        } else {
          failedFiles.push({ ...response.data, _file: files[index] })
        }
      })
      if (successFiles.length === responses.length) {
        // resolve与reject只能接受一个参数，所以在外面用解构的形式接受
        // 成功
        resolve({ status: true, successFiles })
      } else {
        // 有失败
        resolve({ status: false, failedFiles, successFiles })
      }
    }, error => {
      console.error('error===>', error)
      reject(error)
    })
  })
}

