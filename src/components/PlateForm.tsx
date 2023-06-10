import { useState } from 'react'
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
  const [costIsValid, setCostIsValid] = useState<boolean>(true)
  const [profitIsValid, setProfitIsValid] = useState<boolean>(true)

  function handleCostChange(event: any) {
    const newCost = Number(event.target.value)
    const isCostValid = newCost >= 1 && newCost <= 50

    setCostIsValid(isCostValid)
    onPlateCostChange(newCost, name)
  }

  function handleProfitChange(event: any) {
    const newProfit = Number(event.target.value)
    const isProfitValid = newProfit >= 1 && newProfit <= 10000

    setProfitIsValid(isProfitValid)
    onPlateProfitChange(newProfit, name)
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-zinc-300 text-xl font-bold">Prato {name}</p>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Custo do prato:*"
          name="cost"
          placeholder="Ex: R$5,00"
          onChange={handleCostChange}
          errorMessage="Informe um custo maior ou igual a 1 e menor ou igual a 50"
          hasError={!costIsValid}
        />
        <Input
          label="Lucro do prato:*"
          name="profit"
          placeholder="Ex: R$10,00"
          onChange={handleProfitChange}
          errorMessage="Informe um lucro maior ou igual a 1 e menor ou igual a 10000"
          hasError={!profitIsValid}
        />
      </div>
    </div>
  )
}
