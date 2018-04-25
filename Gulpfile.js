var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

function bundleStyle(){
    gulp
        .src('index.scss')
        .pipe(sass())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('public'));
}

gulp.task('styles', function () {
    bundleStyle()
})
 


function compile(watch) {
    var bundle = browserify(['./src/index.js'], { debug: true });

    if (watch) {
        bundle = watchify(bundle);
        bundle.on('update', function () {
            console.log('--> Bundling...');
            rebundle();
        });
    }

    function rebundle() {
        bundle
            .transform(babel, { presets: ['es2015'], plugins: ['syntax-async-functions', 'transform-regenerator'] })
            .bundle()
            .on('error', function (err) { console.log(err); this.emit('end') })
            .pipe(source('index.js'))
            .pipe(rename('app.js'))
            .pipe(gulp.dest('public'));
    }

    rebundle();
}



gulp.task('build', function () {
    return compile();
});

gulp.task('compress', function () {
    return gulp.src('./public/app.js')
        .pipe(concat('jflcfflcdrpt.js'))
        .pipe(gulp.dest('public'))
        .pipe(rename('jflcfflcdrpt.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public'));
});

gulp.task('watch-css', function () {
    return gulp.watch('index.scss', ['styles']);
  });

gulp.task('watch-js', function () { return compile(true); });

gulp.task('default', ['styles', 'build']);