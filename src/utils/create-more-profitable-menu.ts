export interface PlateProps {
  name: number
  cost: number
  profit: number
}

export interface MenuProps {
  [key: string]: PlateProps
}

export function createMenu(
  daysCount: number,
  budget: number,
  plates: PlateProps[],
) {
  const menu = createEmptyMenu(daysCount)

  let availableBudget = budget

  for (let day = 1; day <= daysCount; day++) {
    for (const plate of plates) {
      const menuDayPlate = menu[day]

      if (!menuDayPlate) {
        if (hasAvailableBudget(plate.cost, availableBudget)) {
          menu[day] = plate
          availableBudget -= plate.cost
        }
        continue
      }

      const menuDayPlateProfit = calculateProfit(menu, day, menuDayPlate)
      const currentPlateProfit = calculateProfit(menu, day, plate)

      const isCurrentPlateMoreProfitable =
        currentPlateProfit > menuDayPlateProfit

      if (isCurrentPlateMoreProfitable) {
        const budgetWithoutMenuDayPlate = availableBudget + menuDayPlate.cost

        if (hasAvailableBudget(plate.cost, budgetWithoutMenuDayPlate)) {
          menu[day] = plate
          availableBudget = budgetWithoutMenuDayPlate - plate.cost
        }
      }
    }
  }

  return menu
}

function createEmptyMenu(daysCount: number): MenuProps {
  return Array.from(Array(daysCount).keys()).reduce(
    (menu, plate, index) => ({
      ...menu,
      [index + 1]: null,
    }),
    {},
  )
}

function hasAvailableBudget(value: number, budget: number) {
  return value <= budget
}

function calculateProfit(menu: MenuProps, day: number, plate: PlateProps) {
  const plateFromOneDayAgo = menu[day - 1]
  const plateFromTwoDaysAgo = menu[day - 2]

  const isPlateEqualToMenuPlateFromOneDayAgo =
    plateFromOneDayAgo && plate.name === plateFromOneDayAgo.name

  const isPlateEqualToMenuPlateFromTwoDayAgo =
    plateFromTwoDaysAgo && plate.name === plateFromTwoDaysAgo.name

  let plateProfit = plate.profit - plate.cost

  if (isPlateEqualToMenuPlateFromOneDayAgo) {
    if (isPlateEqualToMenuPlateFromTwoDayAgo) {
      plateProfit = 0
    }

    plateProfit = plateProfit / 2
  }

  return plateProfit
}
