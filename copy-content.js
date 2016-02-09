"use strict";
angular.module("copyPopup", ["ionic"])
.directive("copyContent", function ($rootScope, $compile, $document, $timeout, $ionicGesture, $ionicPosition) {
    return {
        scope:{},
        link: function($scope, $element, $attr){
            $scope.popupObj = {
                copying:false,
                isAtTop:($ionicPosition.offset($element).top < 125)
            };
            var popup = "<copy-bubble popup-obj='popupObj' ng-show='popupObj.copying'></copy-bubble>";
            var el = $compile( popup )( $scope );
            $element.append( el );
            $scope.popupObj.addPopup = function(){
                $scope.popupObj.copying = true;
                $element.addClass("copy-select");
            };
            $ionicGesture.on("hold",function(){
                $scope.$evalAsync(function(){
                    $scope.popupObj.addPopup();
                })
            },$element);
            $scope.popupObj.removePopup = function(){
                $scope.popupObj.copying = false;
                $element.removeClass('copy-select');
            };
            $scope.popupObj.copyItem = function () {
                var copyString = $attr.copyContent;
                //  console.log(copyString);
                if(cordova.plugins){
                    cordova.plugins.clipboard.copy(copyString);
                }
                $scope.popupObj.removePopup();
            };
        }
    }
}).directive("copyBubble", function ($rootScope, $compile, $document, $timeout) {
    return {
        template: "" +
        "<div class='copy-popup' ng-class='{under: popupObj.isAtTop}'>" +
        "<input type='button' ng-blur='popupObj.removePopup()' value='Copy' ng-click='popupObj.copyItem()' class='button button-dark'>" +
        "</div>",
        link: function ($scope, $element, $attr) {
            if ($attr.ngShow) {
                $scope.$watch($attr.ngShow, function (newValue) {
                    if (newValue) {
                        $timeout(function () {
                            $element.find('input').focus();
                        });
                    }
                })
            }
        }
    }
});