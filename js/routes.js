angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
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

  .state('app.exercice_create', {
    url: '/exercice_create',
    views: {
      'menuContent': {
        templateUrl: 'templates/exercice_create.html',
        controller: 'ExerciceCreateCtrl'
      }
    }
  })

  .state('app.exercice_edit', {
    url: '/exercice_edit',
    views: {
      'menuContent': {
        templateUrl: 'templates/exercice_edit.html',
        controller: 'ExerciceEditCtrl'
      }
    },
    params: {
      exercice: null
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

  .state('app.seance_create', {
    url: '/seance_create',
    views: {
      'menuContent': {
        templateUrl: 'templates/seance_create.html',
        controller: 'SeanceCreateCtrl'
      }
    }
  })

  .state('app.seance_edit', {
    url: '/seance_edit',
    views: {
      'menuContent': {
        templateUrl: 'templates/seance_edit.html',
        controller: 'SeanceEditCtrl'
      }
    },
    params: {
      seance: null
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

  .state('app.programme_create', {
    url: '/programme_create',
    views: {
      'menuContent': {
        templateUrl: 'templates/programme_create.html',
        controller: 'ProgrammeCreateCtrl'
      }
    }
  })

  .state('app.programme_edit', {
    url: '/programme_edit',
    views: {
      'menuContent': {
        templateUrl: 'templates/programme_edit.html',
        controller: 'ProgrammeEditCtrl'
      }
    },
    params: {
      programme: null
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

  .state('app.workout_create', {
    url: '/workout_create',
    views: {
      'menuContent': {
        templateUrl: 'templates/workout_create.html',
        controller: 'WorkoutCreateCtrl'
      }
    },
    params: {
      seance: null
    }
  })

  .state('app.workout_edit', {
    url: '/workout_edit',
    views: {
      'menuContent': {
        templateUrl: 'templates/workout_edit.html',
        controller: 'WorkoutEditCtrl'
      }
    },
    params: {
      workout: null
    }
  })

  .state('app.history', {
    url: '/history',
    views: {
      'menuContent': {
        templateUrl: 'templates/history.html',
        controller: 'HistoryCtrl'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/programmes');
})
