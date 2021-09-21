/// <reference path="angular-min.js" />
/// <reference path="angular-route-min.js" />

var myApp = angular.module("myModule", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "Templates/Body.html",
                controller: "bodyController"
            })
            .when("/CartDetails", {
                templateUrl: "Templates/CartDetails.html",
                controller: "cartDetailsController"
            })
    })
    .controller("bodyController", function ($scope, $location, $interval, $rootScope, $window) {
        $rootScope.windowWidth = $window.innerWidth - 40;
        $rootScope.windowHeight = $window.innerHeight - 40;
        $scope.message = "HELLO MY CONTROLLER!!!!";
        var stateObj = {};
        stateObj.sliderPageIndex = 0;
        stateObj.translatePosition = 0;
        stateObj.containerWidth = $rootScope.windowWidth;
        $scope.stateObj = stateObj;
        $rootScope.productItems = [{ "p_key": 101, "pname": "Tool Kit", "prate": "149", "prateStr": "Rs.149", "imgSrc": "https://rukminim1.flixcart.com/image/150/150/power-hand-tool-kit/v/v/g/gsb-500-re-kit-bosch-original-imaeg63dbybtqzfy.jpeg?q=70", "tooltip": "Power Hand Tool Kit" },
        { "p_key": 102, "pname": "Smart Watch", "prate": "1400", "prateStr": "Rs.1400", "imgSrc": "https://rukminim1.flixcart.com/image/150/150/kll7bm80/smartwatch/c/1/n/43-mo-sw-sense-500-android-ios-molife-original-imagyzyycnpujyjh.jpeg?q=70", "tooltip": "Smart Watch" },
        { "p_key": 103, "pname": "Fitness Kit", "prate": "100", "prateStr": "Rs.100", "imgSrc": "https://rukminim1.flixcart.com/flap/150/150/image/42837a22152f245f.jpg?q=70", "tooltip": "Fitness Kit" },
        { "p_key": 104, "pname": "Pressure Cooker", "prate": "999", "prateStr": "Rs.999", "imgSrc": "https://rukminim1.flixcart.com/image/200/200/pressure-cooker/w/z/k/cb35-hawkins-original-imaegtf4shgpwpud.jpeg?q=70", "tooltip": "Pressure Cooker" },
        { "p_key": 105, "pname": "Shoe", "prate": "600", "prateStr": "Rs.600", "imgSrc": "https://rukminim1.flixcart.com/image/150/150/kn0n6a80/shoe/5/k/f/9-sp7207-kraasa-navy-original-imagfsq6gnsytdfa.jpeg?q=70", "tooltip": "Shoe" },
        { "p_key": 106, "pname": "Bathroom Essential", "prate": "230", "prateStr": "Rs.230", "imgSrc": "https://rukminim1.flixcart.com/image/150/150/faucet/k/c/z/f160027cp-hindware-original-imaefqjuw9qfvnhq.jpeg?q=70", "tooltip": "Bathroom Essential" },
        { "p_key": 107, "pname": "Mosquito Net", "prate": "600", "prateStr": "Rs.600", "imgSrc": "https://rukminim1.flixcart.com/image/150/150/khtghow0/mosquito-net/t/y/a/blue-mosquito-net-polyester-adults-net-king-size-double-bed-original-imafxqn3uqzdhgey.jpeg?q=70", "tooltip": "Mosquito Net" }];
        $rootScope.cartItems = [];
        $scope.viewCartItems = function () {
            $location.url("/CartDetails");
        }
        var updateSlider = function () {
            var index = $scope.stateObj.sliderPageIndex;
            index = index > 3 ? 0 : index;
            var width = $scope.stateObj.containerWidth;
            var translatePosition = -(width * index);
            $scope.stateObj.translatePosition = translatePosition;
            $scope.stateObj.sliderPageIndex = index + 1;
            $scope.style = $scope.stateObj.translatePosition;
        }
        $interval(updateSlider, 2000);
        updateCartNotificationValues = function () {
            var myElement = angular.element(document.querySelector('#cartNotification'));
            myElement = myElement[0];
            var cart = $rootScope.cartItems;
            if (cart.length > 0) {
                myElement.setAttribute("style", "display:inline");
                myElement.innerText = cart.length;
            } else {
                myElement.setAttribute("style", "display:none")
                myElement.innerText = "";
            }
            console.log("MEGALA======>myElement : ", myElement);
        }
        addItemFuncProp = function ($event, key) {
            console.log("MEGALA=====>addItemFuncProp : ", key);
            var cart = $rootScope.cartItems;
            cart.push(key);
            $rootScope.cartItems = cart;
            $event.currentTarget.style.display = "none";
            $event.currentTarget.nextElementSibling.style.display = "";
            updateCartNotificationValues();
        }
        rmvItemFuncProp = function ($event, key) {
            console.log("MEGALA=====>rmvItemFuncProp : ", key);
            var cart = $rootScope.cartItems;
            var index = cart.indexOf(key);
            if (index !== -1) {
                cart.splice(index, 1);
                $rootScope.cartItems = cart;
            }
            $event.currentTarget.style.display = "none";
            $event.currentTarget.previousElementSibling.style.display = "";
            updateCartNotificationValues();
        }
        $scope.addItemFuncProp = addItemFuncProp;
        $scope.rmvItemFuncProp = rmvItemFuncProp;
    })
    .controller("cartDetailsController", function ($scope) {
        $scope.data = "CART DATA";
    })