import { getCookie } from "./cookie";

//выводит список товаров и корзину
//некоторые товары почему то имеют значение undefined.
//решено было выводить вместо цены 'договорная'
//а при сортировке приравнивать к 0
export function GenerateCard(products,sellers){
let imageLink = '';
//шаблон для карточки с товаром
let PhotoCardHtml=`<div class="PhotoCard_PhotoSet" CurrentPhoto="1">
<img class="photo" src=''>
  <div class="ControlPanel_Previous"><img class="PhotoCardButton PhotoCardPrev" src="images/PhotoCardPrev.svg" alt="Логотип"></div>
  <div class="ControlPanelRight">
    <div class="ControlPanel_Next"><img class="PhotoCardButton PhotoCardNext" src="images/PhotoCardNext.svg" alt="Логотип"></div>
    <img for="box-Избранное" class="addToElite" src="images/star_border.svg">     
  </div>
</div>`
let PhotoCardHtml_ellite = PhotoCardHtml.replace("star_border","star"); 

//опции для вывода времени
      let options1 = {
      month: 'long',
      day: 'numeric',
      timezone: 'UTC', 
    };
    let options2 = {
      hour: 'numeric',
      minute: 'numeric'
    };
    Content.innerHTML='';
//задача: с начала заполняем контент а потом его вставляем
for (var i = 0; i < products.length; i++) {
let li = Content.appendChild(document.createElement('li'));
let card = li.appendChild(document.createElement('div'));
card.setAttribute('class','PhotoCard');
card.setAttribute('id','PhotoCard'+products[i]["id"]);
imageLink = products[i]["pictures"][0];
if(!(getCookie(products[i]['id'])==undefined)){
card.innerHTML = PhotoCardHtml_ellite.substring(0,PhotoCardHtml.indexOf('src')+4)+'http:'+imageLink+PhotoCardHtml_ellite.substring(PhotoCardHtml.indexOf('src')+6,PhotoCardHtml.length);;
}
else
card.innerHTML = PhotoCardHtml.substring(0,PhotoCardHtml.indexOf('src')+4)+'http:'+imageLink+PhotoCardHtml.substring(PhotoCardHtml.indexOf('src')+6,PhotoCardHtml.length);
let PhotoCardInfo = (card).appendChild(document.createElement('ul'));
PhotoCardInfo.setAttribute('class','PhotoCard_Info');
PhotoCardInfo.appendChild(document.createElement('li')).innerHTML = products[i]["title"];
if((products[i]["price"]===undefined)||products[i]["price"]==false){
PhotoCardInfo.appendChild(document.createElement('li')).innerHTML = 'Цена: договорная';
products[i]["price"]=0;}
else PhotoCardInfo.appendChild(document.createElement('li')).innerHTML = 'Цена: ' +products[i]["price"].toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+' ₽';
let curSeller = (products[i]["relationships"]["seller"]);
PhotoCardInfo.appendChild(document.createElement('li')).innerHTML = 'Продавец: ' + sellers[curSeller]["name"];
PhotoCardInfo.appendChild(document.createElement('li')).innerHTML = 'Рейтинг: ' + sellers[curSeller]["rating"];
PhotoCardInfo.appendChild(document.createElement('li')).innerHTML = 'Дата: ' + 
products[i]["date"].toLocaleString("ru", options1) + ' ' + products[i]["date"].toLocaleString("ru", options2) + 
', '+products[i]["pictures"].length+' фото';
}
}
export function GenerateCurPhotoList(products){
  let curPhotos=[];
  for (var i = 0; i < products.length; i++) {
    curPhotos[i]='0';
  }
  return curPhotos
}
//улучшение: картинки загружаются в большом расширении
//и сжимаются в браузере, что замедляет работу