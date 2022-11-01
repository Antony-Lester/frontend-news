
import { useState, useEffect, } from 'react';
import { Link, useLocation} from "react-router-dom";
import { getArticle, patchVote } from '../utils/API';

import artImg from '../images/article.svg'
import loadImg from '../images/loading.svg'
import '../styles/Articles.css'
import '../styles/Article.css'

export default function Article() {

    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(1);
    const [processVote, setProcessVote] = useState(0);
    const location = useLocation();

    const handleVote = (event) => { 
        setArticle(article => { return { ...article, votes: article.votes + 1 }; })
        setProcessVote(1)
        event.preventDefault()
    }

    useEffect(() => {
        if (processVote) {
            patchVote(location.pathname.slice(9))
                .then(data => { setArticle(data);}) 
                .catch(()=>setProcessVote(0))
        }
    }, [processVote]);

    useEffect(() => {
        getArticle(location.pathname.slice(9))
        .then(data => { setArticle(data); })
        .then(() => { setLoading(0)});
    }, [location]);

    useEffect(() => {
        setLoading(1)
        getArticle(location.pathname.slice(9))
        .then(data => { setArticle(data); })
        .then(() => { setLoading(0)});
    }, [location]);

    return (<>
        <div className='buttonBar'>
            <button className={processVote ? 'center title votes lift' : 'center border grayBackground title votes lift'} onClick={handleVote} disabled={processVote}>
                {loading ? 'Loading' : ' 🌟 ' + article.votes}</button>
            {loading?<img className='directionButton border center grayBackground lift' src={loadImg} alt="sort order"/> : <img className='directionButton border center brownBackground lift' src={artImg} alt="sort order"/>}
            <Link to ='/'><div className='topicButton border grayBackground flip lift'>Articles</div></Link>
        </div>
        <div className='articles border brownBackground'>
            <h2 className='artTitle'>{article.title}</h2>
            <p className='artBody'>{article.body}</p>
            <h3 className='artAuthor'>{article.author}</h3>
        </div>
    </>
);
}
