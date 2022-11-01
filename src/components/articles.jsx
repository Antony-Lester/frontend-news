import { useState, useEffect, } from 'react';
import { Link, useLocation} from "react-router-dom";
import { getArticles } from '../utils/API';

import dirImg from '../images/direction.svg'
import loadImg from '../images/loading.svg'
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
                .then(data => { setArticles(data); })
                .then(() => { setLoading(0)});
        }
        else
        {
            getArticles(sort, direction)
                .then(data => { setArticles(data); })
                .then(() => { setLoading(0)});
        }
        
    }, [sort, direction, location]);

    return (<>
        <div className='buttonBar'>
        <div className=' center title' >Articles</div>
            <select className='sortInput border center grayBackground lift' onChange={
                (event) => { setLoading(1); setSort(event.target.value)}
                } >
                <option value='created_at'>Date</option>
                <option value='votes'>Vote's</option>
            </select>
            {loading?<img className='directionButton border center grayBackground lift' src={loadImg} alt="sort order" onClick={() => { setLoading(1); toggleDirection() }} /> : <img className='directionButton border center grayBackground lift' src={dirImg} alt="sort order" onClick={() => { setLoading(1); toggleDirection() }} />}
            <Link to='/topics'><div className='topicButton border grayBackground flip lift'>Topics</div></Link>
        </div>
        <div className='articles border grayBackground'>
            {articles.map((article, i) => {
                return (<div className="articleSummery border flip" key={i}>
                    <div className='articleTitle'>{article.title}</div>
                </div>)
            })}
        </div>    
    </>
);
}
