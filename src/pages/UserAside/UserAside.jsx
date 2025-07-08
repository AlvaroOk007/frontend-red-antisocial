import { useParams } from "react-router-dom";
import { UserBanner } from "../../components/User_banner/UserBanner";
import { useGetUserById } from "../../hooks/useGetUserById";
import { useGetPublications } from "../../hooks/useGetPublications";
import { CardFeed } from "../../components/Card_feed/CardFeed";
import { cambiarTitulo } from '../../utils/util'
import { useRedirectLogin } from '../../hooks/useRedirect';

export function UserAside() {
  useRedirectLogin()
  const { id } = useParams();
  const user = useGetUserById(id);
  cambiarTitulo(user?.nickName)
  const { publications, setPublications } = useGetPublications();

  const isLoading = !publications || !user;

  const publicationsByUser = !isLoading
    ? publications?.filter((p) => p.UserId === user.id)
    : [];

  return (
    <main className="container-main">
      <UserBanner user={user}></UserBanner>
      <div className="container-text">
        <h3 className="text-profile"> Posteos: </h3>
      </div>
      {isLoading ? (
        <p style={{ color: "white", fontWeight: "600" }} className="cargando">
          Cargando perfil...
        </p>
      ) : publicationsByUser.length === 0 ? (
        <p
          style={{ color: "white", fontWeight: "600" }}
          className="sin-posteos"
        >
          No hay posteos realizados.
        </p>
      ) : (
        publicationsByUser?.map((p) => (
          <CardFeed
            publication={p}
            key={p.id}
            updateUsers={setPublications}
            publications={publications}
          />
        ))
      )}
    </main>
  );
}
