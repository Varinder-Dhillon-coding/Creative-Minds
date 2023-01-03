

export default function Thought({children,username,avatar,description}){
    return(
        <div className="post-wrap">
            <div className="user-info-post">
                <img src={avatar} alt="" />
                <h2>{username}</h2>
            </div>
            <div className="post-description">
                <p>{description}</p>
            </div>
            {children}
        </div>
    );
}