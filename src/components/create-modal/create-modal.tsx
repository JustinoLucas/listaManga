import { useState } from "react"
import { mangaData } from "../../interface/mangaData";
import { useMangaDataMutate } from "../../hooks/useMangaDataMutate";


interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}


const Input = ({label, value, updateValue}: InputProps) => {
    return(
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}



export function CreateModal(){

const [nome, setNome] = useState("");
const [descricao, setDescricao] = useState("")
const [imagem_capa, setImagemCapa] = useState("")
const [capitulos, setCapitulos] = useState(0)
const { mutate } = useMangaDataMutate();

const submit = () => {
    const mangaData: mangaData = {
        nome,
        descricao,
        imagem_capa,
        capitulos
    }
    mutate(mangaData);
}

    return(
        <div className="modal-overflow">
            <div className="modal-body">
                <h2>Cadastre um novo Manga</h2>
                <form className="input-container">
                    <Input label="nome" value={nome} updateValue={setNome}/>
                    <Input label="descricao" value={descricao} updateValue={setDescricao}/>
                    <Input label="imagem_capa" value={imagem_capa} updateValue={setImagemCapa}/>
                    <Input label="capitulos" value={capitulos} updateValue={setCapitulos}/>
                </form>
                <button onClick={submit} className="btn-secondary">Enviar</button>
            </div>
        </div>
    )
}