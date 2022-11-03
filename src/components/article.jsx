
import { useState, useEffect, useContext} from 'react';
import { Link, useLocation} from "react-router-dom";
import { getArticle, getComments, patchVote, postComment } from '../utils/API';

import {UserIdContext} from '../contexts/userContext'

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
    const [canComment, setCanComment] = useState(1)
    const [addComment, setAddComment] = useState(0)
    const [myComment, setMyComment] = useState('Add a comment...')

    const { USERID, setUSERID } = useContext(UserIdContext);

    const location = useLocation();

    const handleVote = (event) => { 
        setArticle(article => { return { ...article, votes: article.votes + 1 }; })
        setVote(1)
        event.preventDefault()
    }

    const handleComment = () => {viewComments?setViewComments(0):setViewComments(1)}

    const handleAddComment = () => {addComment?setAddComment(0):setAddComment(1)}

    const handlePostComment = () => { 
        postComment(article.article_id, USERID, myComment).then((data) => {
            setComments([data, ...comments])
            handleAddComment()
            setCanComment(0)
        })
        
    }

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
            .then(data => { setComments(data); return data })
            .then(data => {
                data.some(comment => comment.author === USERID) ? setCanComment(0) : setCanComment(1)
            })
        .then(() => { setLoading(0)});
    }, [viewComments,location, USERID])

    return (<>
        <div className='buttonBar'>
            <button className={vote ?
                'center title votes lift' :
                'center border grayBackground title votes lift'}
                onClick={handleVote} disabled={vote} >
                {loading ? 'Loading' : ' 🌟 ' + article.votes}</button>
            {loading ?
                <img className='directionButton border center grayBackground lift' src={loadImg} alt="View Comments" /> :
                <div onClick={handleComment} className='commentButton border center grayBackground lift' src={artImg} alt="View Comments" >
                Comments</div>}
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
                    {addComment ? <div className='addComment addCommentInput'>  
                    <form>   
                            <textarea className="addCommentInput" name="paragraph_text" cols="50" rows="8" onChange={(e) => {setMyComment(e.target.value)}}></textarea>
                            <input type="button" value="Post Comment" aria-label="Submit Comment Button" className="submitButton border grayBackground" onClick={() => { handlePostComment()} }></input>
                            <input type="button" value="Cancel"
                            aria-label="Cancel Comment Button"
                            className="cancelButton border grayBackground" onClick={() => { handleAddComment() }}></input>
                    </form> 
                    </div> : canComment ? <div className='addComment'>
                        <div className='addCommentButton border grayBackground center' onClick={handleAddComment}>Add a comment</div>
                    </div> : <></> }
            {comments.map((comment, i) => {
                return (
                    <div className="commentsCard" key={i}>   
                    <div className='comment'>{comment.body}</div> 
                    <div className="commentsVote">{' 🌟 ' + comment.votes}</div> 
                    </div>
                    )})}
            </div>
            </>
        }
        
    </>
);
}
