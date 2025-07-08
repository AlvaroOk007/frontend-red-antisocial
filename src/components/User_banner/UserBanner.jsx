import "./UserBanner.css";
import { getRandomInt } from "../../utils/images";
import { UserRoundCheck, UserRoundPlus} from 'lucide-react'

export function UserBanner({ user }) {
  if (!user) {
    return (
      <div className="cargando">
        <h1>Cargando...</h1>
      </div>
    );
  }

  const usuario = user;
  usuario.followers = getRandomInt(1100, 5000);
  usuario.following = getRandomInt(1000, 2000);
  
  return (
    <div className="container-banner_profile">
      <div className="container-img_profile">
        <div className="img">
          <img
            src="https://s3.ppllstatics.com/lasprovincias/www/pre2017/multimedia/RC/201501/12/media/cortadas/avatar--235x235.jpg"
            alt=""
          />
        </div>
        <div className="banner-nickName">
          <h1>{user.nickName}</h1>
        </div>
      </div>
      <div className="container-follow">
        <div className="container-follow-item">
          <UserRoundCheck />
          
          <h1>
            Seguidores: <span>{usuario.followers}</span>
          </h1>
        </div>
        <div className="container-follow-item">
          <UserRoundPlus />
          <h1>
            Siguiendo: <span>{usuario.following}</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
