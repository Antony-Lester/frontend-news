import { useState, useEffect, } from 'react';
import { Link, useLocation} from "react-router-dom";
import { getArticles } from '../utils/API';

import '../styles/Articles.css'

export default function Articles() {

    const [articles, setArticles] = useState([]);
    const [sort, setSort] = useState('created_at');
    const [direction, setDirection] = useState('asc');
    const [loading, setLoading] = useState(1);
    const location = useLocation();

    const toggleDirection = () => { direction === 'asc' ? setDirection('dsc') : setDirection('asc') }
    
    useEffect(() => {
        setLoading(1)
        if (location.pathname.slice(1, 6) === 'topic')
        {
            getArticles(sort, direction, location.pathname.slice(7))
                .then(data => { setArticles(data)})
                .then(() => {setLoading(0)});
        }
        else
        {
            getArticles(sort, direction)
                .then(data => { setArticles(data)})
                .then(() => {setLoading(0)});
        }
        
    }, [sort, direction, location]);



    return (<>
        <header>
            <div className='header2 border grayBackground lift' alt="sort order" onClick={() => { setLoading(1); toggleDirection() }}>
                {loading? 'Loading' : 'Sort'}
            </div>
            <select className=' header1 border grayBackground lift titleFont' onChange={
                (event) => { setLoading(1); setSort(event.target.value)}
                }>
                <option value='created_at'>Date</option>
                <option value='votes'>Votes</option>
                <option value='comment_count'>Comments</option>
            </select>
            <h1 className='titleFont titleText bgb'>Articles {direction === 'asc' ? 'Ascending' : 'Descending'} by {sort === 'created_at' ? 'Date' : sort === 'votes' ? 'Votes' : 'Comments' }</h1>
            <Link to='/topics'>
                <nav className='titleFont titleText border lift grayBackground'>Topics</nav>
            </Link>
        </header>


        <div className='articles border grayBackground'>
            {articles.map((article, i) => {
                return (
                    <div className="articleSummery border flip" key={i}>
                    <Link to={`/article/${article.article_id}`} className='link'><div className='articleTitle'>{article.title}</div></Link>
                    </div>
                )
            })}
        </div>    
    </>
);
}
