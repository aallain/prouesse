angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ProgrammesCtrl', function($scope, $ionicPopup, ProgrammeFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.data = {};
    $scope.programmes = ProgrammeFactory.programmes();

  })
  $scope.save = function(){
    if (Object.keys($scope.data).length !== 0)
      ProgrammeFactory.createOrUpdateProgramme($scope.data);
      $state.go("app.programmes");
  };

  $scope.delete = function(programme) {
    let confirmPopup = $ionicPopup.confirm({
      title: 'Deleting Programme',
      template: 'Are you sure you want to delete '+ programme.name +'?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        ProgrammeFactory.deleteProgramme(programme.name);
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

.controller('NewProgrammesCtrl', function($scope,  $state, ProgrammeFactory, SeanceFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.data = {};
    $scope.programmes = ProgrammeFactory.programmes();
    $scope.seances = SeanceFactory.seances();
    $scope.data.seances = {};
  });


  $scope.save = function(){
    if (Object.keys($scope.data).length !== 0)
      ProgrammeFactory.createOrUpdateProgramme($scope.data);
      $state.go("app.programmes");
  };

  $scope.addSeance = function(seance){
    if ( ! (seance.name in $scope.data.seances) ) {
      $scope.data.seances[seance.name] = seance;
    }
  };

  $scope.deleteSeance = function(seance){
    if (seance.name in $scope.data.seances){
      delete $scope.data.seances [seance.name];
    }
  }
})

.controller('EditProgrammeCtrl', function($scope,  $state, $stateParams, SeanceFactory, ProgrammeFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.data = $stateParams.data;
    $scope.data.seances = $stateParams.data.seances;
    $scope.seances = SeanceFactory.seances();

  });

  $scope.save = function(){
    if (Object.keys($scope.data).length !== 0)
      ProgrammeFactory.createOrUpdateProgramme($scope.data);
      $state.go("app.programmes");
  };

  $scope.addSeance = function(seance){
    if ( ! (seance.name in $scope.data.seances) ) {
      $scope.data.seances[seance.name] = seance;
    }
  };

  $scope.deleteSeance = function(seance){
    if (seance.name in $scope.data.seances){
      delete $scope.data.seances [seance.name];
    }
  };

})

.controller('SeancesCtrl', function($scope, $ionicPopup, SeanceFactory, ExerciceFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.data = {};
    $scope.exercicesDefault = ExerciceFactory.exercicesDefault();
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

  $scope.delete = function(seance) {
    $scope.data = {};
    let confirmPopup = $ionicPopup.confirm({
      title: 'Deleting Seance',
      template: 'Are you sure you want to delete '+ seance.name +'?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        SeanceFactory.deleteSeance(seance.name);
        $scope.seances = SeanceFactory.seances();
      }
    });
  };
})

.controller('EditSeanceCtrl', function($scope,  $state,$stateParams,SeanceFactory, ExerciceFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.data = $stateParams.data;
    $scope.exercicesSave = $stateParams.data.exercices;
    $scope.exercicesDefault = ExerciceFactory.exercicesDefault();
    $scope.exercices = ExerciceFactory.exercices();
    $scope.seances = SeanceFactory.seances();
    $scope.groups = ExerciceFactory.groups();

  });

  $scope.save = function(){
    if (Object.keys($scope.data).length !== 0)
      SeanceFactory.createOrUpdateSeance($scope.data);
      $state.go("app.seances");
  };

  $scope.deleteExercice = function(exercice){
    if (exercice.name in $scope.data.exercices){
      delete $scope.data.exercices [exercice.name];
    }
  }

  $scope.addExercice = function(exercice){
    if ( ! (exercice.name in $scope.data.exercices) ) {
      $scope.data.exercices[exercice.name] = exercice;
    }
  };

})

.controller('NewSeanceCtrl', function($scope, $state, SeanceFactory, ExerciceFactory) {
  $scope.$on("$ionicView.enter", function() {
    $scope.data = {};
    $scope.exercicesDefault = ExerciceFactory.exercicesDefault();
    $scope.exercices = ExerciceFactory.exercices();
    $scope.seances = SeanceFactory.seances();
    $scope.groups = ExerciceFactory.groups();
    $scope.data.exercices = {};
  });

  $scope.deleteExercice = function(exercice){
    if (exercice.name in $scope.data.exercices){
      delete $scope.data.exercices [exercice.name];
    }
  }

  $scope.addExercice = function(exercice){
    if ( ! (exercice.name in $scope.data.exercices) ) {
      $scope.data.exercices[exercice.name] = exercice;
    }
  };

  $scope.save = function(){
    if (Object.keys($scope.data).length !== 0)
      SeanceFactory.createOrUpdateSeance($scope.data);
      $state.go("app.seances");
  };

  $scope.delete = function(){
    SeanceFactory.deleteSeance();
    $scope.data = {};
  };

})

.controller('EditExerciceCtrl', function($scope, $state, $stateParams, ExerciceFactory) {
  $scope.$on("$ionicView.enter", function() {
    $scope.data = $stateParams.data;
    $scope.groups = ExerciceFactory.groups();
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
    if (Object.keys($scope.data).length !== 0){
      ExerciceFactory.createOrUpdateExercice($scope.data);
      $state.go("app.exercices");
    }
  }

})

.controller('NewExerciceCtrl', function($scope, $state, ExerciceFactory) {

  $scope.$on("$ionicView.enter", function() {
    $scope.data = {};
    $scope.groups = ExerciceFactory.groups();
  });

  $scope.delete = function(){
    ExerciceFactory.deleteExercices();
    $scope.data = {};
  };

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
    console.log("oui");
    if (Object.keys($scope.data).length !== 0){
      ExerciceFactory.createOrUpdateExercice($scope.data);
      $state.go("app.exercices");
    }
  };
})

.controller('ExercicesCtrl', function($scope, $state, $ionicPopup, ExerciceFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.data = {};
    $scope.exercices = ExerciceFactory.exercices();
    $scope.exercicesDefault = ExerciceFactory.exercicesDefault();
    $scope.groups = ExerciceFactory.groups();
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

  $scope.delete = function(exercice) {
    let confirmPopup = $ionicPopup.confirm({
      title: 'Deleting exercice',
      template: 'Are you sure you want to delete '+ exercice.name +'?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        ExerciceFactory.deleteExercice(exercice.name);
        $scope.exercices = ExerciceFactory.exercices();
      }
    });
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

.controller('WorkoutSeanceCtrl', function($scope, $state, $stateParams, SeanceFactory) {
  $scope.$on("$ionicView.enter", function(){
    $scope.data = {};
    $scope.seance =  $stateParams.data;
    $scope.data.nb_sets = 1;
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

  $scope.updateSets = function () {
      $scope.data.sets = new Array($scope.data.nb_sets);
  }
})
