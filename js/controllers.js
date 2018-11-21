angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('ExercicesCtrl', function($scope, $state, $ionicPopup, ExerciceFactory) {
    $scope.$on("$ionicView.enter", function(){
      $scope.types = ExerciceFactory.types();
      $scope.groups = ExerciceFactory.groups();
      $scope.exercices = ExerciceFactory.exercices();
    });

    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };

    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };

    $scope.remove = function(exercice) {
      let confirmPopup = $ionicPopup.confirm({
        title: 'Deleting exercice',
        template: 'Are you sure you want to delete '+ exercice.name +'?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          ExerciceFactory.remove(exercice.name);
          $scope.exercices = ExerciceFactory.exercices();
        }
      });
    };
  })

.controller('ExerciceCreateCtrl', function($scope, $state, ExerciceFactory) {

  $scope.$on("$ionicView.enter", function() {
    $scope.exercice = {};
    $scope.groups = ExerciceFactory.groups();
    $scope.types = ExerciceFactory.types();
  });

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };

  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  $scope.save = function() {
    if (Object.keys($scope.exercice).length !== 0){
      ExerciceFactory.createOrUpdate($scope.exercice);
      $state.go("app.exercices");
    }
  };
})

.controller('ExerciceEditCtrl', function($scope, $state, $stateParams, ExerciceFactory) {
    $scope.$on("$ionicView.enter", function() {
      $scope.exercice = $stateParams.exercice;
      $scope.groups = ExerciceFactory.groups();
      $scope.types = ExerciceFactory.types();
    });

    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };

    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };

    $scope.save = function() {
      if (Object.keys($scope.exercice).length !== 0){
        ExerciceFactory.createOrUpdate($scope.exercice);
        $state.go("app.exercices");
      }
    }

})

.controller('SeancesCtrl', function($scope, $ionicPopup, SeanceFactory, ExerciceFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.exercices = ExerciceFactory.exercices();
    $scope.seances = SeanceFactory.seances();
  });

  $scope.toggleGroup = function(list) {
    if ($scope.isGroupShown(list)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = list;
    }
  };

  $scope.isGroupShown = function(list) {
    return $scope.shownGroup === list;
  };

  $scope.remove = function(seance) {
    let confirmPopup = $ionicPopup.confirm({
      title: 'Deleting Seance',
      template: 'Are you sure you want to delete '+ seance.name +'?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        SeanceFactory.remove(seance.name);
        $scope.seances = SeanceFactory.seances();
      }
    });
  };
})

.controller('SeanceCreateCtrl', function($scope, $state, SeanceFactory, ExerciceFactory) {
    $scope.$on("$ionicView.enter", function() {
      $scope.seance = {};
      $scope.seance.exercices = {};
      $scope.exercices = ExerciceFactory.exercices();
      $scope.seances = SeanceFactory.seances();
      $scope.groups = ExerciceFactory.groups();
      $scope.types = ExerciceFactory.types();
    });

    $scope.removeExercice = function(exercice){
      if (exercice.name in $scope.seance.exercices){
        delete $scope.seance.exercices [exercice.name];
      }
    }

    $scope.addExercice = function(exercice){
      if ( ! (exercice.name in $scope.seance.exercices) ) {
        $scope.seance.exercices[exercice.name] = exercice;
      }
    };

    $scope.save = function(){
      if (Object.keys($scope.seance).length !== 0)
        SeanceFactory.createOrUpdate($scope.seance);
      $state.go("app.seances");
    };

})

.controller('SeanceEditCtrl', function($scope,  $state,$stateParams,SeanceFactory, ExerciceFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.seance = $stateParams.seance;
    $scope.seance.exercices = $stateParams.seance.exercices;
    $scope.exercices = ExerciceFactory.exercices();
    $scope.seances = SeanceFactory.seances();
    $scope.groups = ExerciceFactory.groups();
    $scope.types = ExerciceFactory.types();
  });

  $scope.save = function(){
    if (Object.keys($scope.seance).length !== 0)
      SeanceFactory.createOrUpdate($scope.seance);
    $state.go("app.seances");
  };

  $scope.removeExercice= function(exercice){
    if (exercice.name in $scope.seance.exercices){
      delete $scope.seance.exercices [exercice.name];
    }
  }

  $scope.addExercice = function(exercice){
    if ( ! (exercice.name in $scope.seance.exercices) ) {
      $scope.seance.exercices[exercice.name] = exercice;
    }
  };

})

