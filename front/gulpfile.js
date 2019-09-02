var gulp = require("gulp");
// 对css进行压缩的
var cssnano = require("gulp-cssnano");
//对处理的css,js文件进行重命名
var rename = require("gulp-rename");
//压缩js文件
var uglify = require("gulp-uglify");
//合并多个js文件
var concat = require("gulp-concat");
//缓存  压缩图片 如果压缩过了  就不会再去压缩了
var cache = require("gulp-cache");
//图片无损压缩
var imagemin = require("gulp-imagemin");
/**注意gulp-cache gulp-imagemin安装的时候版本问题  如果运行报错  一般是版本问题 解决就是装之前的版本 */
//自动刷新浏览器  创建一个服务器
var bs = require("browser-sync").create();
//sass来处理css文件
var sass = require("gulp-sass");

var util = require("gulp-util");
//出错时  能找到源码文件
var sourceMaps = require("gulp-sourcemaps");

var path = {
    'html':"./templates/**/",
    'css': "./src/css/**/",
    'js': "./src/js/",
    'images': "./src/images/",
    'css_dist': "./dist/css/",
    'js_dist': "./dist/js/",
    'images_dist': "./dist/images/",
};
gulp.task('html',function(){
    gulp.src(path.html+"*.html")
        .pipe(bs.stream())
})
//定义一个css的任务
gulp.task('css', function () {
    gulp.src(path.css + "*.scss")
        .pipe(sass().on('error',sass.logError))
        .pipe(cssnano())
        .pipe(rename({"suffix": ".min"}))
        .pipe(gulp.dest(path.css_dist))
        .pipe(bs.stream());
})

//定义一个处理js的任务
gulp.task('js', function () {
    gulp.src(path.js + "*.js")
        .pipe(sourceMaps.init())
        .pipe(uglify().on('error',util.log))
        .pipe(rename({"suffix": ".min"}))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(path.js_dist))
        .pipe(bs.stream());
})
//定义一个处理图片的任务
gulp.task('images', function () {
    gulp.src(path.images + "*.*")
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(path.images_dist))
        .pipe(bs.stream());
})
//定义一个监听任务
gulp.task("watch", function () {
    gulp.watch(path.css + "*.scss", ['css']);
    gulp.watch(path.js + "*.js", ['js']);
    gulp.watch(path.images + "*.*", ['images']);
    gulp.watch(path.html + "*.*", ['html']);
})
//构建browser-sync的任务
gulp.task('bs', function () {
    bs.init({
        'server': {
            'baseDir': "./"
        }
    });
})
//创建一个默认的任务
// gulp.task('default', ['bs', 'watch'])
gulp.task("default",['watch'])


