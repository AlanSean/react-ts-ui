const gulp = require("gulp"),
	ts = require("gulp-typescript"),
	tsConfig = ts.createProject("tsconfig.json"),
	less = require("gulp-less"),
	autoprefixer = require("gulp-autoprefixer"),
	babelConfig = require('./babelConfig.js')(),
	libDir="./lib",
	babel = require('gulp-babel');



const tsResult = gulp.src([
	'src/**/*.tsx',
	'src/**/*.ts',
	'./typings.d.ts'
]).pipe(tsConfig());

gulp.task('ts', done => {
	delete babelConfig.cacheDirectory;
	tsResult.js.pipe(babel(babelConfig)).pipe(gulp.dest(libDir));
	done()
});
gulp.task('dts', done => {
	tsResult.dts.pipe(gulp.dest(libDir));
	done()
});
gulp.task('less', done => {
	gulp.src('src/**/*.less')
		.pipe(autoprefixer())
		.pipe(less())
        .pipe(gulp.dest(libDir));
	done()
});
gulp.task('default', gulp.series('ts','dts','less',done => {
	done();
}));