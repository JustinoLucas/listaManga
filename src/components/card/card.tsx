import "./card.css"

interface CardProps {
    nome: string,
    imagem_capa: string,
    capitulos: number
}

export function Card({nome, imagem_capa, capitulos}: CardProps){
    return (
        <div className="card">
            <img src={imagem_capa} alt="" />
            <h2>{nome}</h2>
            <p><b>Capitulos:</b>{capitulos}</p>
        </div>
    )
}