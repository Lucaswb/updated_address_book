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
    this.addressObject.emailAddress.forEach(function(email) {
      string += "<li>"+ email +"</li>";
    });
    return string+="</ul>";
  } else {
    return false;
  }

}

Contact.prototype.getPhysicalAddress = function() {
  if (this.addressObject.physicalAddress.length>0){
    var string = "<ul>";
    this.addressObject.physicalAddress.forEach(function(physical) {
      string += "<li>"+ physical +"</li>";
    });
    return string+="</ul>";

  } else {
    return false;
  }
}



 // var contact1 = new Contact("Bill", "Clinton", 12345)
 // console.log(contact1);
 //
 // contact1.addEmailAddress("hello@gmail.com")
 // contact1.addEmailAddress("hello2@gmail.com")
 // contact1.addEmailAddress("hello3@gmail.com")
 // contact1.addPhysicalAddress("1600 Pennsylvania Ave")
 // contact1.addPhysicalAddress("1700 Pennsylvania Ave")
 //
 // console.log(contact1.getEmailAddress())
 // console.log(contact1.getPhysicalAddress())


 var addressBook = new AddressBook();

 function attachContactListeners() {
   $("ul#contacts").on("click", "li", function() {
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
   buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>")

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
