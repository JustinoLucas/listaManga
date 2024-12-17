import "./card.css"

interface CardProps {
    nome: string,
    descricao: string,
    imagem_capa: string,
    capitulos: number
}

export function Card({nome, descricao, imagem_capa, capitulos}: CardProps){
    return (
        <div className="card">
            <img src={imagem_capa} alt="" />
            <h2>{nome}</h2>
            <p>{descricao}</p>
            <p><b>Capitulos:</b>{capitulos}</p>
        </div>
    )
}