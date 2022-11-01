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
