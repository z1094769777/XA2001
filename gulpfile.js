


//加载依赖包
const gulp = require('gulp')
// css依赖包
const cssmin = require('gulp-cssmin')
//sass依赖包
const sass = require('gulp-sass');

//前缀名
const autoprefixer = require('gulp-autoprefixer')

//js依赖包
const uglify = require('gulp-uglify')

const babel = require('gulp-babel')

//html依赖包
const htmlmin = require('gulp-htmlmin')

//server 依赖包
const webserver = require('gulp-webserver')

//删除依赖包
const del = require('del');

gulp.task("watchall", async function() {
    gulp.watch("src/pages/*.html", async function() {
        gulp.src("src/pages/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeEmptyAttributes: true,
            minifyJS: true,
            minifyCSS:true
        }))
        .pipe(gulp.dest("D:\\phpStudy\\PHPTutorial\\WWW\\Newxiangmu\\src\\pages"));
    })


    gulp.watch("src/sass/*.scss", async function() {
        gulp.src("src/sass/*.scss")
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest("D:\\phpStudy\\PHPTutorial\\WWW\\Newxiangmu\\src\\css"));
    })
    
    gulp.watch("src/images/*.*", async function() {
        gulp.src("src/images/*.*")
            .pipe(gulp.dest("D:\\phpStudy\\PHPTutorial\\WWW\\Newxiangmu\\src\\images"))
    })

    gulp.watch("src/js/*.js", async function() {
        gulp.src("src/js/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("D:\\phpStudy\\PHPTutorial\\WWW\\Newxiangmu\\src\\js"))
    })

    gulp.watch("src/PHP/*.php", async function() {
        gulp.src("src/PHP/*.php")
            .pipe(gulp.dest("D:\\phpStudy\\PHPTutorial\\WWW\\Newxiangmu\\src\\PHP"))
    })

    gulp.watch("src/tu/*.*", async function() {
        gulp.src("src/tu/*.*")
            .pipe(gulp.dest("D:\\phpStudy\\PHPTutorial\\WWW\\Newxiangmu\\src\\tu"))
    })
    

    
})