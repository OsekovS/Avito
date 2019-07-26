import './index.scss';
import '../UiKit/HeadersFooters/Header/Header.js';
import '../UiKit/CheckBoxButt/CheckBoxButt.js';
import '../UiKit/HeadersFooters/Footer/Footer.js';
import '../UiKit/PhotoCard/PhotoCard.js';
// /import '../UiKit/RadioButt/RadioButt.js';
import {photoCardDynamic, workWithFilter} from './eventProcessor.js';
import {getCookie, setCookie, deleteCookie} from "./cookie.js";
import {GenerateCard,GenerateCurPhotoList} from "./CardGenerator.js";
import {HttpGet} from "./DataLoader.js";

const productsLink = 'https://avito.dump.academy/products';
const sellersLink = 'https://avito.dump.academy/sellers';
//тут хранятся все массивы загруженных товаров и продавцов
let products;
let sellers;
//тут хранятся товары, которые хочет отобразить пользователь
//(прошедшие фильтры)
let curProducts;
//категории товаров, прошедшие фильтр
let neededCategory = {};
let curPhotos = {};
//массив с сылками на фото, отображаемыми в текущий момент
let curLinkArr;
//параметр сортироки (none-по популярности)
let sortParam='none';
Content.onclick = function(event) {
  let eventResult = photoCardDynamic(); 
  if(!eventResult) return
  if(eventResult['result']=='ellite'){
    if(!(getCookie(eventResult["id"]))){
      setCookie(eventResult["id"],true);
      
    }
    else deleteCookie(eventResult["id"]);
    return
  }
  DisplayContent(eventResult);
  //"добираемся" до img
  let changedPhoto = eventResult['id'];
document.getElementById('PhotoCard'+eventResult['id'])
  .childNodes[0].childNodes[1].setAttribute('src','http:'+products[changedPhoto]['pictures'][curPhotos[changedPhoto]]);
}

Filter.onclick = function(event) {
  let eventResult = workWithFilter();
  switch(eventResult){
    case 'filter':
      Filtering(sortParam);
      GenerateCard(curProducts,sellers);
      //curPhotos = GenerateCurPhotoList(curProducts);
    break;
    case false:
    break;
    case 'none':
    case 'price':
    case 'date':
      sortParam=eventResult;
    break;
    default:
        neededCategory[eventResult] = !neededCategory[eventResult];
    break;

  }
}

HttpGet(productsLink).then(function(value) {
  products = value;
  curProducts = value;
//поскольку в задании требуется вывод и форматирование дат,
//которые не представлены в исходных данных
//решил их добавить
  for(let i=0;i<curProducts.length;i++){
    curProducts[i]['date'] = new Date(
      2010+Math.round(Math.random()*5),
      Math.round(Math.random()*12),
      Math.round(Math.random()*29),
      Math.round(Math.random()*24),
      Math.round(Math.random()*60),
      Math.round(Math.random()*60));
  }
  return HttpGet(sellersLink)
}).then(function(receivedSellers) {
  sellers = receivedSellers;
  GenerateCard(curProducts,sellers);
  curPhotos = GenerateCurPhotoList(curProducts);
  for(let i=0;i<curProducts.length;i++){
    if(!neededCategory[curProducts[i]['category']]){
    neededCategory[curProducts[i]['category']] = true;
  }
}}).catch(function(reason) {
  console.log(reason);
});

function Filtering(sortParam) {
  curProducts = products.filter(
    function(element) {
    if((!neededCategory[element['category']]) &&
    (!(neededCategory['ellite']) || getCookie(element['id']))
    && (!(neededCategory['priceFilter']) ||
   ((element['price'] > parseInt(minPrice.value))&&(element['price'] < parseInt(maxPrice.value))
     )))
    return true;
  });
  if(!(sortParam == 'none')){
    if(sortParam=='price'){
    return curProducts.sort(comparePrices);}
    else{return curProducts.sort(compareDates);}
  }
    function comparePrices(a, b) {
      if (a[sortParam] > b[sortParam]) return 1;
      if (a[sortParam] < b[sortParam]) return -1; //return a - b;
    }
  function compareDates(a, b) {
    if (a[sortParam] > b[sortParam]) return -1;
    if (a[sortParam] < b[sortParam]) return 1; //return a - b;
  }

}
function DisplayContent(eventResult) {
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
//использовалось для отладки
let pseudoProducts = [{"address":{"lat":55.779148,"lng":37.556777},"category":"laptops","title":"ноутбук Lenobo","price":371859,"pictures":["0","1","2","3"],"laptop_type":"home","processor":"i3","ram":"4","screen":"14","relationships":{"seller":"0"},"id":"1"},
{"address":{"lat":56.0038072,"lng":92.8096117},"category":"auto","title":"кроссовер Audie","price":1377513,"pictures":["0","1","2","3","4","5"],"body_type":"suv","gearbox":"automatic","year":2002,"relationships":{"seller":"1"},"id":"2"},
{"address":{"lat":54.7211838,"lng":20.545797},"category":"cameras","title":"цифровой фотоаппарат Leyka","price":1805633,"pictures":["0","1","2","3","4","5"],"camera_type":"slr","matrix_resolution":12,"video_resolution":"4K","relationships":{"seller":"2"},"id":"3"},
{"address":{"lat":57.2071815,"lng":32.5979023},"category":"immovable","title":"квартира 2 комнаты, 75 кв.м.","price":66666666,"pictures":["0","1","2","3"],"property_type":"flat","rooms":2,"square":74,"relationships":{"seller":"3"},"id":"4"}
,{"address":{"lat":55.779148,"lng":37.556777},"category":"laptops","title":"ноутбук Lenobo","price":371859,"pictures":["0","1","2","3"],"laptop_type":"home","processor":"i3","ram":"4","screen":"14","relationships":{"seller":"0"},"id":"5"},
{"address":{"lat":56.0038072,"lng":92.8096117},"category":"auto","title":"кроссовер Audie","price":1377513,"pictures":["0","1","2","3","4","5"],"body_type":"suv","gearbox":"automatic","year":2002,"relationships":{"seller":"1"},"id":"6"},
{"address":{"lat":54.7211838,"lng":20.545797},"category":"cameras","title":"цифровой фотоаппарат Leyka","price":1805633,"pictures":["0","1","2","3","4","5"],"camera_type":"slr","matrix_resolution":12,"video_resolution":"4K","relationships":{"seller":"2"},"id":"7"},
{"address":{"lat":57.2071815,"lng":32.5979023},"category":"immovable","title":"квартира 2 комнаты, 75 кв.м.","price":66666666,"pictures":["0","1","2","3"],"property_type":"flat","rooms":2,"square":74,"relationships":{"seller":"3"},"id":"8"}];
let pseudoSellers = [{"category":"auto","isCompany":true,"name":"Вольво-центр Юг","rating":3,"id":"0"},
{"category":"auto","isCompany":true,"name":"Аркадий Аверченко","rating":2.2,"id":"1"},
{"category":"auto","isCompany":false,"name":"Аркадий Аверченко","rating":2.9,"id":"2"},
{"category":"auto","isCompany":true,"name":"Антон Чехов","rating":3.2,"id":"3"}];
