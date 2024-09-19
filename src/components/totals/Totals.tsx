import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

interface Inscrito {
  nomeCompleto: string;
  nomeDistrito: string;
  nomeClube: string;
}

const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const Totals: React.FC = () => {
  const [totalInscritos, setTotalInscritos] = useState<number>(0);
  const [inscritosPorDistrito, setInscritosPorDistrito] = useState<
    Map<string, { total: number; clubes: Map<string, number> }>
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

      // Totals by district and clubs (case insensitive)
      const distritoCount = inscritos.reduce((acc, inscrito) => {
        const nomeDistritoLower = inscrito.nomeDistrito.toLowerCase();
        const nomeClubeLower = inscrito.nomeClube.toLowerCase();

        if (!acc.has(nomeDistritoLower)) {
          acc.set(nomeDistritoLower, { total: 0, clubes: new Map() });
        }

        const distritoData = acc.get(nomeDistritoLower)!;
        distritoData.total += 1;
        distritoData.clubes.set(
          nomeClubeLower,
          (distritoData.clubes.get(nomeClubeLower) || 0) + 1
        );

        return acc;
      }, new Map<string, { total: number; clubes: Map<string, number> }>());

      setInscritosPorDistrito(distritoCount);
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
          Inscritos por Distrito e Clube:
        </h3>
        <ul className="mt-4 space-y-4">
          {Array.from(inscritosPorDistrito.entries()).map(
            ([distrito, { total, clubes }]) => (
              <li key={distrito} className="bg-yellow-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">
                    {capitalizeFirstLetter(distrito)}
                  </span>
                  <span className="text-xl font-bold text-yellow-600">
                    {total} inscritos
                  </span>
                </div>
                {/* List of clubs under this district */}
                <ul className="mt-2 ml-6 list-decimal space-y-2">
                  {Array.from(clubes.entries()).map(
                    ([clube, totalClube], index) => (
                      <li
                        key={clube}
                        className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                      >
                        <span className="text-md font-medium">
                          {index + 1}. {capitalizeFirstLetter(clube)}
                        </span>
                        <span className="text-md text-yellow-600 font-semibold">
                          {totalClube} inscritos
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </li>
            )
          )}
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
                  Distrito: {capitalizeFirstLetter(inscrito.nomeDistrito)} |
                  Clube: {capitalizeFirstLetter(inscrito.nomeClube)}
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
