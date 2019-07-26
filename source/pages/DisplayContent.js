export function DisplayContent(eventResult) {
    switch(eventResult['result']) {
        case 'prev':
            curLinkArr = products[eventResult['id']]['pictures'];
            if(curPhotos[eventResult['id']]==0){
              curPhotos[eventResult['id']]=curLinkArr.length-1;
            }
            else{curPhotos[eventResult['id']]--;}
        break;
        case 'next':
            curLinkArr = products[eventResult['id']]['pictures'];
            if(curPhotos[eventResult['id']]==curLinkArr.length-1){
              curPhotos[eventResult['id']]=0;
            }
            else{curPhotos[eventResult['id']]++;}
        break;
        default:
          console.log('$$$');
      }
}