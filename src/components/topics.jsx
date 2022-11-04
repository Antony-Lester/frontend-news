import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getTopics } from '../utils/API';

import '../styles/Articles.css'

export default function Articles() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(1);

    useEffect(() => {
        setLoading(1)
        getTopics()
            .then(data => { setTopics(data); })
            .then(() => { setLoading(0)});
    }, []);

    return (<>
        <header>
            <h1 className='titleFont titleText bgb'>{loading? 'Loading':'Topics'}</h1>
            <Link to='/'>
                <nav className='titleFont titleText border lift grayBackground'>Articles</nav>
            </Link>
        </header>
        <div className='articles border grayBackground'>
            {topics.map((topic, i) => {
                return (<div className="articleSummery border flip" key={topic.slug}>
                    <Link to={`/topic/${topic.slug}`} className='link'><div className='articleTitle'>{topic.slug}</div></Link>
                </div>)
            })}
        </div>    
    </>
);
}
