module.exports = {
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      //不编译node_modules 文件夹
      exclude: /node_modules/,
      options: {
        //配置编译规则
        presets: ['es2015', 'react', 'stage-0']
      }
    }]
  }
};