
var shoe = {
    "model": "Sacai x Nike LDV Waffle",
    "colour": "Varsity Blue/Del Sol/Varsity Red",
    "code": "BV0073-400",
    "avaliable": "07/03/19",
    "price": "180$"
};

var raffles = {

    "Antonia Milano": {
        "logo": "https://www.soleretriever.com/wp-content/uploads/2018/04/AntoniaMilano.jpg",
        "country": "Italy",
        "purchase": "Online Raffle",
        "collection": "Postage Available",
        "Sizes": "4 to 12 US",
        "Opens": "live",
        "Closes": "06/03 @ 11AM CET",
        "url": "https://www.antonia.it/164-shoes"
    },

    "END": {
        "logo": "https://www.soleretriever.com/wp-content/uploads/2018/04/End.jpg",
        "country": "UK",
        "purchase": "Online Raffle",
        "collection": "Postage Available",
        "Sizes": "5 to 12 UK",
        "Opens": "live",
        "Closes": "07/03 @ 12AM GMT",
        "url": "https://launches.endclothing.com/"
    },

    "Foot Patrol": {
        "logo": "https://www.soleretriever.com/wp-content/uploads/2018/04/FootPatrol.png",
        "country": "France",
        "purchase": "Online Raffle",
        "collection": "Collection Only",
        "Sizes": "36.5 to 47.5 EU",
        "Opens": "live",
        "Closes": "04/02 @ 10AM CET",
        "url": "https://www.footpatrol.com/customer-service/raffle-fr/"
    },

    "Holypop": {
        "logo": "https://www.soleretriever.com/wp-content/uploads/2018/04/HolyPop.png",
        "country": "Italy",
        "purchase": "Online FCFS",
        "collection": "Postage Available",
        "Sizes": "TBC",
        "Opens": "announced",
        "Closes": "07/02 @ 12AM CET",
        "url": "https://www.holypopstore.com/en/footwear"
    },

    "Offspring": {
        "logo": "https://www.soleretriever.com/wp-content/uploads/2018/04/OffSpring.jpg",
        "country": "UK",
        "purchase": "Online Raffle",
        "collection": "Collection Only",
        "Sizes": "3.5 to 7 UK",
        "Opens": "live",
        "Closes": "closed",
        "url": "https://www.offspring.co.uk/release-dates"
    },

    "SNS": {
        "logo": "https://www.soleretriever.com/wp-content/uploads/2018/04/SNS.jpg",
        "country": "Swe, UK, Ger, Fr",
        "purchase": "Online Raffle",
        "collection": "Post and Collect",
        "Sizes": "4 to 13 US",
        "Opens": "live",
        "Closes": "06/03 @ 11AM CET",
        "url": "https://www.sneakersnstuff.com/en/937/sns-raffles"
    },

    "Solebox": {
        "logo": "https://www.soleretriever.com/wp-content/uploads/2018/04/SoleBox.jpg'git",
        "country": "Germany",
        "purchase": "In-Store/Online",
        "collection": "Post and Collect",
        "Sizes": "41 to 46 EU",
        "Opens": "announced",
        "Closes": "When sold out",
        "url": "https://www.solebox.com/en/Footwear/"
    },

};



