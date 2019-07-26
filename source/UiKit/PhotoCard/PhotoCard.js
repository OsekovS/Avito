import './PhotoCard.scss';
import '../BriefNumbInfo/BriefNumbInfo';
//-    import '../Form-Elements/Form-Elements';
// sconsole.log("PhotoCard.js");
//$(".PhotoCard_PhotoSet img").attr('src', 'source/img/GalleryImage.png');
// $(".PhotoCard_PhotoSet").css({ "background-color": "red" });
export function workWithFilter() {
    try{
    let result='';
    if(event.target.getAttribute('class')==='radio'){
        return event.target.getAttribute('value')
    }
    if(event.target.getAttribute('class')==='CheckBox')
    {   switch(event.target.getAttribute('for')) {
        case 'box-Авто':
        result = 'auto';
        break;
        case 'box-Недвижимость':
        result = 'immovable';
        break;
        case 'box-Фотоаппараты':
        result = 'cameras';
        break;
        case 'box-Ноутбуки':
        result = 'laptops';
        break;
        case 'box-Избранное':
        result = 'ellite';
        break;
        case 'box-Диапазон цен:':
        result = 'priceFilter';
        break;
        default:
        result = false;    
        break;
    }
    return result;
    }
    //console.log(event.target.getAttribute('class'));
    if((event.target.getAttribute('class').indexOf('ClickButton'))!==-1
     || (event.target.parentElement.getAttribute('class').indexOf('ClickButton'))!==-1){
        return 'filter';
    }
    }
    catch(e){
        if(e.name == 'TypeError')
        return false
        else
        throw e;
    }
}
export function countRabbits() {
    if(event.target.getAttribute('class')===null) return false
    var PhotoCardId = event.target.parentElement;
    while(PhotoCardId.getAttribute('id')===null){
        PhotoCardId = PhotoCardId.parentElement;
    }
    PhotoCardId = PhotoCardId.getAttribute('id');
    if(event.target.getAttribute('class')==='addToElite'){
        if(event.target.getAttribute('src')==='images/star.svg')
        event.target.setAttribute('src','images/star_border.svg');
        else event.target.setAttribute('src','images/star.svg');

        return {'id': PhotoCardId.substring(9,PhotoCardId.length), 'result': 'ellite'}
    }        
    if(event.target.getAttribute('class').indexOf('PhotoCardButton') !== -1){    
    var Result;
//        var PhotoCardCurrPhoto = PhotoCardCurrPhoto.getAttribute('CurrentPhoto');
//        var PhotoCardPrevPhoto = 1;
    if(event.target.getAttribute('class').indexOf('Next')==-1){
        Result = 'prev';}
    else{Result = 'next';}
    return {'id': PhotoCardId.substring(9,PhotoCardId.length), 'result': Result}
    }};