import { useParams } from "react-router-dom";
import { useMangaData } from "../../hooks/useMangaData"; // Hook para buscar os dados
import './card-details.css';

export default function CardDetails() {
    
    const { slug } = useParams<{ slug: string }>(); // Obtém o slug da URL
    const { data } = useMangaData();

    const manga = data?.find((item) => generateSlug(item.nome, item.id) === slug); // Busca pelo slug

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

function generateSlug(name: string, id: number): string {
    const normalizedName = name
        .normalize("NFD") // Decompõe caracteres acentuados
        .replace(/[\u0300-\u036f]/g, ""); // Remove marcas diacríticas (acentos)

    return `${normalizedName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${id}`;
}