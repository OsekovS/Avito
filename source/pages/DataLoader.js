export var HttpGet = function(link){
      return new Promise(function (resolve, reject) {
        //resolve(true);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', link, true);   
        xhr.send();
        let products = [];
        xhr.onreadystatechange = function() {
          if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
              var error = new Error(this.statusText);
              error.code = this.status;
              reject(error);
              //alert( xhr.status + ': ' + xhr.statusText );
            } 
            else {
              try {
                  products = JSON.parse(xhr.responseText.slice(8, -1));
                  resolve(products);
              } catch (e) {
                reject( "Некорректный ответ " + e.message );
              }
            }
        }
        //console.log(products);
        //return products;
    });
  }