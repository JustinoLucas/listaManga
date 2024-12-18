import './App.css'
import './components/card/card.css'
import { Card } from './components/card/card'
import { mangaData } from './interface/mangaData';
import { useMangaData } from './hooks/useMangaData'
import { useState } from 'react';
import { CreateModal } from './components/create-modal/create-modal'
import { UpdateModal } from './components/update-modal/update-modal';
import { DeleteModal } from './components/delete-modal/delete-modal';
import { useMangaDataDelete } from './hooks/useMangaDataExclude';

function App() {
  const { data } = useMangaData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedManga, setSelectedManga] = useState<mangaData | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMangaId, setSelectedMangaId] = useState<number | null>(null);
  const { mutate: deleteManga } = useMangaDataDelete();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleOpenUpdateModal = (manga: mangaData) => {
    setSelectedManga(manga);
    setIsUpdateModalOpen(true);
  }

  const handleCloseUpdateModal = () => {
    setSelectedManga(null);
    setIsUpdateModalOpen(false);
  }

  const handleOpenDeleteModal = (id: number) => {
    setSelectedMangaId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedMangaId(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedMangaId !== null) {
      deleteManga(selectedMangaId);
    }
    handleCloseDeleteModal();
  };

  const sortedData = data?.sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <div className="container">
      <h1>Lista de Mangas</h1>
      <div className="card-grip">
        {sortedData?.map((mangaData) => (
          <div key={mangaData.id} className="card-principal">
            <Card
              nome={mangaData.nome}
              imagem_capa={mangaData.imagem_capa}
              capitulos={mangaData.capitulos}
            />
            <div className="botoes-card">
              <button onClick={() => handleOpenUpdateModal(mangaData)} className='atualizar-manga-button'>
                Atualizar
              </button>
              <button onClick={() => handleOpenDeleteModal(mangaData.id)} className="delete-manga-button">
                Excluir
              </button>
            </div>
          </div>
        ))}
        {isModalOpen && <CreateModal closeModal={handleCloseModal} />}
        {isUpdateModalOpen && selectedManga && (<UpdateModal closeModal={handleCloseUpdateModal} manga={selectedManga} />)}
        {isDeleteModalOpen && (<DeleteModal closeModal={handleCloseDeleteModal} confirmDelete={handleConfirmDelete}/>)}
        <button onClick={handleOpenModal} className='novo-manga-button'>Adicionar Manga</button>
      </div>
    </div>
  );
}

export default App
