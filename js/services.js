angular.module('app.services', [])

.factory('ExerciceFactory', ['$localStorage', function($localStorage){

  $localStorage.exercicesDefault = {
    'Curl':{name: "Curl", description: "Curl", type: "Barre", groupes:
        ["Biceps"]},
    'Developer couché':{name: "Developer couché", description: "Developer couché", type: "Barre", groupes: ["Pecs"]},
    'Developer couché incliné':{name: "Developer couché incliné", description: "Developer couché", type: "Barre", groupes: ["Pecs"]},
    'Developer couché desincliné':{name: "Developer couché desincliné", description: "Developer couché", type: "Barre", groupes: ["Pecs"]},
    'Triceps poulie barre':{name: "Triceps poulie barre", description: "Triceps poulie", type: "Poulie", groupes: ["Triceps"]},
    'Triceps poulie corde':{name: "Triceps poulie corde", description: "Triceps poulie", type: "Poulie", groupes: ["Triceps"]},
    'Traction':{name: "Traction", description: "", type: "Poids du corps", groupes: ["Dos"]},
    'Dos poulie':{name: "Dos poulie", description: "", type: "Poulie", groupes: ["Dos"]},
    'Squat':{name: "Squat", description: "", type: "Poids du corps", groupes: ["Autre Jambe","Quadriceps"]},

  };

  let groups = [
      {name:'Bras',items:['Biceps','Triceps','Autre Bras']},
      {name:'Tronc',items:['Pecs','Dos','Epaules','Abdos', 'Autre Tronc']},
      {name:'Jambe',items:['Quadriceps','Ischio','Mollet','Autre Jambe']}
    ];

  let check = function(item){
    return item;
  };

  if ($localStorage.exercices === undefined) {
    $localStorage.exercices = {};
  };

  let createExercice = function(data){
    if ($localStorage.exercices.hasOwnProperty(data.name)) {
      console.log("exist déja");
    } else {
      $localStorage.exercices[data.name] = data;
    }
  };

  let createOrUpdateExercice = function(exercice){
    if (exercice.name in $localStorage.exercices){
      changeExercice(exercice);
    } else {
      createExercice(exercice);
    }
  };

  let changeExercice = function(data){

    $localStorage.exercices[data.name] = data;

  };

  let deleteExercices = function(data){
    $localStorage.exercices = {};
  };

  let deleteExercice = function(exerciceName){
    delete $localStorage.exercices[exerciceName];
  };

  return{
    createOrUpdateExercice : createOrUpdateExercice,
    deleteExercice: deleteExercice,
    deleteExercices: deleteExercices,
    groups : () => {return groups},
    check : check,
    exercicesDefault: ()=>{return $localStorage.exercicesDefault;},
    exercices: ()=>{return $localStorage.exercices;}
  }

}])

.factory('ProgrammeFactory', ['$localStorage', function($localStorage){
  if ($localStorage.programmes === undefined) {
    $localStorage.programmes = {};
  };

  let createProgramme = function(data){
    if ($localStorage.programmes.hasOwnProperty(data.name)) {
      // cet exo existe deja
      console.log($localStorage.programmes);
    } else {
      $localStorage.programmes[data.name] = data;
      console.log($localStorage.programmes);
    }
  };

  let addSeance = function(seance){
    $localStorage.seancesSave[seance.name] = seance;
  };

  let editProgramme = function(data){
    console.log($localStorage.programmes[data.name])
    $localStorage.programmes[data.name] = data;

  };

  let deleteProgramme = function(programmeName){
    delete $localStorage.programmes[programmeName];
  };

  let changeProgramme = function(data){
    $localStorage.programmes[data.name] = data;
  };

  let createOrUpdateProgramme = function(programme){
    if (programme.name in $localStorage.programmes){
      changeProgramme(programme);
    } else {
      createProgramme(programme);
    }
  };

  return{
    addSeance: addSeance,
    editProgramme: editProgramme,
    createOrUpdateProgramme: createOrUpdateProgramme,
    createProgramme: createProgramme,
    deleteProgramme: deleteProgramme,
    programmes: ()=>{return $localStorage.programmes;}
  }
}])

.factory('SeanceFactory', ['$localStorage', function($localStorage){
  $localStorage.exercicesSave = {}

  if ($localStorage.seances === undefined) {
    $localStorage.seances = {};
  };

  let createSeance = function(data){
    if ($localStorage.seances.hasOwnProperty(data.name)) {
      // cet exo existe deja
      console.log($localStorage.seances);
    } else {
      $localStorage.seances[data.name] = data;
      console.log($localStorage.seances);
    }
  };

  let createOrUpdateSeance = function(seance){
    if (seance.name in $localStorage.seances){
      changeSeance(seance);
    } else {
      createSeance(seance);
    }
  };

  let changeSeance = function(data){
    console.log($localStorage.seances[data.name])
    $localStorage.seances[data.name] = data;
  };

  let deleteSeance = function(seancename){
    delete $localStorage.seances[seancename];
  };

  let addExercice = function(exercice){
    $localStorage.exercicesSave[exercice.name] = exercice;
  };

  return{
    addExercice: addExercice,
    createSeance: createSeance,
    deleteSeance: deleteSeance,
    changeSeance: changeSeance,
    createOrUpdateSeance: createOrUpdateSeance,
    seances: ()=>{return $localStorage.seances;},
    exercicesSave: ()=>{return $localStorage.exercicesSave;},
  }
}])
