import './App.css'
import './components/card/card.css'
import { Card } from './components/card/card'
import { mangaData } from './interface/mangaData';
import { useMangaData } from './hooks/useMangaData'
import { useState } from 'react';
import { CreateModal } from './components/create-modal/create-modal'

function App() {
  const {data} = useMangaData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }
  
  return (
    <div className='container'>
      <h1>Lista de Mangas</h1>
      <div className='card-grip'>
        {data?.map(mangaData => 
        <Card key={mangaData.id}
        nome={mangaData.nome}
        imagem_capa={mangaData.imagem_capa}
        capitulos={mangaData.capitulos}/>)}
        {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
        <button onClick={handleOpenModal}>novo</button>
      </div>
    </div>
  )
}

export default App
