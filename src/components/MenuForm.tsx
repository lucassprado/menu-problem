import { useEffect, useState } from 'react'

import { Input } from './Input'
import { PlateForm } from './PlateForm'

import { PlateProps } from '@/utils/create-more-profitable-menu'

interface MenuFormProps {
  onCreateMenu: (
    daysCount: number,
    budget: number,
    plates: PlateProps[],
  ) => void
}

export function MenuForm({ onCreateMenu }: MenuFormProps) {
  const [daysCount, setDaysCount] = useState<number>(0)
  const [platesAmount, setPlatesAmount] = useState<number>(0)
  const [budget, setBudget] = useState<number>(0)
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
    let isFilled = true

    plates.forEach((plate) => {
      if (!plate.cost || !plate.profit) {
        isFilled = false
      }
    })

    return isFilled
  }

  function handleCreateMenu() {
    onCreateMenu(daysCount, budget, plates)
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

  const isBasicInformationsFilled = !!daysCount && !!platesAmount && !!budget
  const isPlatesFilled = isAllPlatesFilled()

  return (
    <div className="flex flex-col gap-6 mt-8">
      <p className="text-zinc-200 text-lg">
        Informe os campos abaixo para ser feito o planejamento do que será
        cozinhado em seu restaurante nos próximos dias.
      </p>

      <form className="flex flex-col gap-10">
        <div className="flex gap-6">
          <Input
            label="Quantidade de dias que deseja planejar:*"
            name="days"
            placeholder="Ex: 3"
            onChange={(event) => setDaysCount(Number(event.target.value))}
          />
          <Input
            label="Quantidade de pratos:*"
            name="plates"
            placeholder="Ex: 5"
            onChange={(event) => setPlatesAmount(Number(event.target.value))}
          />
          <Input
            label="Orçamento:*"
            name="budget"
            placeholder="Ex: R$20,00"
            onChange={(event) => setBudget(Number(event.target.value))}
          />
        </div>

        {isBasicInformationsFilled ? (
          <div className="flex flex-col gap-6">
            <p className="text-zinc-200 text-lg">
              Informe o custo e o lucro de cada prato abaixo:
            </p>

            <div className="flex gap-10 flex-wrap">
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
