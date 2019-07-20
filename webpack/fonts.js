module.exports = function (){
    return {
      module: {
          rules: [
            {
                
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                // use: [
                // {
                //     loader: 'file-loader',
                //     options: {
                //         name: '[path][name].[ext]',
                //     }
                // }
                // ]
                },
          ]
      }
    }  
  };