angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

  .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.newProgramme', {
    url: '/newProgramme',
    views: {
      'menuContent': {
        templateUrl: 'templates/newProgramme.html',
        controller: 'NewProgrammesCtrl'
      }
    }
  })

  .state('app.changeProgramme', {
    url: '/$scope.dataProgramme',
    views: {
      'menuContent': {
        templateUrl: 'templates/changeProgramme.html',
        controller: 'EditProgrammeCtrl'
      }
    },
    params: {
      data: null
    }
  })

  .state('app.programmes', {
    url: '/programmes',
    views: {
      'menuContent': {
        templateUrl: 'templates/programmes.html',
        controller: 'ProgrammesCtrl'
      }
    }

  })


  .state('app.newSeance', {
    url: '/newSeance',
    views: {
      'menuContent': {
        templateUrl: 'templates/newSeance.html',
        controller: 'NewSeanceCtrl'
      }
    }
  })

  .state('app.changeSeance', {
    url: '/changeSeance',
    views: {
      'menuContent': {
        templateUrl: 'templates/changeSeance.html',
        controller: 'EditSeanceCtrl'
      }
    },
    params: {
      data: null
    }
  })

  .state('app.seances', {
    url: '/seances',
    views: {
      'menuContent': {
        templateUrl: 'templates/seances.html',
        controller: 'SeancesCtrl'
      }
    }
  })


  .state('app.newExercice', {
    url: '/newExercice',
    views: {
      'menuContent': {
        templateUrl: 'templates/newExercice.html',
        controller: 'NewExerciceCtrl'
      }
    }
  })

  .state('app.exercices', {
    url: '/exercices',
    views: {
      'menuContent': {
        templateUrl: 'templates/exercices.html',
        controller: 'ExercicesCtrl'
      }
    }
  })

  .state('app.changeExercice', {
    url: '/changeExercice',
    views: {
      'menuContent': {
        templateUrl: 'templates/changeExercice.html',
        controller: 'EditExerciceCtrl'
      }
    },
    params: {
      data: null
    }
  })

  .state('app.workout', {
    url: '/workout',
    views: {
      'menuContent': {
        templateUrl: 'templates/workout.html',
        controller: 'WorkoutCtrl'
      }
    }
  })

  .state('app.workout-seance', {
    url: '/workout-seance',
    views: {
      'menuContent': {
        templateUrl: 'templates/workout-seance.html',
        controller: 'WorkoutSeanceCtrl'
      }
    },
    params: {
      data: null
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/programmes');
})
