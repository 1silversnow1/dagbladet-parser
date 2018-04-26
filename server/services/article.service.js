export default class ArticleService {
    constructor($) {
        this.$ = $;
        this.parsed = [];
    }

    static tagHashes = {
        'h1.intro': 'undertitle',
        'h2.headline': 'title',
        'p.standfirst': 'subtitle',
        'p': 'paragraph',
        'figure': 'image block'
    };

    parse(entrySelector) {
        this._createEntryPoint(entrySelector);
        this._parseArticle();

        return this.parsed;
    }

    _createEntryPoint(selector) {
        return this.articleEntryPoint = this.$(selector).eq(0);
    }

    _parseArticle() {
        this.articleEntryPoint.find('h1, h2, h3, h4, p, figure').each((i, elem) => {
            this.parsed.push(this._parseElement(elem));
        });
    }

    _parseElement(elem) {
        let parsedElement = {
            tagName: elem.name,
            classes: ArticleService.getClasses(this.$(elem).attr('class')),
            text: elem.name !== 'figure' ? this.$(elem).text() : null
        };
        let hashKey = this.constructor.getTagHashMatch({
            elem,
            classes: parsedElement.classes
        });

        switch(parsedElement.tagName) {
            case 'h1': {
                hashKey = this.constructor.getTagHashMatch({
                    elem,
                    searchClass: 'intro',
                    classes: parsedElement.classes
                });
                break;
            }
            case 'h2': {
                hashKey = this.constructor.getTagHashMatch({
                    elem,
                    searchClass: 'headline',
                    classes: parsedElement.classes
                });
                break;
            }
            case 'p': {
                if (parsedElement.classes.includes('standfirst')) {
                    hashKey = this.constructor.getTagHashMatch({
                        elem,
                        searchClass: 'standfirst',
                        classes: parsedElement.classes
                    });
                }
                break;
            }
            case 'figure': {
                parsedElement.children = [];
                this.$(elem).find('img, figcaption').each((i, subelem) => {
                    const parsedSubElem = {
                        tagName: subelem.name
                    };
                    if (subelem.name === 'img') {
                        parsedSubElem.src = subelem.attribs.src;
                    }
                    if (subelem.name === 'figcaption') {
                        parsedSubElem.text = this.$(subelem).text();
                    }
                    parsedElement.children.push(parsedSubElem)
                });
                break;
            }
        }

        parsedElement.type = this.constructor.tagHashes[hashKey];
        return parsedElement;
    }

    static getClasses(classesStr = '') {
        return classesStr.split(' ').filter(className => Boolean(className));
    }

    static getTagHashMatch({elem, classes, searchClass}) {
        const withClassSelector = `${elem.name}.${classes.find(className => className === searchClass)}`;
        const withoutClassSelector = `${elem.name}`;

        return Object.keys(this.tagHashes)
            .find(hash => {
                let comparator = Boolean(searchClass)
                    ? withClassSelector
                    : withoutClassSelector;
                return hash === comparator
            });
    }
}