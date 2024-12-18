import { useEffect, useState } from "react"
import { mangaData } from "../../interface/mangaData";
import { useMangaDataMutate } from "../../hooks/useMangaDataMutate";
import './modal.css'


interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}


const Input = ({label, value, updateValue}: InputProps) => {
    return(
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)} required></input>
        </>
    )
}

interface ModalProps {
    closeModal(): void
}

export function CreateModal({ closeModal }: ModalProps){

const [nome, setNome] = useState("");
const [descricao, setDescricao] = useState("")
const [imagem_capa, setImagemCapa] = useState("")
const [capitulos, setCapitulos] = useState(0)
const { mutate, isSuccess, isPending } = useMangaDataMutate();

const submit = () => {
    const mangaData: Omit<mangaData, "id"> = {
        nome,
        descricao,
        imagem_capa,
        capitulos
    }
    mutate(mangaData as mangaData);
}

useEffect(() =>{
    if(!isSuccess) return
    closeModal();
}, [isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo Manga</h2>
                <form className="input-container">
                    <Input label="Nome do Manga" value={nome} updateValue={setNome} />
                    <Input label="Sinopse" value={descricao} updateValue={setDescricao}/>
                    <Input label="Imagem da Capa em URL" value={imagem_capa} updateValue={setImagemCapa}/>
                    <Input label="Capitulos" value={capitulos} updateValue={setCapitulos}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isPending ? 'Enviando...' : 'Enviar'}
                </button>
                <button className="btn-secondary" onClick={closeModal}>Sair</button>
                
            </div>
        </div>
    )
}