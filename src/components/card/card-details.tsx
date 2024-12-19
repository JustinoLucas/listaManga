import './card-details.css';
import { useNavigate, useParams } from "react-router-dom";
import { useMangaData } from "../../hooks/useMangaData"; // Hook para buscar os dados
import { useMangaDataDelete } from '../../hooks/useMangaDataExclude';
import { useState } from 'react';
import { UpdateModal } from '../update-modal/update-modal';
import { DeleteModal } from '../delete-modal/delete-modal';

export default function CardDetails() {

    const { slug } = useParams<{ slug: string }>(); // Obtém o slug da URL
    const { data } = useMangaData();
    const { mutate: deleteManga } = useMangaDataDelete();

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const manga = data?.find((item) => generateSlug(item.nome, item.id) === slug); // Busca pelo slug

    const voltarPage = useNavigate();

    if (!manga) {
        return <p>Produto não encontrado.</p>;
    }

    const handleOpenUpdateModal = () => {
        console.log("Abrindo modal de atualização");
        setIsUpdateModalOpen(true);
    }

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
    }

    const handleOpenDeleteModal = () => {
        console.log("Abrindo modal de delete");
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = () => {
        if (manga.id !== null) {
            deleteManga(manga.id);
        }
        handleCloseDeleteModal();
    };

    const handleGoBack = () => {
        voltarPage("/"); // Navega para a página principal
    };

    return (
        <>
            <div className="all-page-card" style={{
                "--background-image": `url(${manga.imagem_capa})`,
            } as React.CSSProperties}>
                <div className="page-card" style={{
                    "--background-image": `url(${manga.imagem_capa})`,
                } as React.CSSProperties}>
                    <div className="page-content">
                        <h1>{manga.nome}</h1>
                        <div className="page-container-card">
                            <div className="page-img-card">
                                <img src={manga.imagem_capa} alt={`Capa de ${manga.nome}`} />
                            </div>
                            <div className="page-desc-card">
                                <p><b>Capítulos:</b> {manga.capitulos}</p>
                                <h3>Descrição</h3>
                                <p>{manga.descricao}</p>
                                <div className='botoes-card'>
                                    <button onClick={() => handleOpenUpdateModal()} className='atualizar-manga-button'>
                                        Atualizar
                                    </button>
                                    <button onClick={() => handleOpenDeleteModal()} className="delete-manga-button">
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => handleGoBack()} className='botao-voltar'>Voltar</button>
                </div>
            </div>
            {isUpdateModalOpen && (<UpdateModal closeModal={handleCloseUpdateModal} manga={manga} />)}
            {isDeleteModalOpen && (<DeleteModal closeModal={handleCloseDeleteModal} confirmDelete={handleConfirmDelete} mangaName={manga.nome} />)}
        </>
    );
}

function generateSlug(name: string, id: number): string {
    const normalizedName = name
        .normalize("NFD") // Decompõe caracteres acentuados
        .replace(/[\u0300-\u036f]/g, ""); // Remove marcas diacríticas (acentos)

    return `${normalizedName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${id}`;
}