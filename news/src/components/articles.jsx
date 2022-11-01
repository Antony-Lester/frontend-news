import { useState, useEffect} from 'react';
import { getArticles } from '../utils/API';

import dirImg from '../images/direction.svg'
import loadImg from '../images/loading.svg'
import '../styles/Articles.css'

export default function Articles({ setCurrentPage }) {
    const [articles, setArticles] = useState([]);
    const [sort, setSort] = useState('created_at');
    const [direction, setDirection] = useState('asc');
    const [loading, setLoading] = useState(1);
    setCurrentPage('articles')

    const toggleDirection = () => { direction === 'asc' ? setDirection('dsc') : setDirection('asc') }
    
    useEffect(() => {
        setLoading(1)
        getArticles(sort, direction)
            .then(data => { setArticles(data); })
            .then(() => { setLoading(0) });
    }, [sort, direction]);

    return (<>
        <div className='buttonBar'>
            <select className='sortInput border center grayBackground lift' onChange={
                (event) => { setLoading(1); setSort(event.target.value)}
                } >
                <option value='created_at'>Date</option>
                <option value='votes'>Vote's</option>
            </select>
            {loading?<img className='directionButton border center grayBackground lift' src={loadImg} alt="sort order" onClick={() => { setLoading(1); toggleDirection() }} /> : <img className='directionButton border center grayBackground lift' src={dirImg} alt="sort order" onClick={() => { setLoading(1); toggleDirection() }} />}
            
            <div className='topicButton border grayBackground flip lift'>Topics</div>
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
