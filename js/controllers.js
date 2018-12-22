angular.module('app.controllers', [])

.controller('AppCtrl', function($scope) {
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

.controller('ExercicesCtrl', function($scope, $state, $ionicPopup, ExerciceFactory) {
    $scope.$on("$ionicView.enter", function(){
      $scope.types = ExerciceFactory.types();
      $scope.groups = ExerciceFactory.groups();
      $scope.exercices = ExerciceFactory.exercices();
    });

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
      $scope.seance.exercices = [];
      $scope.exercices = ExerciceFactory.exercices();
      $scope.seances = SeanceFactory.seances();
      $scope.groups = ExerciceFactory.groups();
      $scope.types = ExerciceFactory.types();
    });

    $scope.removeExercice = function(exercice_name){
      const index = $scope.seance.exercices.indexOf(exercice_name);
      if ( index !== -1 ){
        $scope.seance.exercices.splice(index, 1);
      }
    };

    $scope.addExercice = function(exercice){
      if ( $scope.seance.exercices.indexOf(exercice.name) === -1 ) {
        $scope.seance.exercices.push(exercice.name);
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

  $scope.removeExercice = function(exercice_name){
    const index = $scope.seance.exercices.indexOf(exercice_name);
    if ( index !== -1 ){
      $scope.seance.exercices.splice(index, 1);
    }
  };

  $scope.addExercice = function(exercice){
    if ( $scope.seance.exercices.indexOf(exercice.name) === -1 ) {
      $scope.seance.exercices.push(exercice.name);
    }
  };

  $scope.save = function(){
    if (Object.keys($scope.seance).length !== 0)
      SeanceFactory.createOrUpdate($scope.seance);
    $state.go("app.seances");
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

  $scope.remove = function(programme) {
    let confirmPopup = $ionicPopup.confirm({
      title: 'Deleting Programme',
      template: 'Are you sure you want to delete '+ programme.name +'?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        ProgrammeFactory.remove(programme.name);
        $scope.programmes = ProgrammeFactory.programmes();
      }
    });
  };
})

.controller('ProgrammeCreateCtrl', function($scope,  $state, ProgrammeFactory, SeanceFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.programme = {};
    $scope.programme.seances = [];
    $scope.seances = SeanceFactory.seances();
  });

  $scope.save = function(){
    if (Object.keys($scope.programme).length !== 0)
      ProgrammeFactory.createOrUpdate($scope.programme);
      $state.go("app.programmes");
  };

  $scope.removeSeance = function(seance_name){
    const index = $scope.programme.seances.indexOf(seance_name);
    if ( index !== -1 ){
      $scope.programme.seances.splice(index, 1);
    }
  };

  $scope.addSeance = function(seance){
    if ( $scope.programme.seances.indexOf(seance.name) === -1 ) {
      $scope.programme.seances.push(seance.name);
    }
  };

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

  $scope.removeSeance = function(seance_name){
    const index = $scope.programme.seances.indexOf(seance_name);
    if ( index !== -1 ){
      $scope.programme.seances.splice(index, 1);
    }
  };

  $scope.addSeance = function(seance){
    if ( $scope.programme.seances.indexOf(seance.name) === -1 ) {
      $scope.programme.seances.push(seance.name);
    }
  };

})

.controller('WorkoutsCtrl', function($scope, ProgrammeFactory) {

  $scope.$on("$ionicView.enter", function(){
    $scope.programmes =  ProgrammeFactory.programmes();
  });

})

.controller('WorkoutCreateCtrl', function($scope, $interval, $state, $stateParams, $ionicPopup, SeanceFactory, WorkoutFactory, ExerciceFactory) {

  $scope.$on("$ionicView.enter", function(){
    //TODO gerer les back après refresh
    let seance = SeanceFactory.get($stateParams.seance_name);
    $scope.workout = {name: seance.name + '-' + getCurrentDate()};
    $scope.workout.exercices = {};
    for (let exercice_name of seance.exercices) {
      $scope.workout.exercices[exercice_name] = ExerciceFactory.get(exercice_name);
    }
    $scope.set = {};
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
  });

  let getCurrentDate = function() {
    const today = new Date();
    return today.getFullYear() + '-' + ('0' + (  today.getMonth() + 1)).slice(-2) + '-' + ('0' +   today.getDate()).slice(-2);
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
      $state.go("app.workouts");
    }
  };

  $scope.removeExercice = function(exercice){
    if ( exercice.name in $scope.workout.exercices ) {
      delete $scope.workout.exercices[exercice.name];
    }
  };

  $scope.addExercice = function(exercice){
    if ( !( exercice.name in $scope.workout.exercices)) {
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
