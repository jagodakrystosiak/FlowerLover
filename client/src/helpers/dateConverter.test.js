import dateConverter from "./dateConverter";

test('propertly convert date', () => {
    const dates = [
        new Date(Date.now()),
        new Date(Date.now() - 1*60000),
        new Date(Date.now() - 5*60000),
        new Date(Date.now() - 45*60000),
        new Date(Date.now() - 1*3600000),
        new Date(Date.now() - 5*3600000),
        new Date(Date.now() - 10*3600000),
        new Date(new Date().setDate(new Date().getDate()-1))
    ];
    const yesterday = new Date(new Date().setDate(new Date().getDate()-1));
    const expect = [
        "0 min temu",
        "1 min temu",
        "5 min temu",
        "45 min temu",
        "1 godzin temu",
        "5 godz temu",
        "10 godz temu",
        `${yesterday.getDate()}-${yesterday.getMonth()+1}-${yesterday.getFullYear()}`
    ]
    for(let i=0; i<dates.lenght; i++){
        let dateString = `${dates[i].getFullYear()}-${dates[i].getMonth()+1}-
        ${dates[i].getDate()}T${dates[i].getHours()}:${dates[i].getMinutes()}`;
        expect(dateConverter(dateString)).toBe(expect[i]);
    }
});
