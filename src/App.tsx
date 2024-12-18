import './App.css'
import './components/card/card.css'
import { Card } from './components/card/card'
import { mangaData } from './interface/mangaData';
import { useMangaData } from './hooks/useMangaData'
import { useState } from 'react';
import { CreateModal } from './components/create-modal/create-modal'
import { UpdateModal } from './components/update-modal/update-modal';

function App() {
  const { data } = useMangaData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedManga, setSelectedManga] = useState<mangaData | null>(null);

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
            <button onClick={() => handleOpenUpdateModal(mangaData)} className='atualizar-manga-button'>
              Atualizar
            </button>
          </div>
        ))}
        {isModalOpen && <CreateModal closeModal={handleCloseModal} />}
        {isUpdateModalOpen && selectedManga && (<UpdateModal closeModal={handleCloseUpdateModal} manga={selectedManga} />)}
        <button onClick={handleOpenModal} className='novo-manga-button'>Adicionar Manga</button>
      </div>
    </div>
  );
}

export default App
