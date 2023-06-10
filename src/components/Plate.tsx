import { PlateProps } from './MenuForm'

interface PlateComponentProps {
  plate: PlateProps
  day: string
}

export function Plate({ plate, day }: PlateComponentProps) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <p className="text-zinc-200 text-xl font-bold">Dia {day}</p>
      <p className="text-zinc-300 text-lg">
        Prato a ser cozinhado: Prato {plate.name}
      </p>
      <div className="text-zinc-400 flex gap-6">
        <p>Custo: R${plate.cost}</p>
        <p>Lucro: R${plate.profit}</p>
      </div>
    </div>
  )
}
