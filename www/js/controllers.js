/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['angularMoment'])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('NewsCtrl', function($scope, $http, $state, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
  $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();


    //
          $scope.showLoader = true;
            $http.get('http://supercar.ng/blogapiphp/info.json').then(function(response){
          $scope.showLoader = false;
        
        $scope.info = response.data.info.reverse();
        console.log(response.data.info[0].post_title);
        // $scope.info = { showDelete: false,showReorder: false };
        // console.log(response.data.title);
        $scope.whichinfo = $state.params.aId;
    

     //    $scope.doRefresh = function(){
     //    $http.get('http://supercar.ng/blog/wp-json/posts').then(function(response){
     //      // console/log(response);
     //    $scope.data = response.data;
     //    $scope.$broadcast('scroll.refreshComplete');
     //  });
     // }


    });

    


     
})

.controller('HomeCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();


    $scope.share = function(t, msg, img, link){
        if (t == 'w')
            window.plugins.socialsharing
            .shareViaWhatsApp(msg, img, link);
        else if (t == 'f')
            window.plugins.socialsharing
            .shareViaFacebook(msg, img, link);
        else if (t == 't')
            window.plugins.socialsharing
            .shareViaTwiter(msg, img, link);
        else {
            var sub = 'Beautiful';
            window.plugins.socialsharing
            .shareViaEmail(msg, sub, '');
        }
    }
})

.controller('CarsCtrl', function($scope, $http, $state, $stateParams, $timeout, $ionicSlideBoxDelegate, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();


    //

        $scope.showLoader = true;
            $http.get('http://supercar.ng/mobileapiphp/info.json').then(function(response){
        $scope.showLoader = false;
        //  $(window).load(function() {
        //      $('.loading').fadeOut(slow);
        // });


      // console.log(response.data);
        $scope.info = response.data.info.reverse();
      
        // $scope.info = { showDelete: false,showReorder: false };
        
        $scope.whichinfo = $state.params.aId;
          // $scope.loader = true;
        
         $scope.toggleStar = function(item){
           item.star = !item.star;
       }


        // slider function for ion-slide-box
        $scope.navSlide = function(index) {
            $ionicSlideBoxDelegate.slide(index, 500);
        }

        // ********************************
        // $scope.onItemShare = function(item){

        //     Socialshare.share({

        //             'provider': 'facebook',
        //             'attrs': {
        //             'socialshareUrl': 'http://720kb.net'

        //       }
        //     });

        // }

        });



})


// for html filter
    .filter('trusted', ['$sce', function($sce) {
        var div = document.createElement('div');
        return function(text) {
            div.innerHTML = text;
            return $sce.trustAsHtml(div.textContent);
        };
    }])
//

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

});
