import {
    dashboard,
} from '../actionTypes';

const { ON_LOAD_DASHBOARD_INFO, ON_APPROVE_REMARK, ON_DELETE_REMARK } = dashboard;

const initialState = {
    dashboardInfo: []
}

export default function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case ON_LOAD_DASHBOARD_INFO:
            return {
                ...state,
                dashboardInfo: action.payload
            }
        case ON_APPROVE_REMARK: {
            const {articleId, paragraphId, remarkId, text} = action.payload;

            const dashboardInfo = state.dashboardInfo.map(article => article._id !== articleId ? article : ({
                ...article,
                paragraphs: article.paragraphs.map(paragraph => {
                    let children, remarks;
                    if (paragraph._id !== paragraphId) {
                        return paragraph;
                    }
                    if (paragraph.tagName === 'figure') {
                        children = paragraph.children && paragraph.children.map(child => child.tagName !== 'figcation' ? child : ({
                            ...child,
                            text
                        }))
                    }
                    if (remarkId) {
                        remarks = paragraph.remarks && paragraph.remarks.filter(remark => remark._id !== remarkId);
                    }
                    return {
                        ...paragraph,
                        text,
                        children: children ? children : paragraph.children,
                        remarks: remarks ? remarks : paragraph.remarks
                    }
                })
            }));
            return {
                dashboardInfo
            }
        }
        case ON_DELETE_REMARK: {
            const {articleId, paragraphId, remarkId, text} = action.payload;

            const dashboardInfo = state.dashboardInfo.map(article => article._id !== articleId ? article : ({
                ...article,
                paragraphs: article.paragraphs.map(paragraph => {
                    let children, remarks;
                    if (paragraph._id !== paragraphId) {
                        return paragraph;
                    }
                    if (remarkId) {
                        remarks = paragraph.remarks && paragraph.remarks.filter(remark => remark._id !== remarkId);
                    }
                    return {
                        ...paragraph,
                        remarks: remarks ? remarks : paragraph.remarks
                    }
                })
            }));
            return {
                dashboardInfo
            }
        }
        default:
            return state
    }
}