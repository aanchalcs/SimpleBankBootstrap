var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {

  var cleanAccount = function() {
    var account = {
      name: 'Lauren Holmes',
      startingBalace: 100.00,
      runningBalance: 73.34
    }
    return account;
  };
  
   var cleanTransaction = function() {
    var transaction = {
      type: 'debit',
      amount: 0.00,
      description: ''
    }

    return transaction;
  };

  var transactions = [{
    amount: 100.00,
    description: 'Deposit',
    type: 'credit'
  }, {
    amount: 80.00,
    description: 'Grocery',
    type: 'debit'
  }, {
    amount: 225.26,
    description: 'electronics',
    type: 'debit'
  }, {
    amount: 100.00,
    description: 'Deposit',
    type: 'credit'
  }, {
    amount: 135.15,
    description: 'Sea World Membership',
    type: 'debit'
  }, {
    amount: 160.25,
    description: 'San Diego Zoo Membership',
    type: 'debit'
  }, ];

 

  $scope.transaction = cleanTransaction();
  $scope.account = cleanAccount();

  $scope.transactionList = transactions;

  $scope.saveTransaction = function() {
    var amount = parseFloat($scope.transaction.amount);
    var num = parseFloat($scope.account.runningBalance);
    var answer = 0;
    if ($scope.transaction.type === 'credit') {
      answer = num + amount
    } else {
      answer = num - amount
    }
    $scope.account.runningBalance = answer;

    $scope.transaction.amount = amount;
    transactions.push($scope.transaction);
    $scope.transaction = cleanTransaction();
  };

});


app.directive('moneywarn', function() {
  var staticWarningLevel = .2;

  return {
    restrict: 'A',
    scope: {
      val: '=moneywarn'
    },
    link: function(scope, element, attrs) {
      scope.$watch('val', function(newValue) {
        var startBalance = parseInt(attrs.startbalance);
        var warningLevel = startBalance * staticWarningLevel;
        if (newValue === warningLevel) {
          element.addClass('alert-warning');
           element.removeClass('alert-danger');
        } else if (newValue < warningLevel) {
          element.addClass('alert-danger');
        } else {
          element.removeClass('alert-warning');
          element.removeClass('alert-danger');
        }

      }, true);
    }
  }

});