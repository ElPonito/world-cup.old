import './avatar.less'

const Avatar = ({url, style}) => {
    return (
        <div style={{...style, backgroundImage: `url(${url})`}}
             className="avatar">
        </div>
    )
}

export default Avatar