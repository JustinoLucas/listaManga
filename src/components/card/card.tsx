import "./card.css"

import { Link } from "react-router-dom";


interface CardProps {
    id: number,
    nome: string,
    imagem_capa: string,
    capitulos: number
}

function generateSlug(name: string, id: number): string {
    const normalizedName = name
        .normalize("NFD") // Decompõe caracteres acentuados
        .replace(/[\u0300-\u036f]/g, ""); // Remove marcas diacríticas (acentos)

    return `${normalizedName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${id}`;
}
export function Card({ id, nome, imagem_capa, capitulos }: CardProps) {
    const slug = generateSlug(nome, id);
    return (
        <>
            <Link to={`/${slug}`} className="card-link">
                <div className="card-principal-img">
                    <img src={imagem_capa} />
                </div>
                <div className="card-principal-desc">
                    <h2>{nome}</h2>
                    <p><b>Capitulos:</b>{capitulos}</p>
                </div>
            </Link>
        </>
    )
}