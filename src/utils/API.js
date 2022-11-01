import axios from 'axios'

const url = axios.create({ baseURL: 'https://antony-lester-news-articles.herokuapp.com/api/' })

export const getArticles = (sort_by = 'created_at', order = 'asc', topic) => {
    return url.get(`articles`, { params: { sort_by, order, topic } })
        .then((res) => { return res.data })
        .catch((err) => { return [{ title:err }]})
}

export const getTopics = () => {
    return url.get(`topics`)
        .then((res) => {return res.data })
        .catch((err) => { return [{ slug:err }]})
}

export const getArticle = (article_id) => {
    return url.get(`articles/${article_id}`)
        .then((res) => {return res.data })
        .catch((err) => { return [{ title:err }]})
}

export const patchVote = (article_id, voteDirection) => { 
    return url.patch(`articles/${article_id}`, !voteDirection? {"inc_votes": "+1"} : {"inc_votes": "-1"})
        .then((res) => {return res.data })
}
