import contentFilter from "./contentFilter";

describe('propertly filter content', () => {

    const content = [
        {
            title: "Abaa",
            content: "Ala ma kota",
            createDate: "2022-02-22T12:00:00",
            categoriesIds: [1,2]
        },
        {
            title: "Aaa",
            content: "Kot ma Ale",
            createDate: "2022-02-02T12:00:00",
            categoriesIds: [1]
        },
        {
            title: "Baaa",
            content: "Kot ma ale",
            createDate: "2022-02-20T12:00:00",
            categoriesIds: [2]
        }
    ];
    
    it('no options are given', ()=>{
        let filterOption = { wordToFind: "", filterByCategory: null, sortType: "" };
        expect(contentFilter(content, filterOption)).toStrictEqual([
            {
                title: "Abaa",
                content: "Ala ma kota",
                createDate: "2022-02-22T12:00:00",
                categoriesIds: [1,2]
            },
            {
                title: "Baaa",
                content: "Kot ma ale",
                createDate: "2022-02-20T12:00:00",
                categoriesIds: [2]
            },
            {
                title: "Aaa",
                content: "Kot ma Ale",
                createDate: "2022-02-02T12:00:00",
                categoriesIds: [1]
            }
        ])
    });

    it('propertly find word and sort by title', ()=>{
        let filterOption = { wordToFind: "Kot", filterByCategory: null,  sortType: "title" };
        expect(contentFilter(content, filterOption)).toStrictEqual([
            {
                title: "Aaa",
                content: "Kot ma Ale",
                createDate: "2022-02-02T12:00:00",
                categoriesIds: [1]
            },
            {
                title: "Abaa",
                content: "Ala ma kota",
                createDate: "2022-02-22T12:00:00",
                categoriesIds: [1,2]
            },
            {
                title: "Baaa",
                content: "Kot ma ale",
                createDate: "2022-02-20T12:00:00",
                categoriesIds: [2]
            }
        ])
    });

    it('propertly find word and sort by date', ()=>{
        let filterOption =  { wordToFind: "kot", filterByCategory: null, sortType: "oldest" };
        expect(contentFilter(content, filterOption)).toStrictEqual([
            {
                title: "Aaa",
                content: "Kot ma Ale",
                createDate: "2022-02-02T12:00:00",
                categoriesIds: [1]
            },
            {
                title: "Baaa",
                content: "Kot ma ale",
                createDate: "2022-02-20T12:00:00",
                categoriesIds: [2]
            },
            {
                title: "Abaa",
                content: "Ala ma kota",
                createDate: "2022-02-22T12:00:00",
                categoriesIds: [1,2]
            }
        ])
    });

    it('propertly filter by category and sort by title', ()=>{
        let filterOption = { wordToFind: "", filterByCategory: {id: 1, name: "Kategoria"}, sortType: "title" };
        expect(contentFilter(content, filterOption)).toStrictEqual([
            {
                title: "Aaa",
                content: "Kot ma Ale",
                createDate: "2022-02-02T12:00:00",
                categoriesIds: [1]
            },
            {
                title: "Abaa",
                content: "Ala ma kota",
                createDate: "2022-02-22T12:00:00",
                categoriesIds: [1,2]
            }
        ])
    });
});