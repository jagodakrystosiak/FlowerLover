//zmiana daty

const dateConverter = (date) => {
    let dateObject = new Date(date);
    let dateString = "";
    if (dateObject.valueOf() > 0) { //jeśli data nie wynosi zero..
        let diffrence = Date.now().valueOf() - dateObject.valueOf(); //roznica daty od teraz
        if (diffrence < 0) {
            dateString = "";
        }
        // warunki liczbowe w else if to są sekundy w miesiącu/godzinie/dniu
        else if (diffrence > 86400000) { //roznica miesieczna
            let month = dateObject.getMonth() + 1;
            dateString = dateObject.getDate() + "-" + month + "-" + dateObject.getFullYear();

        }
        else if (diffrence > 3600000) { //roznica w godzinach i minutach
            dateString = Math.floor(diffrence / 3600000) + " godz temu";
        }
        else {
            dateString = Math.floor(diffrence / 60000) + " min temu";
        }
    }

    return dateString;
}

export default dateConverter;