import '../styles/CommentCard.css'

export default function CommentCard(props) { 
    return <div className="commentsCard subText bg bgb bgbsi subFont">   
            <div className='comment'>{props.body}<br/>{'🌟'.repeat(props.votes> 0? props.votes : 0)}</div> 
        </div>      
}