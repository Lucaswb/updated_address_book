function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact){
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function(){
  this.currentId++;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}


AddressBook.prototype.deleteContact = function(id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id==id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

function Address() {
  this.physicalAddress = [],
  this.emailAddress = []

}

Contact.prototype.addEmailAddress = function(address){
  if (address){
    this.addressObject.emailAddress.push(address);
    return true;
  } else {
    return false;
  }
}

Contact.prototype.addPhysicalAddress = function(address){
  if (address){
    this.addressObject.physicalAddress.push(address);
    return true;
  } else {
    return false;
  }
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
  this.addressObject = new Address();
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.getEmailAddress = function() {
  if (this.addressObject.emailAddress.length>0){
    var string = "<ul>";

  for (var i = 0; i < this.addressObject.emailAddress.length; i++) {
    string += "<li id ="+i+">"+ this.addressObject.emailAddress[i] +"</li>";
  }
    return string+="</ul>";

  } else {
    return false;
  }
}

Contact.prototype.getPhysicalAddress = function() {
  if (this.addressObject.physicalAddress.length>0){
    var string = "<ul>";

  for (var i = 0; i < this.addressObject.physicalAddress.length; i++) {
    string += "<li id ="+i+">"+ this.addressObject.physicalAddress[i] +"</li>";
  }
    return string+="</ul>";

  } else {
    return false;
  }
}


 var addressBook = new AddressBook();


 function attachContactListeners() {
   var  currentContact;
   $("ul#contacts").on("click", "li", function() {
     currentContact = this.id;
     showContact(currentContact);
   });

   $("#physical").on("click", "li", function() {
     var currentId = $(this).attr('id');
       var contact = addressBook.findContact(currentContact);
       // alert(currentId);
       var array = contact.addressObject.physicalAddress;
       var answer = prompt("enter yes if you wish to delete this physical address")
       if (answer=="yes"){
         array.splice(currentId,1);

       } else {
         alert("nothing was deleted");
       }
       showContact(currentContact);
   });


   $("#email").on("click", "li", function() {
     var currentId = $(this).attr('id');
       var contact = addressBook.findContact(currentContact);
       var array = contact.addressObject.emailAddress;
       var answer = prompt("enter yes if you wish to delete this email address")
       if (answer=="yes"){
         array.splice(currentId,1);

       } else {
         alert("nothing was deleted");
       }
       showContact(currentContact);
   });

   $("#buttons").on("click", ".updateEmailButton", function() {
    var newEmail = prompt("Please enter updated email address");
    var contact = addressBook.findContact(this.id);
    contact.addEmailAddress(newEmail);

    $("p#email").removeClass("hide");
     showContact(this.id);
   });
   $("#buttons").on("click", ".updatePhysicalAddressButton", function() {
    var newAddress = prompt("Please enter updated physical address address");
    var contact = addressBook.findContact(this.id);
    contact.addPhysicalAddress(newAddress);
     $("p#physical").removeClass("hide");
      showContact(this.id);
   });

   $("#buttons").on("click", ".deleteButton", function() {
     addressBook.deleteContact(this.id);
     $("#show-contact").hide();
     displayContactDetails(addressBook);
   });
 }

 function showContact(contactId){
   var contact = addressBook.findContact(contactId);
   $("#show-contact").show();
   $(".first-name").html(contact.firstName);
   $(".last-name").html(contact.lastName);
   $(".phone-number").html(contact.phoneNumber);
   if (contact.getPhysicalAddress()){
      $("p#physical").removeClass("hide");
      $(".physical-address").html(contact.getPhysicalAddress());
   } else {
     $("p#physical").addClass("hide");
   }

   if(contact.getEmailAddress()){
     $("p#email").removeClass("hide");
     $(".email-address").html(contact.getEmailAddress());
   }  else {
     $("p#email").addClass("hide");
   }

   var buttons = $("#buttons");
   buttons.empty();
   buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>"+"<br>")
   buttons.append("<button class='updateEmailButton' id=" + contact.id + ">Update email address</button>"+"<br>")
   buttons.append("<button class='updatePhysicalAddressButton' id=" + contact.id + ">Update physical address</button>"+"<br>")

 }


 function displayContactDetails(addressBookToDisplay){
   var contactList = $("ul#contacts");
   var htmlForContactInfo = "";
   addressBookToDisplay.contacts.forEach(function(contact) {
     htmlForContactInfo += " <li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
   });
   contactList.html(htmlForContactInfo);
 };

$(function(){
  attachContactListeners();
  //this is for debugging
  var inputtedFirstName = "Sam"
  var inputtedLastName = "Smith"
  var inputtedPhoneNumber = "12345"
  var inputtedEmailAddress = "hello1@gmail.com"
  var inputtedPhysicalAddress = "632 main st."
  var newContact1 = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
  newContact1.addPhysicalAddress(inputtedPhysicalAddress);
  newContact1.addEmailAddress(inputtedEmailAddress);
  addressBook.addContact(newContact1);
  displayContactDetails(addressBook);
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var inputtedPhysicalAddress = $("input#new-physical-address").val();
    if (inputtedFirstName||inputtedLastName){
      var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
      newContact.addPhysicalAddress(inputtedPhysicalAddress);
      newContact.addEmailAddress(inputtedEmailAddress);
      addressBook.addContact(newContact);
      displayContactDetails(addressBook);
      $("form#new-contact")[0].reset();
    } else {
      alert("please enter information");
    }

  })
});
