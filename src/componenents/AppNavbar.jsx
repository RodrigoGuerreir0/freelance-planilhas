import { useLocation, Link } from "react-router-dom";
import './styles/Navbars.css';

export const AppNavbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // Mapeamento completo de todas as subrotas
    const allSubItems = {
        informacoes: [
            { path: "/informacoes/empresa", label: "Empresa" },
            { path: "/informacoes/socios", label: "Sócios" },
            { path: "/informacoes/departamentos", label: "Departamentos" },
            { path: "/informacoes/equipe", label: "Equipes" }

        ],
        modelagem: [
            { path: "/modelagem/canvas", label: "Canvas" },
            { path: "/modelagem/curva-de-valor", label: "Curva de Valor" }
        ],
        estrategia: [
            { path: "/estrategia/diretrizes", label: "Diretrizes" },
            { path: "/estrategia/forcas", label: "Forças" },
            { path: "/estrategia/swot", label: "SWOT" },
            { path: "/estrategia/metas", label: "Metas" },
            { path: "/estrategia/acoes", label: "Ações" }
        ],
        marketing: [
            { path: "/marketing/campanhas", label: "Campanhas" },
            { path: "/marketing/redes-sociais", label: "Redes Sociais" }
        ],
        preco: [
            { path: "/preco/tabela", label: "Tabela de Preços" },
            { path: "/preco/estrategia", label: "Estratégia" }
        ],
        financas: [
            { path: "/financas/balanco", label: "Balanço" },
            { path: "/financas/fluxo", label: "Fluxo de Caixa" }
        ]
    };

    // Encontra qual grupo de subitens corresponde à rota atual
    const currentSubItems = Object.entries(allSubItems).find(([key]) => 
        currentPath.startsWith(`/${key}`)
    )?.[1] || [];

    // Se não houver subitens ou estiver na raiz, não mostra nada
    if (currentSubItems.length === 0 || currentPath === '/') {
        return null;
    }

    return (
        <div className="minimalist-navbar">
            <div className="subitems-container">
                {currentSubItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`subitem ${currentPath === item.path ? 'active' : ''}`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};