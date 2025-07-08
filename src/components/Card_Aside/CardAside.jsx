import "./CardAside.css";
import { Link } from "react-router-dom";
export function CardAside(props) {
  return (
    <article className="container-aside-article">
      <div className="card-aside-left">
        <div className="card-aside_header">
          <img
            src="https://s3.ppllstatics.com/lasprovincias/www/pre2017/multimedia/RC/201501/12/media/cortadas/avatar--235x235.jpg"
            alt=""
          />
        </div>
        <div className="card-aside-rigth">
          <h2 className="card-nick">{props.user.nickName}</h2>
          <p className="card-email">@{props.user.nickName}</p>
        </div>
      </div>
      <Link to={`/user/${props.user.id}`}>
        <button className="card-aside-button">Ver Perfil</button>
      </Link>
    </article>
  );
}
