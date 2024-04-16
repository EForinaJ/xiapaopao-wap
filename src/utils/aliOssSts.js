/**
 * 微信小程序通过STS直传阿里云OSS
 *（uniapp版上传，小程序原生需要将uni.XXX替换为wx.XXX）
 * 
 * @param {filePath} 图片临时地址
 * @param {option|Object} OSS和STS配置
 * @param {savePath} oss中的文件目录
 * @param {AccessKeySecret} 服务端返回的STS中的AccessKeySecret
 * @param {SecurityToken} 服务端返回的STS中的SecurityToken
 * @param {AccessKeyId} 服务端返回的STS中的AccessKeyId
 * @return {string|boolean} 成功返回文件地址，失败返回false
 */
import crypto from 'crypto-js';
import {
Base64
} from 'js-base64/base64.js';
import { format } from 'date-fns';


function getSignatureFormData(filePath, option = {
    savePath,
    AccessKeySecret,
    SecurityToken,
    AccessKeyId,
 }) {
    const date = new Date();
    let fileType = filePath.split(".").pop();
    let filename = option.savePath + "/" + format(date, 'yyyy-MM-dd') + "/" + createFileName(32) + "." + fileType;


    date.setHours(date.getHours() + 1);
    const policyText = {
        expiration: date.toISOString(), // 设置policy过期时间。
        conditions: [
            ["content-length-range", 0, 1024 * 1024 * 1024],
        ],
    };
    const policy = Base64.encode(JSON.stringify(policyText)) // policy必须为base64的string。
    const signature = computeSignature(option.AccessKeySecret, policy)
    const formData = {
    OSSAccessKeyId: option.AccessKeyId,
    signature,
    policy,
    'x-oss-security-token': option.SecurityToken,
    key: filename,
    success_action_status: 200
    }
    return formData
 
    //  uni.uploadFile({
    //      url: "https://" + option.bucket +
    //          "." + option.area + ".aliyuncs.com",
    //      filePath: filePath,
    //      name: "file",
    //      formData: formData,
    //      success: (res) => {
    //          let ossFileName = false;
    //          if (res.statusCode === 200) {
    //              console.log('上传成功');
    //              ossFileName = "https://" + option.bucket +
    //                  "." + option.area + ".aliyuncs.com/" +
    //                  filename;
    //          }
    //          callBack(ossFileName);
    //      },
    //      fail: err => {
    //          console.log(err);
    //          callBack(false);
    //      }
    //  })
 }
 
 
 
 
 // 签名
function computeSignature(accessKeySecret, canonicalString) {
     return crypto.enc.Base64.stringify(crypto.HmacSHA1(canonicalString, accessKeySecret));
 }
 
 // 生成随机文件名
function createFileName(length) {
     const data = [
         "0",
         "1",
         "2",
         "3",
         "4",
         "5",
         "6",
         "7",
         "8",
         "9",
         "A",
         "B",
         "C",
         "D",
         "E",
         "F",
         "G",
         "H",
         "I",
         "J",
         "K",
         "L",
         "M",
         "N",
         "O",
         "P",
         "Q",
         "R",
         "S",
         "T",
         "U",
         "V",
         "W",
         "X",
         "Y",
         "Z",
         "a",
         "b",
         "c",
         "d",
         "e",
         "f",
         "g",
         "h",
         "i",
         "j",
         "k",
         "l",
         "m",
         "n",
         "o",
         "p",
         "q",
         "r",
         "s",
         "t",
         "u",
         "v",
         "w",
         "x",
         "y",
         "z",
     ];
     let nums = "";
     for (let i = 0; i < length; i++) {
         const r = parseInt(Math.random() * 61, 10);
         nums += data[r];
     }
     return nums;
 }
 
 
 

export default {
    getSignatureFormData
}
 