angular.module('app.services', [])

.factory('ExerciceFactory', ['$localStorage', function($localStorage){

  const default_exercices = {
    'Curl':{name: "Curl", description: "Curl", type: "Barre", groups:["Biceps"], default : true},
    'Curl marteau halteres':{name: "Curl marteau halteres", description: "Curl marteau halteres", type: "Haltere", groups:["Biceps"], default : true},
    'Developer couché':{name: "Developer couché", description: "Developer couché", type: "Barre", groups: ["Pecs"], default : true},
    'Developer couché incliné':{name: "Developer couché incliné", description: "Developer couché", type: "Barre", groups: ["Pecs"], default : true},
    'Developer couché desincliné':{name: "Developer couché desincliné", description: "Developer couché", type: "Barre", groups: ["Pecs"], default : true},
    'Triceps poulie barre':{name: "Triceps poulie barre", description: "Triceps poulie 2222", type: "Poulie", groups: ["Triceps"], default : true},
    'Triceps poulie corde':{name: "Triceps poulie corde", description: "Triceps poulie", type: "Poulie", groups: ["Triceps"], default : true},
    'Traction':{name: "Traction", description: "Traction", type: "Poids du corps", groups: ["Dos"], default : true},
    'Tirage horizontal':{name: "Tirage horizontal", description: "Tirage horizontal", type: "Poulie", groups: ["Dos"], default : true},
    'Tirage vertical':{name: "Tirage vertical", description: "Tirage vertical", type: "Poulie", groups: ["Dos"], default : true},
    'Priere':{name: "Priere", description: "Priere", type: "Poulie", groups: ["Dos"], default : true},
    'Papillon':{name: "Papillon", description: "élevation des haltère buste incliné vers l'avant", type: "Haltere", groups: ["Epaules"], default : true},
    'Squat':{name: "Squat", description: "", type: "Poids du corps", groups: ["Autre Jambe","Quadriceps"], default : true}
  };

  const types = ["Haltere", "Poulie", "Barre", "Poids du corps"];

  const groups = {
    'Bras': ['Biceps', 'Triceps', 'Autre Bras'],
    'Buste': ['Pecs', 'Dos', 'Epaules', 'Abdos', 'Autre Buste'],
    'Jambe': ['Quadriceps', 'Ischio', 'Mollet', 'Autre Jambe']
  };

  let create = function(data){
    if ($localStorage.exercices.hasOwnProperty(data.name)) {
      console.log("exist déja");
    } else {
      $localStorage.exercices[data.name] = data;
    }
  };

  let createOrUpdate = function(exercice){
    if (exercice.name in $localStorage.exercices){
      update(exercice);
    } else {
      create(exercice);
    }
  };

  let update = function(data){
    $localStorage.exercices[data.name] = data;
  };

  let remove = function(exerciceName){
    delete $localStorage.exercices[exerciceName];
  };

  let init = function(){
    if ($localStorage.exercices  === undefined){
      $localStorage.exercices  = default_exercices;
    }
  };
  init();

  return{
    createOrUpdate : createOrUpdate,
    remove: remove,
    types : () => {return types},
    groups : () => {return groups},
    exercices: ()=>{return $localStorage.exercices;},
  }

}])

.factory('SeanceFactory', ['$localStorage', function($localStorage){

  let init = function(){
    if ($localStorage.seances === undefined) {
      $localStorage.seances = {};
    }
  };
  init();

  let createOrUpdate = function(seance){
    if (seance.name in $localStorage.seances){
      update(seance);
    } else {
      create(seance);
    }
  };

  let create = function(data){
    if ($localStorage.seances.hasOwnProperty(data.name)) {
      // cet exo existe deja
    } else {
      $localStorage.seances[data.name] = data;
    }
  };

  let update = function(data){
    $localStorage.seances[data.name] = data;
  };

  let remove = function(seancename){
    delete $localStorage.seances[seancename];
  };

  return{
    create: create,
    remove: remove,
    update: update,
    createOrUpdate: createOrUpdate,
    seances: ()=>{return $localStorage.seances;},
  };

}])

.factory('ProgrammeFactory', ['$localStorage', function($localStorage){

  let init = function(){
    if ($localStorage.programmes === undefined) {
      $localStorage.programmes = {};
    }
  };
  init();


  let create = function(data){
    if ($localStorage.programmes.hasOwnProperty(data.name)) {
      // cet exo existe deja
    } else {
      $localStorage.programmes[data.name] = data;
    }
  };

  let update = function(data){
    console.log($localStorage.programmes[data.name]);
    $localStorage.programmes[data.name] = data;

  };

  let remove = function(programmeName){
    delete $localStorage.programmes[programmeName];
  };


  let createOrUpdate = function(programme){
    if (programme.name in $localStorage.programmes){
      update(programme);
    } else {
      create(programme);
    }
  };

  return{
    update: update,
    createOrUpdate: createOrUpdate,
    create: create,
    remove: remove,
    programmes: ()=>{return $localStorage.programmes;},
  }
}])

.factory('WorkoutFactory', ['$localStorage', function($localStorage){

  let init = function(){
    if ($localStorage.workouts === undefined) {
      $localStorage.workouts = {};
    }
  };
  init();

  let createOrUpdate = function(workout){
    if (workout.name in $localStorage.workouts){
      update(workout);
    } else {
      create(workout);
    }
  };

  let create = function(data){
    if ($localStorage.workouts.hasOwnProperty(data.name)) {
      // cet exo existe deja
    } else {
      $localStorage.workouts[data.name] = data;
    }
  };

  let update = function(data,name){
    //console.log($localStorage.workouts[data.name])
    $localStorage.workouts[data.name] = data;
  };

  let remove = function(workoutName){
    delete $localStorage.workouts[workoutName];
  };

  return{
    update : update,
    create : create,
    createOrUpdate : createOrUpdate,
    remove : remove,
    workouts: ()=>{return $localStorage.workouts;},
  };
}])
