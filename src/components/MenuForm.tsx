import { useEffect, useState } from 'react'

import { Input } from './Input'
import { PlateForm } from './PlateForm'

export interface PlateProps {
  name: number
  cost: number
  profit: number
}

interface MenuFormProps {
  onCreateMenu: (
    daysCount: number,
    budget: number,
    plates: PlateProps[],
  ) => void
}

export function MenuForm({ onCreateMenu }: MenuFormProps) {
  const [daysCount, setDaysCount] = useState<number | null>(null)
  const [platesAmount, setPlatesAmount] = useState<number | null>(null)
  const [budget, setBudget] = useState<number | null>(null)
  const [plates, setPlates] = useState<PlateProps[]>([])

  function onPlateCostChange(cost: number, plateName: string | number) {
    const newPlates = plates.map((plate) => {
      if (plate.name === plateName) {
        return {
          ...plate,
          cost,
        }
      }

      return plate
    })

    setPlates(newPlates)
  }

  function onPlateProfitChange(profit: number, plateName: string | number) {
    const newPlates = plates.map((plate) => {
      if (plate.name === plateName) {
        return {
          ...plate,
          profit,
        }
      }

      return plate
    })

    setPlates(newPlates)
  }

  function isAllPlatesFilled() {
    let isValid = true

    plates.forEach((plate) => {
      const isPlateCostValid =
        !!plate.cost && plate.cost >= 1 && plate.cost <= 50
      const isPlateProfitValid =
        !!plate.profit && plate.profit >= 1 && plate.profit <= 10000

      if (!isPlateCostValid || !isPlateProfitValid) {
        isValid = false
      }
    })

    return isValid
  }

  function handleCreateMenu() {
    if (daysCount && budget) {
      onCreateMenu(daysCount, budget, plates)
    }
  }

  useEffect(() => {
    if (platesAmount) {
      const newPlates = Array.from(Array(platesAmount).keys()).map(
        (plateName) => ({
          name: plateName + 1,
          cost: 0,
          profit: 0,
        }),
      )
      setPlates(newPlates)
    }
  }, [platesAmount])

  const isPlatesFilled = isAllPlatesFilled()

  const daysCountHasError =
    daysCount !== null && (daysCount < 1 || daysCount > 21)
  const platesAmountHasError =
    platesAmount !== null && (platesAmount < 1 || platesAmount > 50)
  const budgetHasError = budget !== null && (budget < 0 || budget > 100)
  const isBasicInformationsFilled = !!daysCount && !!platesAmount && !!budget

  const isBasicInformationsValid =
    !daysCountHasError &&
    !platesAmountHasError &&
    !budgetHasError &&
    isBasicInformationsFilled

  return (
    <div className="flex flex-col gap-6 mt-8">
      <p className="text-zinc-200 text-lg">
        Informe os campos abaixo para ser feito o planejamento do que será
        cozinhado em seu restaurante nos próximos dias.
      </p>

      <form className="flex flex-col gap-10">
        <div className="grid gap-x-6 grid-cols-3">
          <Input
            label="Quantidade de dias que deseja planejar:*"
            name="days"
            placeholder="Ex: 3"
            onChange={(event) => setDaysCount(Number(event.target.value))}
            errorMessage="Informe uma quantidade maior ou igual a 1 e menor ou igual a 21"
            hasError={daysCountHasError}
          />
          <Input
            label="Quantidade de pratos:*"
            name="plates"
            placeholder="Ex: 5"
            onChange={(event) => setPlatesAmount(Number(event.target.value))}
            errorMessage="Informe uma quantidade maior ou igual a 1 e menor ou igual a 50"
            hasError={platesAmountHasError}
          />
          <Input
            label="Orçamento:*"
            name="budget"
            placeholder="Ex: R$20,00"
            onChange={(event) => setBudget(Number(event.target.value))}
            errorMessage="Informe um orçamento entre R$0,00 e R$100,00"
            hasError={budgetHasError}
          />
        </div>

        {isBasicInformationsValid ? (
          <div className="flex flex-col gap-6">
            <p className="text-zinc-200 text-lg">
              Informe o custo e o lucro de cada prato abaixo:
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {plates.map((plate) => (
                <PlateForm
                  key={plate.name}
                  name={plate.name}
                  onPlateCostChange={onPlateCostChange}
                  onPlateProfitChange={onPlateProfitChange}
                />
              ))}
            </div>
          </div>
        ) : (
          ''
        )}

        <button
          type="button"
          className="bg-violet-500 text-zinc-100 rounded py-4 px-6 font-bold text-lg hover:bg-violet-600 disabled:cursor-not-allowed disabled:bg-gray-500"
          disabled={!isBasicInformationsFilled || !isPlatesFilled}
          onClick={handleCreateMenu}
        >
          Planejar cardápio
        </button>
      </form>
    </div>
  )
}
