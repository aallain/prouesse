angular.module('app.filters', [])

.factory('BlankFilter', [function(){

}])

.filter('toArray', function () {
  return function (obj, addKey) {
    if (!angular.isObject(obj)) return obj;
    if ( addKey === false ) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    } else {
      return Object.keys(obj).map(function (key) {
        var value = obj[key];
        return angular.isObject(value) ?
          Object.defineProperty(value, '$key', { enumerable: false, value: key}) :
          { $key: key, $value: value };
      });
    }
  };
})

.filter('difference', [function() {
  // TODO optimiser
    return function(arr1, arr2){
      arr3 = {};
      angular.forEach(arr1, (obj1, key) => {
        obj1.hide = key in arr2;
      });
      // console.log(arr1);
      return arr1;
    }
}])
