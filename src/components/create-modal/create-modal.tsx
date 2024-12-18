import { useEffect, useState } from "react"
import { mangaData } from "../../interface/mangaData";
import { useMangaDataMutate } from "../../hooks/useMangaDataMutate";
import './create-modal.css'


interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}


const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)} required></input>
        </>
    )
}

interface ModalProps {
    closeModal(): void
}

export function CreateModal({ closeModal }: ModalProps) {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("")
    const [imagem_capa, setImagemCapa] = useState("")
    const [capitulos, setCapitulos] = useState(0)
    const [error, setError] = useState<string | null>(null);
    const { mutate, isSuccess, isPending } = useMangaDataMutate();

    const submit = () => {
        if (!nome || !descricao || !imagem_capa || !capitulos) {
            setError("Por favor, preencha todos os campos!");
            return;
        }
        const mangaData: Omit<mangaData, "id"> = {
            nome,
            descricao,
            imagem_capa,
            capitulos
        }
        mutate(mangaData as mangaData);
    }

    const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (value: any) => {
        setter(value);
        if (error) {
            setError(null); // Limpa a mensagem de erro se o usuário começar a digitar
        }
    };

    useEffect(() => {
        if (!isSuccess) return
        closeModal();
    }, [isSuccess, closeModal])

    return (
        <div className="create-modal-overlay">
            <div className="create-modal-body">
                <h2>Cadastre um novo Manga</h2>
                <form className="input-container">
                    <Input label="Nome do Manga" value={nome} updateValue={handleChange(setNome)} />
                    <Input label="Sinopse" value={descricao} updateValue={handleChange(setDescricao)} />
                    <Input label="Imagem da Capa em URL" value={imagem_capa} updateValue={handleChange(setImagemCapa)} />
                    <Input label="Capitulos" value={capitulos} updateValue={handleChange(setCapitulos)} />
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="create-modal-actions">
                    <button onClick={submit} className="btn-enviar">
                        {isPending ? 'Enviando...' : 'Enviar'}
                    </button>
                    <button className="btn-sair" onClick={closeModal}>Sair</button>
                </div>
            </div>
        </div>
    )
}