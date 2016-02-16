# copy-popup
Angular/Ionic directive mocking native "hold-to-copy" functionality

## Dependencies
* Ionic
* Angular

## Installation
In terminal:
```
bower install copy-popup
```

Then add as a module in your project:
```
angular.module("yourApp", ["copy-popup"])
```

##Use
All you have to do is add copy-content to the element and pass in the scope variable you want copied
```
<div copy-content="{{foo.content}}"></div>
```

Works best when element is `position:relative`

###TODO
* Remove Ionic dependency
* Dynamically add/remove popup element instead of just showing/hiding
* Remove need for position:relative