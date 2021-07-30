const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const jsuglify = require("gulp-uglify");
const cssuglify = require("gulp-uglifycss")
const autoprefixer = require("gulp-autoprefixer")
const htmlminify = require("gulp-minify-html");
const imgminify = require("gulp-imagemin");
const svgminify = require("gulp-svgmin");
const babel = require("gulp-babel");
const replace = require("gulp-replace");
const webpack = require("webpack-stream");
const ghPages = require("gulp-gh-pages")

const paths = {
	client: {
		entry: "src/client/js/app.js",
		img: "src/client/assets/images/**/*.*",
		svg: "src/client/assets/svg/**/*.*",
		js: "src/client/**/*.js",
		css: "src/client/**/*.css",
		html: "src/client/index.html",
		all: "src/client/**/*.*"
	},
	server: {
		js: "src/server/**/*.js",
		all: "src/server/**/*.*"
	},
	libClient: "src/client/lib/**/*.js",
	libGlobal: "src/lib/**/*.js"
};

const babelConfig = {
	presets: ['@babel/preset-env']
};

gulp.task("move:client:entry", function () {
	return gulp.src([paths.client.entry])
		.pipe(webpack(require("./webpack.config.js")))
		.pipe(gulp.dest("dist/client/js/"));
});

gulp.task("move:client:js", function () {
	return gulp.src([paths.client.js, `!${paths.client.entry}`])
		.pipe(gulp.dest("dist/client/"));
});

gulp.task("move:client:css", function () {
	return gulp.src([paths.client.css])
		.pipe(gulp.dest("dist/client/"));
});

gulp.task("move:client:img", function () {
	return gulp.src([paths.client.img])
		.pipe(gulp.dest("dist/client/assets/images/"));
});

gulp.task("move:client:svg", function () {
	return gulp.src([paths.client.svg])
		.pipe(gulp.dest("dist/client/assets/svg/"));
});

gulp.task("move:client:html", function() {
	return gulp.src([paths.client.html])
		.pipe(gulp.dest("dist/client/"));
});

gulp.task("move:server:js", function() {
	return gulp.src([paths.server.js])
		.pipe(gulp.dest("dist/server/"));
});

gulp.task("move:lib:client", function() {
	return gulp.src([paths.libClient])
		.pipe(gulp.dest("dist/client/lib/"));
});

gulp.task("move:lib:global", function() {
	return gulp.src([paths.libGlobal])
		.pipe(gulp.dest("dist/lib/"));
});

gulp.task("client:entry", function() {
	return gulp.src([paths.client.entry])
		.pipe(babel(babelConfig))
		.pipe(webpack(require("./webpack.config.js")))
		.pipe(jsuglify())
		.pipe(replace("__development = true", "__development = false"))
		.pipe(gulp.dest("dist/client/js/"));
});

gulp.task("client:js", function() {
	return gulp.src([paths.client.js, `!${paths.client.entry}`, "!src/client/lib/**/*.*"])
		.pipe(babel(babelConfig))
		.pipe(jsuglify())
		.pipe(gulp.dest("dist/client/"));
});

gulp.task("client:css", function() {
	return gulp.src([paths.client.css])
		.pipe(autoprefixer())
		.pipe(cssuglify())
		.pipe(gulp.dest("dist/client/"));
});

gulp.task("client:img", function() {
	return gulp.src([paths.client.img])
		.pipe(imgminify())
		.pipe(gulp.dest("dist/client/assets/images/"));
});

gulp.task("client:svg", function() {
	return gulp.src([paths.client.svg])
		.pipe(svgminify())
		.pipe(gulp.dest("dist/client/assets/svg/"));
});

gulp.task("client:html", function() {
	return gulp.src([paths.client.html])
		.pipe(replace("lib/vue.dev.js", "lib/vue.prod.js"))
		.pipe(htmlminify())
		.pipe(gulp.dest("dist/client/"));
});

gulp.task("server:js", function() {
	return gulp.src([paths.server.js])
		.pipe(babel(babelConfig))
		.pipe(jsuglify())
		.pipe(gulp.dest("dist/server/"));
});

gulp.task("lib:client", function() {
	return gulp.src([paths.libClient])
		//.pipe(babel(babelConfig))
		//.pipe(jsuglify())
		.pipe(gulp.dest("dist/client/lib/"));
});

gulp.task("lib:global", function() {
	return gulp.src([paths.libGlobal])
		.pipe(babel(babelConfig))
		.pipe(jsuglify())
		.pipe(gulp.dest("dist/lib/"));
});

gulp.task("build:client", gulp.series(["client:entry", "client:js", "client:css", "client:img", "client:svg", "client:html"]));

gulp.task("build:server", gulp.series(["server:js"]));

gulp.task("build:lib", gulp.series(["lib:client", "lib:global"]));

gulp.task("build", gulp.series(["build:server", "build:client", "build:lib"]));

gulp.task("move:client", gulp.series(["move:client:entry", "move:client:js", "move:client:css", "move:client:img", "move:client:svg", "move:client:html"]));

gulp.task("move:server", gulp.series(["move:server:js"]));

gulp.task("move:lib", gulp.series(["move:lib:client", "move:lib:global"]));

gulp.task("move", gulp.series(["move:server", "move:client", "move:lib"]));

gulp.task("page", function() {
  return gulp.src("dist/client/**/*")
    .pipe(ghPages({
    	branch: "page"
    }));
});

gulp.task("deploy", gulp.series(["build", "page"]));

gulp.task("watch", function() {
	gulp.watch([paths.client.all], gulp.series(["move:client"]));
	gulp.watch([paths.server.all], gulp.series(["move:server", "move:client"]));
	gulp.watch([paths.libClient], gulp.series(["move:lib", "move:client"]));
	gulp.watch([paths.libGlobal], gulp.series(["move:lib", "move:client"]));
});

gulp.task("run", gulp.series(["move"], function() {
	return nodemon({
		delay: 0,
		script: "server/server.js",
		cwd: "dist/"
	});
}));