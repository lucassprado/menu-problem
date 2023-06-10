import { Plate } from './Plate'
import { PlateProps } from './MenuForm'

export interface MenuProps {
  [key: string]: PlateProps
}

interface MenuComponentProps {
  menu: MenuProps
  onCreateAnotherMenu: () => void
}

export function Menu({ menu, onCreateAnotherMenu }: MenuComponentProps) {
  function handleCreateAnotherMenu() {
    onCreateAnotherMenu()
  }

  const menuProfit = Object.values(menu).reduce(
    (total, plate) => total + plate.profit,
    0,
  )

  return (
    <div className="w-full mt-20">
      <div className="flex flex-col items-center gap-8">
        <p className="text-zinc-200 text-2xl font-bold">
          Pratos escolhidos para o cardápio:
        </p>

        <div className="grid grid-cols-4 gap-x-12 gap-y-12">
          {Object.entries(menu).map(([day, plate]) => (
            <Plate key={plate.name} day={day} plate={plate} />
          ))}
        </div>

        <p className="text-zinc-100 text-2xl font-bold">
          Lucro total do cardápio:{' '}
          <span className="text-zinc-300">R${menuProfit}</span>
        </p>
      </div>

      <button
        type="button"
        className="bg-violet-500 w-full mt-20 text-zinc-100 rounded py-4 px-6 font-bold text-lg hover:bg-violet-600"
        onClick={handleCreateAnotherMenu}
      >
        Planejar outro cardápio
      </button>
    </div>
  )
}
