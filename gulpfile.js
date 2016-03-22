'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('gulp-browserify');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var sass = require("gulp-sass");
var cleanss = require('gulp-cleancss');
var concat = require('gulp-concat');

gulp.task("watch", function() {
    watch("js/**/*.js", function() {
        gulp.start("build-js");
    });
});

gulp.task('build-js', function() {
	return gulp.src('./js/main.js')
		.pipe(browserify({
	        debug: true, // sourcemapping
	        extensions: ['.js']
	    }))
	    .pipe(rename('bundle.js'))
	    //.pipe(gulp.dest('\\\\10.1.21.16\\c$\\WebSoft\\WebTutorServer\\wt\\web\\assessment_form\\build'))
	    .pipe(gulp.dest('./build'))
});

gulp.task('build-css', function() {
  gulp.src(['./style/*.scss', './style/libs/*.css'])
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanss({keepBreaks: false}))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('\\\\10.1.21.16\\c$\\WebSoft\\WebTutorServer\\wt\\web\\assessment_form\\build\\style'))
    .pipe(gulp.dest('./build/style'));
});

gulp.task('production', function() {
	gulp.src('./js/main.js')
	.pipe(browserify({
        debug: false, 
        extensions: ['.js']
    }))
    .pipe(uglify({
    	mangle: true,
    	compress: {
    		sequences     : true,  // join consecutive statemets with the “comma operator”
			properties    : true,  // optimize property access: a["foo"] → a.foo
			dead_code     : true,  // discard unreachable code
			drop_debugger : true,  // discard “debugger” statements
			unsafe        : false, // some unsafe optimizations (see below)
			conditionals  : true,  // optimize if-s and conditional expressions
			comparisons   : true,  // optimize comparisons
			evaluate      : false,  // evaluate constant expressions
			booleans      : true,  // optimize boolean expressions
			loops         : false,  // optimize loops
			unused        : true,  // drop unused variables/functions
			hoist_funs    : false,  // hoist function declarations
			hoist_vars    : false, // hoist variable declarations
			if_return     : true,  // optimize if-s followed by return/continue
			join_vars     : true,  // join var declarations
			cascade       : false,  // try to cascade `right` into `left` in sequences
			side_effects  : true,  // drop side-effect-free statements
			warnings      : true,  // warn about potentially dangerous optimizations/code
    	}
    }))
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('default', ['build-js']);
