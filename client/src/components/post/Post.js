import './post.css'
import { DeleteOutline, ThumbUp } from "@material-ui/icons"
export default function Post() {
    return (
        <div className="post">
            <div className="post-wrapper">
                <div className="post__top">
                    <div className="post__top-left">
                        <img className="post-profile-picture" src='/assets/profile/pic1.jpeg' alt='' />
                        <span className="post-username">Dima Krepak</span>
                        <span className="post-date">10 min ago</span>
                    </div>
                    <div className="post__top-right">
                        <DeleteOutline className="post-icon" />
                    </div>
                </div>
                <div className="post__center">
                    <span className="post-text">Hellllo First!!asd nasd asdsa  sad</span>
                    <img className="post-image" src="assets/post.jpg" alt="" />
                </div>
                <div className="post__bottom">
                    <div className="post__bottom-left">
                        <ThumbUp style={{ fill: '#068bff' }} className="post-icon" />
                        <span className="post-like-counter">102 likes</span>
                    </div>
                    <div className="post__bottom-right">
                        <span className="post-comment-text"> 32 Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}