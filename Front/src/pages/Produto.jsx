import axios from "axios";
import NavBar from "../components/NavBar.jsx";
import Alert from "../components/Alert.jsx";
import { useState, useEffect } from "react";

function Produto() {

    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [descricao, setDescricao] = useState("");
    const [bitola, setBitola] = useState("");
    const [peso, setPeso] = useState("");
    const [idCategoria, setIdCategoria] = useState("");

    const [alert, setAlert] = useState({
        show: false,
        type: "error",
        message: ""
    });

    const getProdutos = async () => {
        try {
            const response = await axios.get("http://localhost:9099/api/produto");
            setProdutos(response.data.data ?? []);
            console.log(response.data.data);
        } catch (error) {
            console.log(error.response?.data?.msg || "Erro ao buscar produtos!");
        }
    };

    const getCategorias = async () => {
        try {
            const response = await axios.get("http://localhost:9099/api/categoria");
            setCategorias(response.data.data ?? []);
        } catch (error) {
            console.log(error.response?.data?.msg || "Erro ao buscar categorias!");
        }
    };

    useEffect(() => {
        getProdutos();
        getCategorias();
    }, []);

    const showAlert = (type, message) => {
        setAlert({ show: true, type, message });
        setTimeout(() => setAlert(prev => ({ ...prev, show: false })), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:9099/api/produto", {
                descricao,
                bitola,
                peso,
                idCategoria
            });

            showAlert("success", "Produto cadastrado com sucesso!");
            await getProdutos();

            setDescricao("");
            setBitola("");
            setPeso("");
            setIdCategoria("");

        } catch (error) {
            showAlert("error", error.response?.data?.msg || "Erro ao cadastrar produto!");
        }
    };

    return (
        <>
            <NavBar />

            <div className="min-h-screen bg-linear-to-r from-zinc-900 to-zinc-800 px-8 py-10">

                {alert.show && (
                    <div className="fixed top-5 right-5 z-50 min-w-2xs shadow-lg animate-slide-in">
                        <Alert type={alert.type} message={alert.message} />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    <div className="bg-zinc-900 p-8 rounded-3xl shadow-2xl">

                        <h1 className="text-2xl font-bold text-white mb-6">
                            Cadastrar Produto
                        </h1>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-zinc-300 font-medium">
                                    Descrição
                                </label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                                    type="text"
                                    placeholder="Descrição do produto..."
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-zinc-300 font-medium">
                                    Bitola
                                </label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                                    type="text"
                                    placeholder="Bitola do produto..."
                                    value={bitola}
                                    onChange={(e) => setBitola(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-zinc-300 font-medium">
                                    Peso (kg)
                                </label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                                    type="number"
                                    step="0.001"
                                    placeholder="0.000"
                                    value={peso}
                                    onChange={(e) => setPeso(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label className="text-sm text-zinc-300 font-medium">
                                    Categoria
                                </label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition appearance-none cursor-pointer"
                                    style={{ colorScheme: 'dark' }}
                                    value={idCategoria}
                                    onChange={(e) => setIdCategoria(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Selecione uma categoria...</option>
                                    {categorias.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.descricao}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/ text-zinc-400 hover:text-white transition">
                                    ▼
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 bg-red-600 hover:bg-red-700 transition duration-300 text-white py-3 rounded-xl font-semibold shadow-lg"
                            >
                                Cadastrar Produto
                            </button>

                        </form>
                    </div>

                    <div className="lg:col-span-2 bg-zinc-900 p-8 rounded-3xl shadow-2xl">

                        <h1 className="text-2xl font-bold text-white mb-6">
                            Produtos Cadastrados
                        </h1>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">

                                <thead>
                                    <tr className="text-zinc-400 border-b border-zinc-700">
                                        <th className="py-3">Descrição</th>
                                        <th className="py-3">Bitola</th>
                                        <th className="py-3">Peso</th>
                                        <th className="py-3">Categoria</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {produtos.map(produto => (
                                        <tr key={produto.id} className="border-b border-zinc-800">
                                            <td className="py-3 text-white">
                                                {String(produto.descricao).toUpperCase()}
                                            </td>
                                            <td className="py-3 text-zinc-400">
                                                {Number(produto.bitola).toFixed(1)}
                                            </td>
                                            <td className="py-3 text-red-400 font-semibold">
                                                {Number(produto.peso).toFixed(3)} kg
                                            </td>
                                            <td className="py-3 text-sky-500 text-justify">
                                                {categorias.find(c => c.id === produto.idCategoria)?.descricao ?? "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Produto;