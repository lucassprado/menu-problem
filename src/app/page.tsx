'use client'

import { useState } from 'react'

import { Menu } from '@/components/Menu'
import { MenuForm } from '@/components/MenuForm'

import {
  createMenu,
  MenuProps,
  PlateProps,
} from '@/utils/create-more-profitable-menu'

export default function Home() {
  const [menu, setMenu] = useState<MenuProps | null>(null)

  function onCreateMenu(
    daysCount: number,
    budget: number,
    plates: PlateProps[],
  ) {
    console.log(plates)
    setMenu(createMenu(daysCount, budget, plates))
  }

  function onCreateAnotherMenu() {
    setMenu(null)
  }

  return (
    <main className="max-w-7xl mx-auto mt-10 mb-16">
      <h1 className="text-zinc-100 leading-tight font-bold text-4xl">
        Problema do cardápio
      </h1>

      {menu ? (
        <Menu menu={menu} onCreateAnotherMenu={onCreateAnotherMenu} />
      ) : (
        <MenuForm onCreateMenu={onCreateMenu} />
      )}
    </main>
  )
}
