const gulp = require("gulp"),
	ts = require("gulp-typescript"),
	less = require("gulp-less"),
	autoprefixer = require("gulp-autoprefixer"),
	babelConfig = require('./babelConfig.js')(false),
	libDir = "./lib",
	esDir="./es",
	,
	babel = require('gulp-babel');
	
	lib_tsConfig =getTsConfig(true);
	es_tsConfig =getTsConfig();

const tsResult = gulp.src([
	'src/**/*.tsx',
	'src/**/*.ts',
	'typings.d.ts'
]);
function getTsConfig(module){
	delete babelConfig.cacheDirectory;
	tsConfig = require('./tsConfig');
	if(module){
		tsConfig.module= "commonjs";
	} else {
		tsConfig.moduleResolution= "node";
	}
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
		.pipe(gulp.dest(libDir));
	done()
});
gulp.task('default', gulp.series('lib-ts', 'lib-tsd','es-ts', 'es-tsd', 'less', done => {
	done();
}));