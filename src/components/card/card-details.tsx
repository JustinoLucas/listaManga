import { useParams } from "react-router-dom";
import { useMangaData } from "../../hooks/useMangaData"; // Hook para buscar os dados
import './card-details.css';

export default function CardDetails() {
    const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
    const { data } = useMangaData(); // Obtém os dados do hook

    const manga = data?.find((item) => item.id === Number(id)); // Encontra o card pelo ID

    if (!manga) {
        return <p>Produto não encontrado.</p>;
    }

    return (
        <div className="card-details">
            <img src={manga.imagem_capa} alt={`Capa de ${manga.nome}`} />
            <h1>{manga.nome}</h1>
            <p>{manga.descricao}</p>
            <p><b>Capítulos:</b> {manga.capitulos}</p>
        </div>
    );
}
