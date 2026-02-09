import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();
    // Theming
    const effectiveTheme = resolvedTheme ?? "light";
    const toggleTheme = () => setTheme(effectiveTheme === "dark" ? "light" : "dark");

    return (
        <div>
            {effectiveTheme === "dark" ? (
                <button onClick={toggleTheme} className="p-2 text-slate-500" aria-label="Toggle theme">
                    <Sun size={20} />
                </button>

            ) : (
                <button onClick={toggleTheme} className="p-2 text-slate-500" aria-label="Toggle theme">
                    <Moon size={20} />
                </button>
            )
            }
        </div>
    )
}

export default ThemeToggle