import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

interface Inscrito {
  nomeCompleto: string;
  nomeDistrito: string;
  nomeClube: string;
}

const Totals: React.FC = () => {
  const [totalInscritos, setTotalInscritos] = useState<number>(0);
  const [inscritosPorDistrito, setInscritosPorDistrito] = useState<
    Map<string, number>
  >(new Map());
  const [inscritosPorClube, setInscritosPorClube] = useState<
    Map<string, number>
  >(new Map());
  const [inscritosList, setInscritosList] = useState<Inscrito[]>([]);

  useEffect(() => {
    const fetchInscritos = async () => {
      const querySnapshot = await getDocs(collection(db, "inscritos"));
      const inscritos: Inscrito[] = querySnapshot.docs.map(
        (doc) => doc.data() as Inscrito
      );

      setInscritosList(inscritos);

      // Totals
      setTotalInscritos(inscritos.length);

      // Totals by district (insensitive to case)
      const distritoCount = inscritos.reduce((acc, inscrito) => {
        const nomeDistritoLower = inscrito.nomeDistrito.toLowerCase();
        acc.set(nomeDistritoLower, (acc.get(nomeDistritoLower) || 0) + 1);
        return acc;
      }, new Map<string, number>());
      setInscritosPorDistrito(distritoCount);

      // Totals by club (insensitive to case)
      const clubeCount = inscritos.reduce((acc, inscrito) => {
        const nomeClubeLower = inscrito.nomeClube.toLowerCase();
        acc.set(nomeClubeLower, (acc.get(nomeClubeLower) || 0) + 1);
        return acc;
      }, new Map<string, number>());
      setInscritosPorClube(clubeCount);
    };

    fetchInscritos();
  }, []);

  return (
    <div className="text-black p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Estatísticas de Inscrições
      </h2>

      <div className="mb-8">
        <p className="text-2xl font-semibold">Total de Inscritos:</p>
        <p className="text-4xl text-yellow-600 font-bold mt-2">
          {totalInscritos}
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700">
          Inscritos por Distrito:
        </h3>
        <ul className="mt-4 space-y-2">
          {Array.from(inscritosPorDistrito.entries()).map(
            ([distrito, total]) => (
              <li
                key={distrito}
                className="flex justify-between items-center bg-yellow-100 p-4 rounded-lg"
              >
                <span className="text-lg font-medium">
                  {distrito.charAt(0).toUpperCase() + distrito.slice(1)}
                </span>
                <span className="text-xl font-bold text-yellow-600">
                  {total}
                </span>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700">
          Inscritos por Clube:
        </h3>
        <ul className="mt-4 space-y-2">
          {Array.from(inscritosPorClube.entries()).map(([clube, total]) => (
            <li
              key={clube}
              className="flex justify-between items-center bg-yellow-100 p-4 rounded-lg"
            >
              <span className="text-lg font-medium">
                {clube.charAt(0).toUpperCase() + clube.slice(1)}
              </span>
              <span className="text-xl font-bold text-yellow-600">{total}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* List of all participants */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700">
          Lista de Inscritos:
        </h3>
        <ul className="mt-4 space-y-2">
          {inscritosList.map((inscrito, index) => (
            <li
              key={index}
              className="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium">
                  {index + 1}. {inscrito.nomeCompleto}
                </p>
                <p className="text-sm text-gray-600">
                  Distrito: {inscrito.nomeDistrito} | Clube:{" "}
                  {inscrito.nomeClube}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Totals;
