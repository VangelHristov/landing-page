'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const liveServer = require('live-server');

const compileSass = function () {
	return gulp
		.src('./scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCss())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('./'));
};

const uglifyScripts = function () {
	return gulp
		.src('./js/*.js')
		.pipe(concat('scripts.min.js'))
		.pipe(terser())
		.pipe(gulp.dest('./'));
};

const cleanDist = function () {
	return gulp
		.src(['./scripts.min.js', './style.min.css'], {read: false, allowEmpty: true})
		.pipe(clean());
};

const watch = function () {
	gulp.watch('./scss/*.scss', compileSass);
	gulp.watch('./js/*.js', uglifyScripts);
	startLiveServer();
};

const startLiveServer = function () {
	return liveServer.start({
		port: 3232,
		host: '127.0.0.1',
		root: './',
		file: 'index.html',
		logLevel: 2,
		watch: './*.*',
		wait: 100
	});
};

exports.compileSass = compileSass;
exports.uglifySciripts = uglifyScripts;
exports.watch = watch;
exports.clean = cleanDist;
exports.start = gulp.series(cleanDist, compileSass, uglifyScripts, startLiveServer);
exports.develop = gulp.series(cleanDist, compileSass, uglifyScripts, watch);
