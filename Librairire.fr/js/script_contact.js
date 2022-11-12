function Regler_age() { //initialise la date d'aujourd'hui pour la demande de contact
    let date = new Date();
    let jour = date.getDate();
    let mois = date.getMonth()+1;
    let annee = date.getFullYear();
    
    //Demande de contact
    let mois_prochain = date.getMonth()+2; //mois_prochain=13; //pour tester un potentiel changement d'année pour le calendrier contact
    let today = annee+"-"+mois+"-"+jour;
    document.getElementById("date_de_contact").setAttribute("min", today);
    if (mois_prochain<10) {
        mois_prochain = "0"+mois_prochain;
    }
    else if (mois_prochain>12) {
        mois_prochain = "0"+(mois_prochain-12);
        annee++;
    }
}

function ValideForm() { //verifie les cases de la demande de contact
    var name = document.forms["Myform"]["Nom"];
    var prename = document.forms["Myform"]["Prénom"];
    var sexe = document.forms["Myform"]["Sexe"];
    var email = document.forms["Myform"]["Email"];
    var date_de_contact = document.forms["Myform"]["date_de_contact"];
    var message = document.forms["Myform"]["message"];
    
    //le (name.value.indexOf("<", 0) != -1) permet de bloquer tout texte contenant un balise <script> (car présence du "<") qui pourra compromettre le fonctionnement et la sécurité du site.
    if ((name.value == "") || (name.value.indexOf("<", 0) != -1)) { 
        alert("Mettez votre nom."); 
        name.focus(); 
        return false; 
    }
    if ((prename.value == "") || (prename.value.indexOf("<", 0) != -1)) { 
        alert("Mettez votre prénom."); 
        prename.focus(); 
        return false; 
    }
    if (sexe.value == "") { 
        alert("Saisissez votre sexe."); 
        sexe.focus(); 
        return false; 
    }
    if (date_de_contact.value == "") { 
        alert("Mettez une date de naissance valide."); 
        date_de_contact.focus();
        alert(date_de_contact.value);
        return false; 
    } 
    if ((email.value == "") || (email.value.indexOf("@", 0) < 0) || (email.value.indexOf(".", 0) < 0) || (email.value.indexOf("<", 0) != -1)) { 
        alert("Mettez une adresse email valide."); 
        email.focus(); 
        return false; 
    }
    if ((message.value == "") || (message.value.indexOf("<", 0) != -1)){ 
        alert("Mettez votre message sans mettre de balise ouvrante ou fermante."); 
        message.focus();
        return false; 
    }
    return true; 
}