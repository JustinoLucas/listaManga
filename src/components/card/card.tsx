import "./card.css"

import { Link } from "react-router-dom";


interface CardProps {
    id: number,
    nome: string,
    imagem_capa: string,
    capitulos: number
}

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Substitui caracteres não alfanuméricos por '-'
        .replace(/^-+|-+$/g, '');   // Remove '-' no início ou fim
}

export function Card({id, nome, imagem_capa, capitulos }: CardProps) {
    const slug = generateSlug(nome); 
    return (
        <>
            <Link to={`/${slug}`} className="card-link">
                <img src={imagem_capa} />
                <h2>{nome}</h2>
                <p><b>Capitulos:</b>{capitulos}</p>
            </Link>
        </>
    )
}