.controller('ProgrammesCtrl', function($scope, $ionicPopup, ProgrammeFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.programme = {};
    $scope.programmes = ProgrammeFactory.programmes();

  });

  $scope.save = function(){
    if (Object.keys($scope.programme).length !== 0)
      ProgrammeFactory.createOrUpdate($scope.programme);
      $state.go("app.programmes");
  };

  $scope.delete = function(programme) {
    let confirmPopup = $ionicPopup.confirm({
      title: 'Deleting Programme',
      template: 'Are you sure you want to delete '+ programme.name +'?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        ProgrammeFactory.delete(programme.name);
        $scope.programmes = ProgrammeFactory.programmes();
      }
    });
  };

  $scope.toggleGroup = function(list) {
    if ($scope.isGroupShown(list)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = list;
    }
  };

  $scope.isGroupShown = function(list) {
    return $scope.shownGroup === list;
  };

})

.controller('ProgrammeCreateCtrl', function($scope,  $state, ProgrammeFactory, SeanceFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.programme = {};
    $scope.programme.seances = {};
    $scope.programmes = ProgrammeFactory.programmes();
    $scope.seances = SeanceFactory.seances();
  });

  $scope.save = function(){
    if (Object.keys($scope.programme).length !== 0)
      ProgrammeFactory.createOrUpdate($scope.programme);
      $state.go("app.programmes");
  };

  $scope.addSeance = function(seance){
    if ( ! (seance.name in $scope.programme.seances) ) {
      $scope.programme.seances[seance.name] = seance;
    }
  };

  $scope.deleteSeance = function(seance){
    if (seance.name in $scope.programme.seances){
      delete $scope.programme.seances [seance.name];
    }
  }
})

.controller('ProgrammeEditCtrl', function($scope,  $state, $stateParams, SeanceFactory, ProgrammeFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.programme = $stateParams.programme;
    $scope.programme.seances = $stateParams.programme.seances;
    $scope.seances = SeanceFactory.seances();

  });

  $scope.save = function(){
    if (Object.keys($scope.programme).length !== 0)
      ProgrammeFactory.createOrUpdate($scope.programme);
      $state.go("app.programmes");
  };

  $scope.addSeance = function(seance){
    if ( ! (seance.name in $scope.programme.seances) ) {
      $scope.programme.seances[seance.name] = seance;
    }
  };

  $scope.deleteSeance = function(seance){
    if (seance.name in $scope.programme.seances){
      delete $scope.programme.seances [seance.name];
    }
  };

})

.controller('WorkoutCtrl', function($scope, ProgrammeFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.programmes =  ProgrammeFactory.programmes();
  });
  $scope.toggleGroup = function(list) {
    if ($scope.isGroupShown(list)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = list;
    }
  };

  $scope.isGroupShown = function(list) {
    return $scope.shownGroup === list;
  };
})

