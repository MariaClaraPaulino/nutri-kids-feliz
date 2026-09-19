import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, Sprout, Sun, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "./ui/button";

const links = [
  ["/", "Início"], ["/alimentacao-saudavel", "Alimentação saudável"], ["/agua", "Água"],
  ["/o-que-fazer", "O que fazer"], ["/o-que-evitar", "O que evitar"], ["/dicas", "Dicas"], ["/quiz", "Quiz"],
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const saved = localStorage.getItem("tema-pequenos-habitos") === "escuro";
    setDark(saved); document.documentElement.classList.toggle("dark", saved);
  }, []);
  const toggleTheme = () => { const next = !dark; setDark(next); document.documentElement.classList.toggle("dark", next); localStorage.setItem("tema-pequenos-habitos", next ? "escuro" : "claro"); };
  useEffect(() => setMenu(false), [pathname]);
  return <div className="min-h-screen bg-background text-foreground">
    <a href="#conteudo" className="fixed left-3 top-3 z-50 -translate-y-20 bg-primary px-4 py-2 text-primary-foreground focus:translate-y-0">Pular para o conteúdo</a>
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-forest"><span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"><Sprout aria-hidden="true" /></span> Pequenos Hábitos</Link>
        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">{links.map(([to,label]) => <Link key={to} to={to} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&.active]:bg-secondary [&.active]:text-secondary-foreground">{label}</Link>)}</nav>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}>{dark ? <Sun /> : <Moon />}</Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenu(!menu)} aria-label={menu ? "Fechar menu" : "Abrir menu"} aria-expanded={menu}>{menu ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {menu && <nav aria-label="Menu móvel" className="border-t border-border bg-background p-3 lg:hidden">{links.map(([to,label]) => <Link key={to} to={to} className="block rounded-md px-4 py-3 font-medium hover:bg-muted [&.active]:bg-secondary">{label}</Link>)}</nav>}
    </header>
    <main id="conteudo">{children}</main>
    <footer className="bg-forest text-primary-foreground"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-2 lg:px-8"><div><div className="mb-3 flex items-center gap-2 font-display text-xl font-bold"><Sprout /> Pequenos Hábitos</div><p className="max-w-md text-sm opacity-80">Informação simples para apoiar relações mais tranquilas e positivas com a alimentação na infância.</p></div><div className="space-y-1 text-sm md:text-right"><p className="font-semibold">Produzido por Clara Paulino</p><p>Disciplina de Projeto Integrador</p><p>ETE Limoeiro</p><p>Com apoio de Tarcila e Laura</p></div></div></footer>
  </div>;
}