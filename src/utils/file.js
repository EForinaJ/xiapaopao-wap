  // 获取文件后缀
  export function getType(file){
    var filename=file;
    var index1=filename.lastIndexOf(".");
    var index2=filename.length;
    var type=filename.substring(index1,index2);
    return type;
}

/**
 * BlobUrl转blob数据  
 * @param {Object} url blob URL
 * @param {Object} callback 回调函数
 */
export function objectURLToBlob(url, callback) {  
  const http = new XMLHttpRequest();  
  http.open("GET", url, true);  
  http.responseType = "blob";  
  http.onload = function (e) {  
      if (this.status == 200 || this.status === 0) {  
          callback(this.response);
      }  
  };  
  http.send();
}; 


export function blobToBlobURL(blob) {  
  return window.URL.createObjectURL(blob)
}; 