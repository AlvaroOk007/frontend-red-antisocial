import './Search.css'
import { useState, useEffect } from "react";
import { useGetPublications } from "../../hooks/useGetPublications"
import { useGetUsers } from "../../hooks/useGetUsers";
import { CardFeed } from "../../components/Card_feed/CardFeed";
import { CardAside } from "../../components/Card_Aside/CardAside";
import { cambiarTitulo } from '../../utils/util'
import { useRedirectLogin } from '../../hooks/useRedirect';

export default function Search(){
    useRedirectLogin()
    cambiarTitulo('Buscar')
    const {publications}= useGetPublications();
    const {users} = useGetUsers();
    const [postsSearched, setPostsSearched] = useState([]);
    const [usersSearched, setUsersSearched] = useState([]);
    const [textSearched, setTextSearched] = useState("");
    const handleChange = (event) => {
        const text = event.target.value.toLowerCase()
        setTextSearched(event.target.value);
        if (text === "") { 
            setUsersSearched([]);
            setPostsSearched([]);
            return; 
        }
        const postsFiltered = publications?.filter(p =>
            p.description.toLowerCase().startsWith(text) || 
            p.Tags.some(t => t.name.toLowerCase().startsWith(text)) 
        );
        const usersFiltered = users.filter( u => u.nickName.toLowerCase().startsWith(text));
        setUsersSearched(usersFiltered)
        setPostsSearched(postsFiltered);
        

    }
    useEffect(() => {}, [usersSearched, postsSearched]);
    return(
        <main className="container-main-search">
            <div className="container-input-search">
                <input className="input-search" type="text" placeholder="Buscar..." value={textSearched} onChange={handleChange}/>
            </div>
            <div className="container-user-searched">
                {usersSearched?.length > 0 ? <h2 className='titleSearched'>{usersSearched.length} usuarios encontrados</h2> : ""}
                {usersSearched && usersSearched.map( u => <CardAside user={u} key={u.id} />) }
            </div>
            <div className="container-post-searched">
                {postsSearched?.length > 0 ? <h2 className='titleSearched'>{postsSearched.length} publicaciones encontrados</h2> : ""}
                {postsSearched && postsSearched.map( p => <CardFeed publication={p} key={p.id} updateUsers={setPostsSearched} />) }
            </div>
        </main>
    )
}