.controller('WorkoutCreateCtrl', function($scope, $interval, $state, $stateParams, $ionicPopup, SeanceFactory, WorkoutFactory, ExerciceFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.workout = Object.assign({}, $stateParams.seance);
    $scope.set = {};
    $scope.workout.name += '-' + getCurrentDate();
    $scope.exercices = ExerciceFactory.exercices();
    $scope.groups = ExerciceFactory.groups();
    $scope.types = ExerciceFactory.types();
    $scope.stop = $interval(()=>{
      if (Object.keys($scope.workout).length !== 0) {
        WorkoutFactory.createOrUpdate($scope.workout);
      }
    }, 500)
  });
  $scope.$on("$ionicView.leave", function(){
    $interval.cancel( $scope.stop );
  })

  let getCurrentDate = function() {
    const today = new Date();
    return today.getFullYear() + '-' + ('0' + (  today.getMonth() + 1)).slice(-2) + '-' + ('0' +   today.getDate()).slice(-2);
  }

  $scope.toggleGroup = function(list) {
    if ($scope.isGroupShown(list)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = list;
    }
  };

  $scope.isGroupShown = function(list) {
    return $scope.shownGroup === list;
  };

  $scope.isSetComplete = function(set) {
    return $scope.shownGroup === set;
  };

  $scope.updateIconExo = function (exercice) {
    if ( ! exercice.hasOwnProperty("sets"))
      return false;
    for (set of exercice.sets) {
      if (angular.equals({}, set))
        return false;
      if (!set.rep)
        return false;
      if (!set.weight)
        return false;
    }
    return true;
  };

  $scope.updateSets = function (exercice) {
    exercice.sets = new Array(exercice.nb_sets);
    for (var i = 0; i < exercice.sets.length; i++) {
      exercice.sets[i] = {};
    }
  };

  $scope.save = function() {
    if (Object.keys($scope.workout).length !== 0){
      WorkoutFactory.createOrUpdate($scope.workout);
      $state.go("app.workout");
    }
  };

  $scope.removeExercice = function(exercice ) {
    let confirmPopup = $ionicPopup.confirm({
      title: 'Deleting exercice',
      template: 'Are you sure you want to delete '+ exercice.name +' for this workout ?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        delete $scope.workout.exercices[exercice.name];
      }
    });
  };

  $scope.addExercice = function(exercice){
    if ( ! (exercice.name in $scope.workout.exercices) ) {
      $scope.workout.exercices[exercice.name] = exercice;
    }
  };

})

.controller('WorkoutEditCtrl', function($scope, $state, $stateParams, $ionicPopup, SeanceFactory, WorkoutFactory, ExerciceFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.workout = $stateParams.workout;
    $scope.set = {};
    $scope.exercices = ExerciceFactory.exercices();
    $scope.groups = ExerciceFactory.groups();
    $scope.types = ExerciceFactory.types();
  });


  $scope.toggleGroup = function(list) {
    if ($scope.isGroupShown(list)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = list;
    }
  };

  $scope.isGroupShown = function(list) {
    return $scope.shownGroup === list;
  };

  $scope.isSetComplete = function(set) {
    return $scope.shownGroup === set;
  };

  $scope.updateIconExo = function (exercice) {
    if ( ! exercice.hasOwnProperty("sets"))
      return false;
    for (set of exercice.sets) {
      if (angular.equals({}, set))
        return false;
      if (!set.rep)
        return false;
      if (!set.weight)
        return false;
    }
    return true;
  };

  $scope.updateSets = function (exercice) {
    exercice.sets = new Array(exercice.nb_sets);
    for (var i = 0; i < exercice.sets.length; i++) {
      exercice.sets[i] = {};
    }
  };

  $scope.save = function() {
    if (Object.keys($scope.workout).length !== 0){
      WorkoutFactory.createOrUpdate($scope.workout);
      $state.go("app.history");
    }
  };

  $scope.delete = function(exercice ) {
    let confirmPopup = $ionicPopup.confirm({
      title: 'Deleting exercice',
      template: 'Are you sure you want to delete '+ exercice.name +' for this workout ?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        delete $scope.workout.exercices[exercice.name];
      }
    });
  };

  $scope.addExercice = function(exercice){
    if ( ! (exercice.name in $scope.workout.exercices) ) {
      $scope.workout.exercices[exercice.name] = exercice;
    }
  };

})

.controller('HistoryCtrl', function($scope, ProgrammeFactory, $ionicPopup, WorkoutFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.programmes =  ProgrammeFactory.programmes();
    $scope.workouts = WorkoutFactory.workouts();
  });
  $scope.toggleGroup = function(list) {
    if ($scope.isGroupShown(list)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = list;
    }
  };

  $scope.isGroupShown = function(list) {
    return $scope.shownGroup === list;
  };

  $scope.delete = function(workout) {
    let confirmPopup = $ionicPopup.confirm({
      title: 'Deleting workout',
      template: 'Are you sure you want to delete '+ workout.name +'?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        WorkoutFactory.remove(workout.name);
        $scope.workouts = WorkoutFactory.workouts();
      }
    });
  };

})
