## README

**Brief Intro**
This is a demo project to test default installation of Laravel 12 with React startup kit and Inertia UI, with Sanctum auth for API, and Raverb broadcast server.

**Setup Sequence**
* Clone project
* `npm install && npm run build`
* `composer install`
* Setup `.env` file
* `php artisan key:generate`
* `php artisan migrate`

**Run Server**
* `composer run dev`
* `php artisan reverb:start` ( `--debug` to enable debug)