import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";

const Form: React.FC = () => {
  const [nomeCompleto, setNomeCompleto] = useState<string>("");
  const [nomeDistrito, setNomeDistrito] = useState<string>("");
  const [nomeClube, setNomeClube] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Formatação: converter para minúsculas e remover espaços em branco extras
    const nomeDistritoFormatado = nomeDistrito.trim().toLowerCase();
    const nomeClubeFormatado = nomeClube.trim().toLowerCase();

    try {
      // Verificar se já existe uma inscrição igual
      const inscritosRef = collection(db, "inscritos");
      const q = query(
        inscritosRef,
        where("nomeCompleto", "==", nomeCompleto),
        where("nomeDistrito", "==", nomeDistritoFormatado),
        where("nomeClube", "==", nomeClubeFormatado)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Inscrição já existe.");
        return;
      }

      // Se não houver duplicata, criar nova inscrição
      await addDoc(inscritosRef, {
        nomeCompleto,
        nomeDistrito: nomeDistritoFormatado,
        nomeClube: nomeClubeFormatado,
        timestamp: new Date(),
      });

      alert("Inscrição realizada com sucesso!");
      setNomeCompleto("");
      setNomeDistrito("");
      setNomeClube("");
    } catch (error) {
      console.error("Erro ao inscrever:", error);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label className="text-white">
        Nome Completo:
        <input
          type="text"
          className="w-full p-2 mt-1 text-black rounded-lg"
          value={nomeCompleto}
          onChange={(e) => setNomeCompleto(e.target.value)}
          placeholder="Digite seu nome completo"
          required
        />
      </label>
      <label className="text-white">
        Nome do Distrito:
        <input
          type="text"
          className="w-full p-2 mt-1 text-black rounded-lg"
          value={nomeDistrito}
          onChange={(e) => setNomeDistrito(e.target.value)}
          placeholder="Digite o nome do distrito"
          required
        />
      </label>
      <label className="text-white">
        Nome do Clube:
        <input
          type="text"
          className="w-full p-2 mt-1 text-black rounded-lg"
          value={nomeClube}
          onChange={(e) => setNomeClube(e.target.value)}
          placeholder="Digite o nome do clube"
          required
        />
      </label>
      <button className="bg-yellow-500 text-black text-xl py-2 rounded-lg mt-4">
        Enviar
      </button>
    </form>
  );
};

export default Form;
