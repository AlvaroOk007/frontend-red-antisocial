import React, { useContext } from "react";
import { CardFeed } from "../../components/Card_feed/CardFeed";
import { useGetPublications } from "../../hooks/useGetPublications";
import "./UserProfile.css";
import { UserBanner } from "../../components/User_banner/UserBanner";
import { useRedirectLogin } from "../../hooks/useRedirect";
import { AuthContext } from "../../context/AuthContext";
import { cambiarTitulo } from "../../utils/util";

function Profile() {
  cambiarTitulo("Mi Perfil");
  useRedirectLogin();
  const { publications, setPublications } = useGetPublications();
  const { usuario, loading } = useContext(AuthContext);

  const isLoading = !publications || !usuario || loading;

  const publicationsByUser = !isLoading
    ? publications.filter((p) => p.UserId === usuario.id)
    : [];

  return (
    <main className="container-main">
      <UserBanner user={usuario} />
      <div className="container-text">
        <h3 className="text-profile"> Mis posteos: </h3>
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
        publicationsByUser.map((p) => (
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

export default Profile;
