/*
  Algoritmo de criação de cardápio mais lucrativo.

  Autores: André Emanuel, Guilherme Isaac, Jean Carlos e Lucas Teixeira.
  Data: 12/06/2023
  Versão: 1.0
*/

import { MenuProps } from '@/components/Menu'
import { PlateProps } from '@/components/MenuForm'
import { MenuInformations } from '@/app/page'

export function createMenu(
  daysCount: number,
  budget: number,
  plates: PlateProps[],
): MenuInformations {
  // Criação do cardápio vazio, baseado na quantidade de dias a serem planejados
  const menu = createEmptyMenu(daysCount)
  // Variável que irá armazenar o lucro máximo daquele cardápio
  let menuMaxProfit = 0

  // Variável que irá armazenar o orçamento restante ao decorrer das iterações
  let availableBudget = budget

  // Iteração sobre cada dia a ser planejado
  for (let day = 1; day <= daysCount; day++) {
    // Iteração sobre cada prato informado
    for (const plate of plates) {
      // Prato selecionado para o dia atual com o maior lucro até o momento
      const menuDayPlate = menu[day]

      // Verificação se já existe algum prato selecionado para o dia atual
      if (!menuDayPlate) {
        // Se o custo do prato atual couber no orçamento, o mesmo é inserido no cardápio
        if (hasAvailableBudget(plate.cost, availableBudget)) {
          menu[day] = plate
          availableBudget -= plate.cost
          menuMaxProfit += plate.profit
        }

        // Como não tinha nenhum prato selecionado para o dia atual ainda,
        // é pulado para a próxima iteração pois não é necessário fazer as demais
        // operações do algoritmo
        continue
      }

      // Lucro do prato selecionado no dia atual
      const menuDayPlateProfit = calculateProfit(menu, day, menuDayPlate)
      // Lucro do prato da iteração i corrente
      const currentPlateProfit = calculateProfit(menu, day, plate)

      // Verifica se o lucro do prato da iteração atual é maior
      // que o já escolhido anteriormente
      const isCurrentPlateMoreProfitable =
        currentPlateProfit > menuDayPlateProfit

      if (isCurrentPlateMoreProfitable) {
        // Adiciona no orçamento disponível o valor do prato escolhido anteriormente
        const budgetWithoutMenuDayPlate = availableBudget + menuDayPlate.cost

        // Se o custo do prato atual couber no orçamento, ele é inserido no cardápio
        // e é decrementado o seu custo no orçamento disponível
        if (hasAvailableBudget(plate.cost, budgetWithoutMenuDayPlate)) {
          menu[day] = plate
          availableBudget = budgetWithoutMenuDayPlate - plate.cost

          const profitWithoutMenuDayPlate = menuMaxProfit - menuDayPlate.profit
          menuMaxProfit = profitWithoutMenuDayPlate + plate.profit
        }
      }
    }
  }

  // Retorna o cardápio com os pratos a serem cozinhados em cada dia
  // e o lucro máximo do cardápio
  return {
    menu,
    maxProfit: menuMaxProfit,
  }
}

// Cria um objeto que representa o cardápio vazio,
// baseado na quantidade de dias
function createEmptyMenu(daysCount: number): MenuProps {
  return Array.from(Array(daysCount).keys()).reduce(
    (menu, plate, index) => ({
      ...menu,
      [index + 1]: null,
    }),
    {},
  )
}

// Função que verifica se um valor qualquer cabe em um orçamento qualquer
function hasAvailableBudget(value: number, budget: number) {
  return value <= budget
}

// Função que irá calcular o lucro do prato, dado as seguintes regras:
// - Se o prato atual foi cozinhado no dia anterior, seu lucro é de 50%
// - Se o prato atual foi cozinhado em dois ou mais dias seguidos, seu lucro é de 0
function calculateProfit(menu: MenuProps, day: number, plate: PlateProps) {
  // Prato de um dia atrás do dia atual
  const plateFromOneDayAgo = menu[day - 1]
  // Prato de dois dias atrás do dia atual
  const plateFromTwoDaysAgo = menu[day - 2]

  // Verifica se o prato atual é igual ao prato de um dia atrás
  const isPlateEqualToMenuPlateFromOneDayAgo =
    plateFromOneDayAgo && plate.name === plateFromOneDayAgo.name

  // Verifica se o prato atual é igual ao prato de dois dias atrás
  const isPlateEqualToMenuPlateFromTwoDayAgo =
    plateFromTwoDaysAgo && plate.name === plateFromTwoDaysAgo.name

  // Define o lucro do prato atual baseado no seu lucro - seu custo
  let plateProfit = plate.profit - plate.cost

  // Verifica se o prato atual é igual ao prato do dia anterior
  if (isPlateEqualToMenuPlateFromOneDayAgo) {
    // Verifica se o prato atual é igual ao prato de dois dias atrás
    if (isPlateEqualToMenuPlateFromTwoDayAgo) {
      // Como o prato já estará sendo cozinhado por 3 dias seguidos,
      // seu lucro será 0
      plateProfit = 0
    }

    // Como o prato já estará sendo cozinhado por dois dias seguidos,
    // seu lucro será de 50%
    plateProfit = plate.profit / 2
  }

  return plateProfit
}
