
/*
function showErrorMessage(target, nbRowMessage, messages){
    if(nbRowMessage > 0 && typeof messages === "object"){
        let bufferErrorMessage = "";
        for(let i = 0; i < nbRowMessage; i++){
            bufferErrorMessage += "<td>"+messages[i]+"</td>";
        }
        target.innerHTML = bufferErrorMessage;
    }
}
*/

function testText(text, pattern, min, max){
    let patternComplet = "/^"+pattern+"{"+min+","+max+"}$/";
    let regexCompiled = new RegExp(patternComplet);
    if(regexCompiled.test(text)){
        return true;
    }
    else{
        return false;
    }
}

function testBirthDate(inputDate, age){
    let today = new Date;
    let minAge = '';
    if ((today.getMonth()+1) > 9){
        minAge = (today.getFullYear()-age) + '-' + (today.getMonth()+1) + '-' + today.getDate() ;
    }
    else{
        minAge = (today.getFullYear()-age) + '-0' + (today.getMonth()+1) + '-' + today.getDate() ;
    }

    if(inputDate == ""){
        return "";
    }
    else if(Date.parse(date) > Date.parse(today)){
        return "La date de naissance ne doit pas dépasser la date du jour"
    }
    else if(Date.parse(date) > Date.parse(minAge)){
        return "Vous devez avoir au moins "+age+" ans";
    }
    else{
        return "";
    }
}

