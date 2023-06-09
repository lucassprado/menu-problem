import { Input } from './Input'

interface PlateFormProps {
  name: string | number
  onPlateCostChange: (cost: number, name: string | number) => void
  onPlateProfitChange: (profit: number, name: string | number) => void
}

export function PlateForm({
  name,
  onPlateCostChange,
  onPlateProfitChange,
}: PlateFormProps) {
  function handleCostChange(event: any) {
    const newCost = Number(event.target.value)

    onPlateCostChange(newCost, name)
  }

  function handleProfitChange(event: any) {
    const newProfit = Number(event.target.value)

    onPlateProfitChange(newProfit, name)
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-zinc-300 text-xl font-bold">Prato {name}</p>

      <div className="flex flex-1 gap-4">
        <Input
          label="Custo do prato:*"
          name="cost"
          placeholder="Ex: R$5,00"
          onChange={handleCostChange}
        />
        <Input
          label="Lucro do prato:*"
          name="profit"
          placeholder="Ex: R$10,00"
          onChange={handleProfitChange}
        />
      </div>
    </div>
  )
}
