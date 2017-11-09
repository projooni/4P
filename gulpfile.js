var gulp = require('gulp');
var contcat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var scss = require('gulp-sass');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');

// gulp.task(name, deps, func)
// name - task의 이름을 지정하고, 이름에는 공백이 포함되어서는 안됩니다.
// deps - 현재 선언하고 있는 task를 수행하기 전에 먼저 실행되어야하는 task들의 배열 목록을 작성할 수 있습니다. 위의 예제에서는 JavaScript 파일을 병합하는 task를 진행하기 전에 JavaScript Lint(자바스크립트 문법 검사)를 먼저 수행하도록 정의되어 있습니다. (물론 그 전에 lint-js task를 이 task보다 앞에 작성해주어야 먼저 수행할 수 있을 것입니다.)
// func - 실제 수행할 업무 프로세스를 정의하는 function 입니다.(처리해야할 일을 정의)
var path = {
    src : {
        root : 'src/',
        doc : 'src/doc/',
        component : 'src/component/'
    },
    dist : {
        root : 'dist/',
        doc : 'dist/doc/',
        component : 'dist/component/'
    }
};

var config = {
    pathRoot : path.src,
    port : 3011
};

var scssOptions = {
    /** * outputStyle (Type : String , Default : nested) * CSS의 컴파일 결과 코드스타일 지정 * Values : nested, expanded, compact, compressed */
    outputStyle : 'expanded',
    /** * indentType (>= v3.0.0 , Type : String , Default : space) * 컴파일 된 CSS의 "들여쓰기" 의 타입 * Values : space , tab */
    indentType : "tab",
    /** * indentWidth (>= v3.0.0, Type : Integer , Default : 2) * 컴파일 된 CSS의 "들여쓰기" 의 갯수 */
    indentWidth : 1,
    /** * precision (Type : Integer , Default : 5) * 컴파일 된 CSS 의 소수점 자리수. */
    precision: 6,
    /** * sourceComments (Type : Boolean , Default : false) * 컴파일 된 CSS 에 원본소스의 위치와 줄수 주석표시. */
    sourceComments: true
};

gulp.task('copy-html', function(){

    // index.html 복사
    gulp.src([path.src.root + '*.html'])
    .pipe(gulp.dest(path.dist.root))
    .pipe(browserSync.stream());

    // Doc html 복사
    gulp.src([path.src.doc + '**/*.html'])
    .pipe(gulp.dest(path.dist.doc))
    .pipe(browserSync.stream());

    // component html 복사
    gulp.src([path.src.component + '**/*.html'])
    .pipe(gulp.dest(path.dist.component))
    .pipe(browserSync.stream());

});

gulp.task('build-js', function(){

    // Build **/*.js in Doc
    gulp.src([path.src.doc + '**/*.js'])
    // stripDebug : 모든 console.log, alert 제거
    // .pipe(stripDebug())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015','react']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.doc))
        .pipe(browserSync.stream());

    // Build **/*.js in component
    gulp.src([path.src.component + '**/*.js'])
    .pipe(gulp.dest(path.dist.component))
    .pipe(browserSync.stream());

});

gulp.task('build-sass', function(){
    	
    gulp.src([path.src.doc + 'sass/**/*.scss'])
    // 소스맵 초기화
    .pipe(sourcemaps.init())
    // scss 함수에 옵션값을 설정, scss 작성시 watch가 멈추지 않도록 logError를 설정
    .pipe(scss(scssOptions).on('error', scss.logError))
    // .pipe(rename(''))
    // 소스맵 사용
    .pipe(sourcemaps.write())
    // 코드 난독화
    // .pipe(uglify())
    // dist 설정
    .pipe(gulp.dest(path.dist.doc + 'css/'))
    .pipe(browserSync.stream());

    gulp.src([path.src.component + 'sass/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(scss(scssOptions).on('error', scss.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.component + 'css/'))
    .pipe(browserSync.stream());


});

// copy images
gulp.task('copy-img', function(){
    gulp.src([path.src.doc + 'img/**/*'])
        .pipe(gulp.dest(path.dist.doc + 'img'))
        .pipe(browserSync.stream());
});

// watch
gulp.task('watch', function(){
    gulp.watch(path.src.root + '**/*.scss', ['build-sass']).on('change', browserSync.reload);
    gulp.watch(path.src.root + '**/*.js', ['build-js']).on('change', browserSync.reload);
    gulp.watch(path.src.root + '**/*.html', ['copy-html']).on('change', browserSync.reload);
    gulp.watch(path.src.root + 'img/**/*', ['copy-img']).on('change', browserSync.reload);
});

// 서버 task
gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: path.dist.root
        },
        port: config.port,
        index : "/index.html"

    });

});

gulp.task('default', ['copy-html', 'build-js', 'build-sass', 'copy-img', 'server', 'watch']);
