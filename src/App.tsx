import './App.css'
import { Card } from './components/card/card'
import { mangaData } from './interface/mangaData';
import { useMangaData } from './hooks/useMangaData'

function App() {
  const {data} = useMangaData();
  
  return (
    <div className='container'>
      <h1>Lista de Mangas</h1>
      <div className='card-grip'>
        {data?.map(mangaData => 
        <Card key={mangaData.id}
        nome={mangaData.nome}
        descricao={mangaData.descricao}
        imagem_capa={mangaData.imagem_capa}
        capitulos={mangaData.capitulos}/>)}
      </div>
    </div>
  )
}

export default App
