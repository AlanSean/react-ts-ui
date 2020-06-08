const gulp = require("gulp"),
	ts = require("gulp-typescript"),
	less = require("gulp-less"),
	autoprefixer = require("gulp-autoprefixer"),
	babelConfig = require('./babelConfig.js')(false),
	libDir = "./lib",
	esDir="./es",
	babel = require('gulp-babel');
	
	

const tsResult = gulp.src([
		'src/**/*.tsx',
		'src/**/*.ts',
		'typings.d.ts'
	]),
	lib_tsConfig =getTsConfig(),
	es_tsConfig =getTsConfig(true);

function getTsConfig(module){
	delete babelConfig.cacheDirectory;
	const tsConfig = require('./tsConfig')();
	if(module){
		// tsConfig.module= "commonjs";
		tsConfig.moduleResolution= "node";
	} 
	else {
		tsConfig.module= "commonjs";
		// tsConfig.moduleResolution= "node";
	}
	console.log(tsConfig)
	return tsResult.pipe(ts.createProject(tsConfig)());
}
gulp.task('lib-ts', done => {
	lib_tsConfig.js.pipe(babel(babelConfig)).pipe(gulp.dest(libDir));
	done()
});
gulp.task('lib-tsd', done => {
	lib_tsConfig.dts.pipe(gulp.dest(libDir));
	done()
});
gulp.task('es-ts', done => {
	es_tsConfig.js.pipe(babel(babelConfig)).pipe(gulp.dest(esDir));
	done()
});
gulp.task('es-tsd', done => {
	es_tsConfig.dts.pipe(gulp.dest(esDir));
	done()
});
gulp.task('less', done => {
	gulp.src('src/**/*.less')
		.pipe(autoprefixer())
		.pipe(less())
		.pipe(gulp.dest(libDir))
		.pipe(gulp.dest(esDir));
	done()
});
gulp.task('copyLess',  function() {
	return gulp.src([
		'src/**/*.less',
	])
	.pipe(gulp.dest(esDir))
	.pipe(gulp.dest(libDir))
  });
gulp.task('default', gulp.series('lib-ts', 'lib-tsd', 'less','es-ts', 'es-tsd', 'copyLess', done => {
	done();
}));