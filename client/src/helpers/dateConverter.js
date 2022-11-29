
const dateConverter = (date) => {
    let dateObject = new Date(date);
    let dateString = "";
    if (dateObject.valueOf() > 0) {
        let diffrence = Date.now().valueOf() - dateObject.valueOf();
        if (diffrence < 0) {
            dateString = "";
        }
        else if (diffrence > 86400000) {
            let month = dateObject.getMonth() + 1;
            dateString = dateObject.getDate() + "-" + month + "-" + dateObject.getFullYear();

        }
        else if (diffrence > 3600000) {
            dateString = Math.floor(diffrence / 3600000) + " godzin temu";
        }
        else {
            dateString = Math.floor(diffrence / 60000) + " min temu";
        }
    }

    return dateString;
}

export default dateConverter;