
import { useState, useEffect, } from 'react';
import { Link, useLocation} from "react-router-dom";
import { getArticle, getComments, patchVote } from '../utils/API';

import artImg from '../images/article.svg'
import loadImg from '../images/loading.svg'
import '../styles/Articles.css'
import '../styles/Article.css'
import '../styles/Comments.css'

export default function Article() {

    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(1);
    const [vote, setVote] = useState(0);
    const [viewComments, setViewComments] = useState(1);
    const [comments, setComments] = useState([]);
    const location = useLocation();

    const handleVote = (event) => { 
        setArticle(article => { return { ...article, votes: article.votes + 1 }; })
        setVote(1)
        event.preventDefault()
    }

    const handleComment = () => {viewComments? setViewComments(0) : setViewComments(1) }

    useEffect(() => {
        if (vote) {
            patchVote(location.pathname.slice(9))
                .then(data => { setArticle(data);}) 
                .catch(()=>setVote(0))
        }
    }, [vote,location]);

    useEffect(() => {
        setLoading(1)
        getArticle(location.pathname.slice(9))
        .then(data => { setArticle(data); })
        .then(() => { setLoading(0)});
    }, [location]);

    useEffect(() => { 
        setLoading(1)
        getComments(location.pathname.slice(9))
        .then(data => { setComments(data); })
        .then(() => { setLoading(0)});
    }, [viewComments,location])

    return (<>
        <div className='buttonBar'>
            <button className={vote ?
                'center title votes lift' :
                'center border grayBackground title votes lift'}
                onClick={handleVote} disabled={vote} >
                {loading ? 'Loading' : ' 🌟 ' + article.votes}</button>
            {loading?<img className='directionButton border center grayBackground lift' src={loadImg} alt="sort order"/> : <img onClick={handleComment} className='directionButton border center brownBackground lift' src={artImg} alt="sort order"/>}
            <Link to='/'><div className='topicButton border grayBackground flip lift'>Articles</div></Link>
        </div>

        {viewComments ?
            <div className='articles border brownBackground'>
                <h2 className='artTitle'>{article.title}</h2>
                <p className='artBody'>{article.body}</p>
                <h3 className='artAuthor'>{article.author}</h3>
            </div>
            :
            <>
            <div className='articlesSmall brownBackground'>
                <h2 className='artTitle'>{article.title}</h2>
                <p className='artBody'>{article.body}</p>
                <h3 className='artAuthor'>{article.author}</h3>  
            </div>
            <div className='comments  brownBackground'>
            {comments.map((comment, i) => {
                return (
                    <div className="commentsCard" key={i}>
                        <div className="commentsVote">
                            {' 🌟 ' + comment.votes}</div>   
                    <div className='comment'>{comment.body}</div>
                        </div>
                    )})}
            </div>
            </>
        }
        
    </>
);
}
