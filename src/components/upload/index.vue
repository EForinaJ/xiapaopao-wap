<template>
    <view>
        <u-upload
		    :fileList="fileList"
            @afterRead="changeFile"
            @delete="remove"
            name="file"
            :multiple="false"
            :maxCount="maxCount"
            :width="width"
            :height="height"
            :previewFullImage="previewFullImage"
        >
        <slot></slot>
        </u-upload>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import {mapState} from "vuex"
import api from "@/api/index"
import {getType , objectURLToBlob,blobToBlobURL} from "@/utils/file"
import { format } from 'date-fns';
import  { hex_md5 } from "@/utils/md5";
import AliOss from "@/utils/aliOssSts.js";
// import SparkMD5 from 'spark-md5';
export default {
    props:{
        maxCount: {
            type: Number,
            default:1
        },
        mediaType: {
            type: String,
            default: "Image"
        },
        width: {
            type: String,
            default: "80px"
        },
        height: {
            type: String,
            default: "80px"
        },
        previewFullImage:{
            type: Boolean,
            default: true
        },
    },
    data(){
        return {
            minFileSize:1000, // 文件大小
            bigFileSize:1000, // 文件大小
            engine:'local',
            imageType:[".png",".jpg",".gif",".jpeg"], // 图片类型
            audioType:[".mp3",".wav"], // 图片类型
            videoType:[".mp4"], // 图片类型
            otherType:[".crt"], // 其他类型

     
            fileList:[],
            progress:0,
            chunkSize: 1024*1024*2,
        }
    },
    computed:{
        ...mapState("app",["file"]),
        ...mapState("user",["userInfo"]),
    },
    mounted(){
        this.engine = this.file.engine
        this.imageType = this.file.imageType
        this.audioType = this.file.audioType
        this.videoType = this.file.videoType
        this.otherType = this.file.otherType
        this.minFileSize = this.file.minFileSize
        this.bigFileSize = this.file.bigFileSize
    },
    methods:{
        changeFile(e){
            switch (this.engine) {
                case 'local':
                    this.uploadFile(e)
                    return
                case 'aly':
                    // this.alyOssUpload(e)
                    return
                case 'qiniu':
                    console.log("七牛")
                    return
                default:
                    console.log("未知")
                    return
            }
        },
        // ----------------------------阿里云oss
        async alyOssUpload(e){

            // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
            let lists = [].concat(e.file)
            let fileListLen = this.fileList.length
            lists.map((item) => {
                this[`fileList`].push({
                    ...item,
                    status: 'uploading',
                    message: '上传中'
                })
            })
            // 获取临时token 凭证
            const res = await uni.$u.http.get(api.getUploadEngineSts,{
                custom: {auth: true},
            }) 
			if (res.code != 1) {
				this.$refs.uToast.show({
					message: res.message,
					type: 'error',
				})
				return
			}
            for (let i = 0; i < lists.length; i++) {
                const formData = AliOss.getSignatureFormData(
                    e.file.name,
                    {
                        savePath:this.file.path,
                        AccessKeySecret:res.data.result.AccessKeySecret,
                        SecurityToken:res.data.result.SecurityToken,
                        AccessKeyId:res.data.result.AccessKeyId,
                    }
                )
                const ossRes =  await uni.$u.http.upload(`https://${res.data.result.Bucket}.${res.data.result.Endpoint}`,{
                    filePath: e.file.url,
                    name: 'file',
                    name: "file",
                    formData: formData,
                })
                if (ossRes.code != 1) {
                    this.$refs.uToast.show({
                        message: ossRes.message,
                        type: 'error',
                    })
                    return
                }
             
                let item = this.fileList[fileListLen]
                this.fileList.splice(fileListLen, 1, Object.assign(item, {
                    status: 'success',
                    message: '',
                    url: `https://${res.data.result.Bucket}.${res.data.result.Endpoint}/${formData.key}`
                }))
                fileListLen++
            }

            this.$emit("uploadFile",this.fileList)

        },


        // ----------------------------本地服务器上传
        async uploadFile(e){
            const file = e.file

            let lists = [].concat(e.file)
            let fileListLen = this.fileList.length
        
            // 如果文件尺寸小于后台设置并且小于5m则用普通上传
            if (file.size < this.minFileSize *1204*1024) {
                this.uploadMinFile(e)
                return
            }

            lists.map((item) => {
                this.fileList.push({
                    ...item,
                    status: 'uploading',
                    message: '上传中'
                })
            })

            for (let i = 0; i < lists.length; i++) {
             
                
                if ((this.bigFileSize * 1024 * 1024) < lists[i].size) {
                    this.$refs.uToast.show({
                        message: "文件太大了",
                        type: 'error',
                    })
                    return
                }

                const type = getType(lists[i].name)
            
            
                if (this.mediaType === "Image" && this.imageType.indexOf(type) == -1 ) {
                    this.$refs.uToast.show({
                        message: "文件类型不正确",
                        type: 'error',
                    })
                    return
                }
                if (this.mediaType === "Audio" && this.audioType.indexOf(type) == -1 ) {
                    this.$refs.uToast.show({
                        message: "文件类型不正确",
                        type: 'error',
                    })
                    return
                }
                if (this.mediaType === "Video" && this.videoType.indexOf(type) == -1 ) {
                    this.$refs.uToast.show({
                        message: "文件类型不正确",
                        type: 'error',
                    })
                    return
                }
                if (this.mediaType === "Other" && this.otherType.indexOf(type) == -1 ) {
                    this.$refs.uToast.show({
                        message: "文件类型不正确",
                        type: 'error',
                    })
                    return
                }
                

                // 获取分片个数
                const chunkCount = Math.ceil(lists[i].size / this.chunkSize)
                
            
                // 加密文件内容
                const now = new Date();
                const nowStr = format(now, 'yyyy-MM-dd');
            
                const fileMd5str = lists[i].size + lists[i].name + this.userInfo.nickName + this.userInfo.userId + nowStr
                const fileMd5 = hex_md5(fileMd5str)



                objectURLToBlob(lists[i].url, async (blob) => {  
                    const blobfile = new window.File([blob], lists[i].name, {type: blob.type});
                
                    // 向后端查询验证切片上传
                    const verifyChunkFormData = {
                        identifier:fileMd5
                    }                           
                    const verifyChunkRes = await uni.$u.http.get(api.UploadChunk, {
                        custom: {auth: true},
                        params: verifyChunkFormData
                    })
                    let chunkResultList = verifyChunkRes.data.result
                    
                    if (verifyChunkRes.code != 1) {
                        this.$refs.uToast.show({
                            message: "切片验证错误",
                            type: 'error',
                        })
                        return
                    }
                

                    // 已上传未合并直接请求合并
                    if (chunkResultList.length == chunkCount) {
                        const link =  this.mergeChunk(lists[i].name,fileMd5,lists[i].size)
                        
                        let item = this.fileList[fileListLen]
                        this.fileList.splice(fileListLen, 1, Object.assign(item, {
                            status: 'success',
                            message: '',
                            url: link
                        }))
                        
                        fileListLen++
                        this.$emit("uploadFile",this.fileList)
                        return
                    }

                    // 已上传部分切片,继续上传遗留切片
                    if (chunkResultList.length != chunkCount && chunkResultList.length > 0) {
                        
                        let uploadedChunks = [];
                        for (let uploadChunksi = 0; uploadChunksi < chunkCount; uploadChunksi++) {
                            
                            //分片开始位置
                            let start = uploadChunksi * this.chunkSize
                            let end = Math.min(blobfile.size,start + this.chunkSize)

                                // console.log(file,"0000")
                            let _chunkFile = blobfile.slice(start,end)
                            let blobUrl = blobToBlobURL(_chunkFile)
                        

                            let formData = {
                                'identifier':fileMd5,
                                'chunkNumber':uploadChunksi,
                                'totalChunks':chunkCount,
                                'file':blobUrl,
                            }

                            uploadedChunks.push(formData)
                            // await this.axios.post(api.UploadChunk, formData)
                        }
                        // 需求 根据arr 里面的数据 移除 arrobj 里面对应下标数据返回一个新数组
                        chunkResultList.forEach((item)=>{
                            uploadedChunks[item] = undefined
                        })

                        uploadedChunks = uploadedChunks.filter((item)=>{
                            return item != undefined
                        })

                        for (let uploadedChunkIndex = 0; uploadedChunkIndex < uploadedChunks.length; uploadedChunkIndex++) {
                            const res =  await uni.$u.http.upload(api.UploadChunk,{
                                custom: {auth: true},
                                filePath: uploadedChunks[uploadedChunkIndex].blobUrl,
                                name: 'file',
                                formData: {
                                    identifier:uploadedChunks[uploadedChunkIndex].identifier,
                                    chunkNumber:uploadedChunks[uploadedChunkIndex].chunkNumber,
                                    totalChunks:uploadedChunks[uploadedChunkIndex].totalChunks
                                }
                            })
                            if (res.code != 1) {
                                this.$refs.uToast.show({
                                    message: res.message,
                                    type: 'error',
                                })
                                return
                            }
                        }

                        const link =  this.mergeChunk(lists[i].name,fileMd5,lists[i].size)
                
                        let item = this.fileList[fileListLen]
                        this.fileList.splice(fileListLen, 1, Object.assign(item, {
                            status: 'success',
                            message: '',
                            url: link
                        }))
                         this.$emit("uploadFile",this.fileList)
                        fileListLen++
                        return
                    }
                    
                    for (let uploadi = 0; uploadi < chunkCount; uploadi++) {
                        
                        //分片开始位置
                        let start = uploadi * this.chunkSize
                        let end = Math.min(blobfile.size,start + this.chunkSize)

                        // console.log(file,"0000")
                        let _chunkFile = blobfile.slice(start,end)
                        let blobUrl = blobToBlobURL(_chunkFile)
                    

                        const res =  await uni.$u.http.upload(api.UploadChunk,{
                            custom: {auth: true},
                            filePath: blobUrl,
                            name: 'file',
                            formData: {
                                identifier:fileMd5,
                                chunkNumber:uploadi,
                                totalChunks:chunkCount
                            }
                        })
                        if (res.code != 1) {
                            this.$refs.uToast.show({
                                message: res.message,
                                type: 'error',
                            })
                            return
                        }
                    }

                    //合并分片 所有上传结束通知后端进行合并分片
                    const link =  this.mergeChunk(file.name,fileMd5,file.size)

                    let item = this.fileList[fileListLen]
                    this.fileList.splice(fileListLen, 1, Object.assign(item, {
                        status: 'success',
                        message: '',
                        url: link
                    }))
                    this.$emit("uploadFile",this.fileList)
                    fileListLen++
                });
            }
        },
        async mergeChunk(fileName, identifier, size){
            const mergeRes = await uni.$u.http.post(api.mergeChunk, {
                fileName: fileName,
                identifier: identifier,
                size: size,
            },{
                custom: {auth: true},
            })
            if (mergeRes.code != 1) {
                this.$refs.uToast.show({
                    message: mergeRes.message,
                    type: 'error',
                })
                return
            }
            return mergeRes.data.link[0]
        },
        async uploadMinFile(e){
        
            // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
            let lists = [].concat(e.file)
            let fileListLen = this.fileList.length
            lists.map((item) => {
                this.fileList.push({
                    ...item,
                    status: 'uploading',
                    message: '上传中'
                })
            })
            for (let i = 0; i < lists.length; i++) {
                const res =  await uni.$u.http.upload(api.postuploadFile,{
                    custom: {auth: true},
                    filePath: lists[i].url,
                    name: 'file',
                })
                if (res.code != 1) {
                    this.$refs.uToast.show({
                        message: res.message,
                        type: 'error',
                    })
                    return
                }
                let item = this.fileList[fileListLen]
                this.fileList.splice(fileListLen, 1, Object.assign(item, {
                    status: 'success',
                    message: '',
                    url: res.data.link[0]
                }))
                fileListLen++
            }

            this.$emit("uploadFile",this.fileList)
        },
        remove(e){
            this.fileList.splice(e.index, 1)
            this.$emit("uploadFile",this.fileList)
        },
    }
}
</script>