window.onload = function(){

    var rafflesStatus = {}

    function manageRaffles(raffleTitle){
        if(rafflesStatus[raffleTitle] != undefined){

        } else {
            rafflesStatus[raffleTitle] = {
                title:raffleTitle,
                active: isActive(raffleTitle)
            }
        }
    }

    function isActive(raffleTitle){
        let localStorageRaffle = JSON.parse(localStorage.getItem(raffleTitle));
        if(localStorageRaffle != undefined){
            return localStorageRaffle.active;
        } else {
            return false;
        }
    }

    /*
       Obtenemos el valor del objeto shoe diractamente utilizando las ids que tenemos
     */
    document.getElementById('shoe-container').childNodes.forEach(node => {
        if(node.hasChildNodes()){
            node.childNodes.forEach(childNode => {
                childNode.innerText =  " " + shoe[childNode.id]+ " | ";
            })
        } else {
            node.innerText = shoe[node.id] ;
        }
    });

    var raffleArray = function(){
        var raffleArrayAux = [];
        for(raffle in raffles){
            raffleArrayAux.push(raffles[raffle]);
        }
        return raffleArrayAux;
    }

    /**
     * PINTAMOS LAS RIFAS A PARTIR DE LOS KEYS QUE OBTENEMOS DEL ARCHIVO JSON
     * TAMBIÉN PINTAREMOS LOS ELEMENTOS DE CADA RIFA OBTENIENDO SUS ARGUMENTOS
     * @type {string[]}
     */
    //Todos los títulos de  las rifas que vienen en el objeto
    var rafflesKeys = Object.keys(raffles)

    rafflesKeys.forEach(raffleTitle => {
        manageRaffles(raffleTitle);
        //Obtenemos el objeto raffle;
       let raffle = raffles[raffleTitle];

       var div = document.createElement('div');
        div.id = raffleTitle.replace(' ','-');
        div.classList.add('card');
        div.classList.add('d-flex');
        div.classList.add('p-3')
        div.classList.add('m-3')


        Object.keys(raffle).forEach(raffleKey => {

            if(raffleKey == "logo"){
                let img = document.createElement('img');
                img.src = raffle[raffleKey];
                img.classList.add('card-img-top')
                div.appendChild(img);

                let shop = document.createElement('small');
                let shopName = document.createTextNode(raffleTitle);
                shop.classList.add('font-weight-bold')
                shop.classList.add('text-center')
                shop.append(shopName);
                div.appendChild(shop);


            } else if(raffleKey == "url"){

                let button = document.createElement('a');
                button.href = raffle[raffleKey];
                button.classList.add('btn');

                let status = "";
                if(raffle['Closes'] == "closed"){
                    status = "CLOSED";
                    button.classList.add(raffle['Closes']);
                } else {
                    status = raffle['Opens'] == "live" ? "ENTER RAFFLE" : "ANNOUNCED";
                    button.classList.add(raffle['Opens']);
                }

                let buttonText = document.createTextNode(status);

                button.append(buttonText);
                div.appendChild(button);

            } else {
                let p = document.createElement('p');
                let text = document.createTextNode( raffleKey +" - "+ raffle[raffleKey]);
                p.append(text);
                div.appendChild(p);
            }
        })



        let star_container = document.createElement('div');
        star_container.classList.add('font-weight-bold')
        star_container.classList.add('d-flex')
        star_container.classList.add('p-3')
        star_container.classList.add('align-items-baseline')

        let star = document.createElement('input');
        star.type ="checkbox";
        //Carga el estado del checkbox [activo, desactivo]
        star.checked = rafflesStatus[raffleTitle].active;
        star.classList.add('ml-2');

        let textEntered =  star.checked ? "Entered" : "Mark as entered";

        let star_container_text_p = document.createElement('p');
        let star_container_text = document.createTextNode(textEntered);


        star.classList.add('fa')
        star.classList.add('fa-star')

        star_container_text_p.append(star_container_text)
        star_container.append(star_container_text_p);
        star_container.append(star);
        div.append(star_container);

        document.getElementById('raffles-container').append(div);

    });


    /**
     * EVENTO QUE MODIFICA EL COMPORTAMIENTO DE LOS BOTONES AL HACERLES HOVER;
     *
     */

    var buttonStatus = {
        live:'liveHovered',
        closed:'closedHovered',
        announced:'announcedHovered'
    }

    var activeStatus = "";
    document.querySelectorAll('#raffles-container div a').forEach(buttonAnchor => {
        buttonAnchor.addEventListener('mouseenter',function(button){
            button.srcElement.classList.add('buttonHovered');
            Object.keys(buttonStatus).forEach(status => {
                if(button.srcElement.classList.contains(status)){
                    activeStatus = buttonStatus[status];
                    button.srcElement.classList.add(activeStatus);
                }
            })

        })

        buttonAnchor.addEventListener('mouseout',function(button){
            button.srcElement.classList.remove('buttonHovered');
            button.srcElement.classList.remove(activeStatus);
        })
    })



    /**
     * EVENTO QUE CONTROLA CUANDO CLICAMOS EN MARK AS ENTERED EN UNA DE LAS RIFAS
     */

    document.querySelectorAll('#raffles-container div input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function(entered){
            let shopName = entered.srcElement.parentNode.parentNode.id.replace('-', ' ');
            let storageItem = localStorage.getItem(shopName);
            //Si no existe en el localStorage lo añadimos
            if(storageItem == null){
                rafflesStatus[shopName].active = entered.srcElement.checked;
                localStorage.setItem(shopName, JSON.stringify(rafflesStatus[shopName]))
            } else {
                rafflesStatus[shopName].active = !rafflesStatus[shopName].active;
                localStorage.setItem(shopName, JSON.stringify(rafflesStatus[shopName]))
            }

            let checked = rafflesStatus[shopName].active;

            if(checked){
                entered.srcElement.previousSibling.innerText = "Entered";
                entered.srcElement.style="background:red"
            } else {
                entered.srcElement.previousSibling.innerText = "Mark as entered";
                entered.srcElement.style="background:#fff"
            }

        })
    });


}