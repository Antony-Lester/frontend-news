
import { useState, useEffect, } from 'react';
import { Link, useLocation} from "react-router-dom";
import { getArticle } from '../utils/API';

import artImg from '../images/article.svg'
import loadImg from '../images/loading.svg'
import '../styles/Articles.css'
import '../styles/Article.css'

export default function Article() {

    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(1);
    const location = useLocation();

    useEffect(() => {
        setLoading(1)
        getArticle(location.pathname.slice(9))
        .then(data => { setArticle(data); })
        .then(() => { setLoading(0)});
    }, [location]);

    return (<>
        <div className='buttonBar'>
            <div className='votes center title' >{loading ? 'Loading' : ' 🌟 ' + article.votes}</div>

            {loading?<img className='directionButton border center grayBackground lift' src={loadImg} alt="sort order" onClick={() => { setLoading(1)}} /> : <img className='directionButton border center brownBackground lift' src={artImg} alt="sort order" onClick={() => { setLoading(1)}} />}
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
