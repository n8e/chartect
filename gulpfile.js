var gulp = require('gulp');
  less = require('gulp-less');
  jade = require('gulp-jade');
  bower = require('gulp-bower');
  gutil = require('gulp-util');
  concat = require('gulp-concat');
  browserify = require('browserify');
  path = require('path');
  stringify = require('stringify');
  source = require('vinyl-source-stream');
  imagemin = require('gulp-imagemin');
  nodemon = require('gulp-nodemon');
  browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./public/"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

paths = {
  public: 'public/**',
  jade: 'app/views/*.jade',
  scripts: 'app/**/*.js',
  images: 'app/images/**/*',
  staticFiles: [
    '!app/**/*.+(less|css|js|jade)',
    '!app/images/**/*',
     'app/**/*.*'
  ],
  unitTests: [],
  libTests:['lib/tests/**/*.js'],
  styles: 'app/styles/*.+(less|css)'
}

gulp.task('less', function () {
  gulp.src(paths.styles)
    .pipe(less({
      paths: [ path.join(__dirname, './app/styles') ]
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('images', function(){
  gulp.src(paths.images)
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./public/images/'));
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('public/lib/'));
});

gulp.task('browserify', function() {
    return browserify('./app/js/application.js').bundle()
        .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
        .on('error', gutil.log.bind(gutil, 'Browserify Error: in browserify gulp task'))
        // vinyl-source-stream makes the bundle compatible with gulp
        .pipe(source('index.js')) // Desired filename
        // Output the file
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('lint', function () {
  return 
    gulp.src(['./app/**/*.js','./index.js','./lib/**/*.js']).pipe(jshint()).pipe(jshint.reporter('default'));
});

gulp.task('static-files',function(){
  return gulp.src(paths.staticFiles)
    .pipe(gulp.dest('public/'));
});

gulp.task('nodemon', function () {
  nodemon({ script: 'index.js', ext: 'js', ignore: ['public/'] })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('>> node restart');
    })
});

gulp.task('watch', function() {
  // livereload.listen({ port: 35729 });
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.styles, ['less']);
  gulp.watch(paths.scripts, ['browserify']);
  // gulp.watch(paths.public).on('change', livereload.changed);
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify('./app/application.js', watchify.args));
  bundler.transform(stringify(['.html']));
  // bundler.transform(es6ify);
  bundler.on('update', rebundle);
  function rebundle() {
    return bundler.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('index.js'))
      .pipe(gulp.dest('./public/js'));
  }
  return rebundle();
});

gulp.task('build', ['jade','less','static-files','browserify','bower']);
gulp.task('heroku:production', ['build']);
gulp.task('production', ['nodemon','build']);
gulp.task('default', ['nodemon','watch','build', 'browser-sync']);