
const contentFilter = (data, { wordToFind, filterByCategory, sortType }) => {

    let content = data;

    const sortContent = (a, b) => {
        switch (sortType) {
            case 'title':
                if (a.title > b.title) return 1;
                else return -1;
            case 'newest':
                if (a.createDate.valueOf() < b.createDate.valueOf()) return 1;
                else return -1;
            case 'oldest':
                if (a.createDate.valueOf() > b.createDate.valueOf()) return 1;
                else return -1;
            default:
                if (a.createDate.valueOf() < b.createDate.valueOf()) return 1;
                else return -1;
        }
    }

    if (wordToFind !== "") {
        let filteredContent = [];
        let i = 0;
        content.forEach((content) => {
            if (content?.title.toUpperCase().includes(wordToFind.toUpperCase()) || content?.content.toUpperCase().includes(wordToFind.toUpperCase())) {
                filteredContent[i] = content;
                i++;
            }
        });
        content = filteredContent;
    }

    if (filterByCategory !== null) {
        let filteredContent = [];
        let i = 0;
        content.forEach((content) => {
            if (content?.categoriesIds?.includes(filterByCategory.id)) {
                filteredContent[i] = content;
                i++;
            }
        });
        content = filteredContent;
    }

    return content.sort(sortContent);
}

export default contentFilter;