function testMail(mail){
    let regex = new RegExp('/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
    if(regex.test(mail)){
        return true;
    }
    else{
        return false;
    }
}

function testPassword(password){
    let regex = new RegExp('^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%])(?=.*[a-z])[0-9A-Za-z!@#$%]{7,30}$', 'i');
    if(regex.test(password)){
        return true;
    }
    else{
        return false;
    }
}

function verificationFormRegistration(){
    var trueForm = true;
    var form = document.forms["form-registration"];

    var formInputs = {};
    formInputs["name"] = form.elements["name"].value;
    formInputs["firstName"] = form.elements["firstName"].value;
    formInputs["sex"] = form.elements["sex"].value;
    formInputs["birthDate"] = form.elements["birthDate"].value;
    formInputs["mail"] = form.elements["mail"].value;
    formInputs["confirmationMail"] = form.elements["confirmationMail"].value;
    formInputs["password"] = form.elements["password"].value;
    formInputs["confirmationPassword"] = form.elements["confirmationPassword"].value;
    formInputs["address"] = form.elements["address"].value;
    formInputs["postalCode"] = form.elements["postalCode"].value;
    formInputs["city"] = form.elements["city"].value;
    formInputs["phoneNumber"] = form.elements["phoneNumber"].value;
    formInputs["job"] = form.elements["job"].value;

    var errorMessageRegistrationJS = {"submitRegistration" : "", "emptyField" : "", "name" : "", "firstName" : "", "sex" : "",
                                                "birthDate" : "", "mail" : "", "confirmationMail" : "", "password" : "",
                                                "confirmationPassword" : "", "address" : "", "postalCode" : "", "city" : "",
                                                "phoneNumber" : "", "job" : ""     
    };

    if(document.contains(document.getElementById("inputErrors"))){
        document.getElementById("inputErrors").remove();
    }

    console.log(formInputs);
    console.log(formInputs["name"]);

    var nbNotEmptyForm = 0;
    for(let key in formInputs){
        console.log(formInputs[key]);
        if(formInputs[key] != ""){
            nbNotEmptyForm++;
        }
        else{
            errorMessageRegistrationJS["emptyField"] = "Tous les champs doivent être remplis";
            trueForm = false;
        }
    }

    console.log(nbNotEmptyForm);
    console.log(errorMessageRegistrationJS["name"]);

    if(nbNotEmptyForm > 0){
        //let stateName = testText(formInputs["name"], pattern, min, max)
        var accentedCharacters = "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ";
        let regexText = "[a-zA-Z"+accentedCharacters+"' \-]"
        let regexAddress =  "[a-zA-Z"+accentedCharacters+"' \-]|\r\n|\r|\n";


        if(!testText(formInputs["name"], regexText, 1, 32)){
            trueForm = false;
            errorMessageRegistrationJS["name"] = "Vous n'avez pas correctement indiqué votre nom. Les caracteres autorisés sont les lettres.";
        }

        if(!testText(formInputs["firstName"].value, regexText, 1, 32)){
            trueForm = false;
            errorMessageRegistrationJS["firstName"] = "Vous n'avez pas correctement indiqué votre prénom. Les caracteres autorisés sont les lettres.";
        }
        
        if(!(formInputs["sex"] == "Man" || formInputs["sex"] == "Woman" || formInputs["sex"] == "Other")){
            trueForm = false;
            errorMessageRegistrationJS["sex"] = "Vous n'avez pas indiqué votre sexe.";
        }

        let retourTestDate = testBirthDate(birthDate.value, 12);
        if(!(retourTestDate == "")){
            trueForm = false;
            errorMessageRegistrationJS["birthDate"] = retourTestDate;
        }


        if(testMail(formInputs["mail"].value)){
            if(formInputs["mail"] != formInputs["confirmationMail"]){
                trueForm = false;
                errorMessageRegistrationJS["confirmationMail"] = "Les deux adresse email ne correspondent pas.";
            }
        }
        else{
            trueForm = false;
            errorMessageRegistrationJS["mail"] = "Veuillez indiquer une adresse email valide.";
        }

        if(testPassword(formInputs["password"].value)){
            if(formInputs["password"] != formInputs["confirmationPassword"]){
                trueForm = false;
                errorMessageRegistrationJS["confirmationPassword"] = "Les deux mots de passe ne correspondent pas.";
            }
        }
        else{
            trueForm = false;
            errorMessageRegistrationJS["password"] = "Votre mot de passe doit comporter entre 7 et 30 carateres et contenir une majuscule, un chiffre et un symbole parmis : !,@,#,$,%.";
        }

        if(!testText(formInputs["address"].value, regexAddress, 1, 256)){
            trueForm = false;
            errorMessageRegistrationJS["address"] = "Vous n'avez pas correctement indiqué votre adresse. Les caracteres autorisés sont les lettres, les chiffres et les symboles : '\'', ',', '-', '.'.";
        }

        if(isNaN(formInputs["postalCode"]) || formInputs["postalCode"].length != 5){
            trueForm = false;
            errorMessageRegistrationJS["postalCode"] = "Vous n'avez pas correctement indiqué votre code postal. Il doit être composé de 5 chiffres.";
        }

        if(!testText(formInputs["city"].value, regexText, 1, 32)){
            trueForm = false;
            errorMessageRegistrationJS["city"] = "Vous n'avez pas correctement indiqué votre ville. Les caracteres autorisés sont les lettres.";
        }

        if(isNaN(formInputs["phoneNumber"]) || formInputs["phoneNumber"].length != 10 || formInputs["phoneNumber"][0] != "0"){
            trueForm = false;
            errorMessageRegistrationJS["phoneNumber"] = "Vous n'avez pas correctement indiqué votre numéro de téléphone. Il doit commencer par un 0 et constitué de 10 chiffres.";
        }

        if(!testText(formInputs["job"].value, regexText, 1, 32)){
            trueForm = false;
            errorMessageRegistrationJS["job"] = "Vous n'avez pas correctement indiqué votre métier. Les caracteres autorisés sont les lettres et les symboles : '\'', ',', '-', '.'.";
        }

    }

    if(trueForm == true){
        return true;
    }
    else{
        /*
        let nbError = 0;
        for(var index in errorMessageRegistrationJS){
            if(errorMessageRegistrationJS[index] != ""){
                nbError++;
            }
        }
        */
        //if(nbError > 0){
            var mainContent = document.getElementById('main_content');
            let errorElement = document.createElement('div');
            errorElement.id = "inputErrors";
            errorElement.innerHTML = "<ul>";
            for(var index in errorMessageRegistrationJS){
                if(errorMessageRegistrationJS[index] != ""){
                    errorElement.innerHTML += "<li>"+errorMessageRegistrationJS[index]+"</li>";
                }
            }
            errorElement.innerHTML += "</ul>";
            mainContent.prepend(errorElement);
        //}


        return false;
    }

}