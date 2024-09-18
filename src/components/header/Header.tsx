import { useState } from "react";
import Modal from "../modal/Modal";
import Form from "../form/Form";

const Header: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <div className="flex flex-col items-center px-4 md:px-0">
        <h1 className="text-white text-5xl md:text-7xl text-center mt-5 md:mt-10 pt-2 md:pt-3">
          Região de Talatona Norte
        </h1>
        <h2 className="text-white text-3xl md:text-5xl text-center mt-5 md:mt-10 pt-1">
          Coordenação dos Desbravadores
        </h2>
        <h2 className="text-white text-3xl md:text-5xl text-center mt-5 md:mt-10 pt-1">
          TOP 20 - ESPECIALIDADES
        </h2>
        <p className="text-white text-md md:text-xl text-center mt-4 md:mt-6 px-2 md:px-4">
          Junte-se aos melhores e conquiste novas habilidades! Inscreva-se agora
          para garantir sua participação e destaque-se em especialidades
          incríveis.
        </p>
        <button
          onClick={handleOpenModal}
          className="bg-yellow-500 px-6 py-3 md:px-10 md:py-5 mt-5 md:mt-10 text-black text-2xl md:text-6xl rounded-lg"
        >
          Inscrever-se
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-white text-3xl mb-4">Inscrição</h2>
        <Form />
      </Modal>
    </>
  );
};

export default Header;
