angular.module('tribeio', [
    'tribe-projects',
    'tribe-contributors',
    'tribe-projects-carousel',
    'tribe-twitter',
    'tribe-project-details',
    'tribe-project-highlight',
    'ngRoute'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/page-main.html'
        }).when('/projects', {
            templateUrl: 'app/page-projects.html'
        }).when('/contributors', {
            templateUrl: 'app/page-contributors.html'
        }).when('/projects/:project', {
            templateUrl: 'app/page-project-details.html'
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }])
    .controller('HeaderImageController', ['$element', function ($element) {
        $(window).scroll(function () {
            var step = $(this).scrollTop();
            $element.css({
                'transform': 'translateY(' + (step / 3) + 'px)'
            });
        });
    }]);
