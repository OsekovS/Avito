module.exports = function (paths){
    return {
      module: {
          rules: [
              {
                  test: /\.scss$/,
                  include:paths,
                  use: [
                      'style-loader',//dom derevo
                      'css-loader',//graph depend
                      'sass-loader'//scss-css
                  ]
              }
              
          ]
      }
    }  
  };