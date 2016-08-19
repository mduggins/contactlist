angular.module('ContactList', []);

angular.module('ContactList')
  .controller('contactCtrl', ['contactFact', contactCtrl])

  function contactCtrl(contactFact){
    var clCtrl = this;
    console.log('This is from the controller');

    clCtrl.contact = {}

    clCtrl.create = function(){
      contactFact.create(clCtrl.contact)
      clCtrl.contact = null
    }

    clCtrl.showList = function(){
      contactFact.getContacts().then(function(response){
        clCtrl.contactList = response.data;
      })
    }

  }

angular.module('ContactList')
  .factory('contactFact', ['$http', contactFact])

  function contactFact($http){
    console.log('this is from the factory')
    return {
      create: function(contactData){
        return $http.post('/contact/create', contactData)
      },
      getContacts: function($http){
        return $http.get('/contacts/all')
      }
    }
  }
