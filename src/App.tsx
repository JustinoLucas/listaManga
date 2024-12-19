import './App.css'
import './components/card/card.css'
import { Card } from './components/card/card'
import { useMangaData } from './hooks/useMangaData'
import { useState } from 'react';
import { CreateModal } from './components/create-modal/create-modal'

function App() {
  const { data } = useMangaData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }


  const sortedData = data?.sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <div className="container">
      <h1>Lista de Mangas</h1>
      <div className="card-grip">
        {sortedData?.map((mangaData) => (
          <div key={mangaData.id} className="card-principal">
            <Card
              id={mangaData.id}
              nome={mangaData.nome}
              imagem_capa={mangaData.imagem_capa}
              capitulos={mangaData.capitulos}
            />
          </div>
        ))}
        {isModalOpen && <CreateModal closeModal={handleCloseModal} />}
        <button onClick={handleOpenModal} className='novo-manga-button'>Adicionar Manga</button>
      </div>
    </div>
  );
}

export default App
