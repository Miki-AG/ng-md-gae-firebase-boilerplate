let gulp = require('gulp');
let gae = require('gulp-gae');
let gae2 = require('gulp-gae-improved');

let os = require('os');
const readlineSync = require('readline-sync');

// gulp gae-serve --local
gulp.task('gae-serve', gulp.series(done => {
    gulp.src('app.yaml')
        .pipe(gae('dev_appserver.py', [
            // https://cloud.google.com/appengine/docs/standard/python/tools/migrate-cloud-datastore-emulator
            // Enable cloud-datastore-emulator
            // '--support_datastore_emulator=true'
            ], {
            port: 8081,
            host: '0.0.0.0',
            admin_port: 8001,
            admin_host: '0.0.0.0'
        }));
    done();
}));

gulp.task('gae-serve2', () => {
    gulp.src('app.yaml')
        .pipe(gae2('dev_appserver.py', {
            port: 8081,
            host: '0.0.0.0',
            admin_port: 8001,
            admin_host: '0.0.0.0'
        }));
});

gulp.task('gae-deploy', function() {
    gulp.src('app/app.yaml')
        .pipe(gae('appcfg.py', ['update'], {
            version: 'dev',
            oauth2: undefined // for value-less parameters
        }));
});

gulp.task('run', gulp.series('gae-serve'));
gulp.task('run2', gulp.series('gae-serve2'));


// gulp run
//  or
// gulp run --prod
gulp.task('run-and-ask', gulp.series(
    done => {
        let env;
        // if (process.argv.indexOf('--stg1') != -1) {
        //   env = 'stg1';
        // } else if (process.argv.indexOf('--prod') != -1) {
        //   env = 'prod';
        // } else {
        //   env = 'local';
        // }
        // pathToConfig = './app/conf/config.' + env;
        // console.log('[' + env + '] Hostname: ' + os.hostname() + ' @ ' + pathToConfig);
        // config = require(pathToConfig);
        if (env == 'prod') {
            if (readlineSync.keyInYN('Are you sure?')) {
                return done();
            } else {
                process.exit(1);
            }
        } else {
            return done();
        }
    },
    gulp.series(
        // 'dummie'
        'gae-serve2'
        // 'buildSass',
        // 'buildFonts',
        // 'buildFontsCss',
        // 'buildJS',
        // 'moveCustomJSFiles'
    )
));