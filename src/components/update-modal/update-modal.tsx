import { useState } from "react";
import { useMangaDataUpdate } from "../../hooks/useMangaDataUpdate";
import { mangaData } from "../../interface/mangaData";
import "./update-modal.css";

interface UpdateModalProps {
  closeModal: () => void;
  manga: mangaData;
}

export function UpdateModal({ closeModal, manga }: UpdateModalProps) {
  const { mutate, isPending } = useMangaDataUpdate();
  const [formData, setFormData] = useState<mangaData>({
    id: manga.id,
    nome: manga.nome,
    imagem_capa: manga.imagem_capa,
    descricao: manga.descricao,
    capitulos: manga.capitulos,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { id: formData.id, data: formData },
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Atualizar Manga</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Imagem URL:
            <input
              type="text"
              name="imagem_capa"
              value={formData.imagem_capa}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Capitulos:
            <input
              type="number"
              name="capitulos"
              value={formData.capitulos}
              onChange={handleChange}
              required
            />
          </label>
          <div className="modal-actions">
            <button type="submit" disabled={isPending}>
              {isPending ? "Atualizando..." : "Atualizar"}
            </button>
            <button type="button" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
