import "./card.css"
import { Link } from "react-router-dom";


interface CardProps {
    id: number,
    nome: string,
    imagem_capa: string,
    capitulos: number
}

export function Card({id, nome, imagem_capa, capitulos }: CardProps) {
    return (
        <>
            <Link to={`/manga/${id}`} className="card-link">
                <img src={imagem_capa} />
                <h2>{nome}</h2>
                <p><b>Capitulos:</b>{capitulos}</p>
            </Link>
        </>
    )
}