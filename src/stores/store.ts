import { defineStore } from "pinia"
import { nextTick } from "vue"

type Item = {
  id: number
  value: string
  indent: number
  parent: number
  lastChild: number
}

type ConvertState = {
  counter: number
  items: Item[]
  divs: HTMLElement[]
}

export const ConvertToThree = defineStore("convertToThree", {
  //保持したいデータ
  state: () => {
    return {
      counter: 0,
      items: [],
      divs: [],
    } as ConvertState
  },
  getters: {
    tree: (state) => {
      let parents = [0]
      let items = state.items

      for (let i = 1; i < items.length; i++) {
        parents[items[i].indent] = i
        items[i].parent = parents[items[i].indent - 1]
        items[items[i].parent].lastChild = i
      }

      let prefix = ""
      let lines = [items[0].value]

      for (let i = 1; i < items.length; i++) {
        let parentIndex = items[i].parent

        if (items[i].indent > 1) {
          prefix = prefix.slice(0, (items[i].indent - 2) * 4)
          if (items[items[parentIndex].parent].lastChild === parentIndex) {
            prefix += "    "
          } else {
            prefix += "│   "
          }
        } else {
          prefix = ""
        }
        lines[i] = prefix

        if (items[parentIndex].lastChild === i) {
          lines[i] += "└── "
        } else {
          lines[i] += "├── "
        }
        lines[i] += items[i].value
      }

      return lines.join("\n")
    },
  },
  actions: {
    created() {
      this.items = [
        { id: 0, value: "List to Tree", indent: 0, parent: 0, lastChild: 0 },
        { id: 1, value: "使い方", indent: 1, parent: 0, lastChild: 0 },
        {
          id: 2,
          value: "クリックで、編集",
          indent: 2,
          parent: 0,
          lastChild: 0,
        },
        {
          id: 3,
          value: "上下キーで、フォーカス移動",
          indent: 2,
          parent: 0,
          lastChild: 0,
        },
        {
          id: 4,
          value: "Enter で、新規追加",
          indent: 2,
          parent: 0,
          lastChild: 0,
        },
        {
          id: 5,
          value: "Tab / Shift+Tab で階層移動",
          indent: 2,
          parent: 0,
          lastChild: 0,
        },
        {
          id: 6,
          value: "Backspace (空欄時) で削除",
          indent: 2,
          parent: 0,
          lastChild: 0,
        },
        { id: 7, value: "How to", indent: 1, parent: 0, lastChild: 0 },
        { id: 8, value: "Click to edit", indent: 2, parent: 0, lastChild: 0 },
        {
          id: 9,
          value: "Up / Down to move focus",
          indent: 2,
          parent: 0,
          lastChild: 0,
        },
        {
          id: 10,
          value: "Enter to add new item",
          indent: 2,
          parent: 0,
          lastChild: 0,
        },
        {
          id: 11,
          value: "Tab / Shift+Tab to move right / left",
          indent: 2,
          parent: 0,
          lastChild: 0,
        },
        {
          id: 12,
          value: "Backspace in empty item to delete",
          indent: 2,
          parent: 0,
          lastChild: 0,
        },
      ]
      this.counter = this.items.length
      nextTick(() => {
        this.selectItem(0)
      })
    },
    onInput(event: Event, item: Item) {
      const target = event.target as HTMLElement
      item.value = target?.innerText
    },
    onTab(item: Item, index: number) {
      if (index === 0) return
      if (this.items[index - 1].indent < item.indent) return
      item.indent++
    },
    onTabShift(item: Item, index: number) {
      if (item.indent <= 1) return
      item.indent--

      for (let i = index + 1; i < this.items.length; i++) {
        if (this.items[i - 1].indent + 2 !== this.items[i].indent) break
        this.items[i].indent--
      }
    },
    onDown(index: number) {
      this.selectItem(index + 1)
    },
    onUp(index: number) {
      this.selectItem(index - 1)
    },
    selectItem(index: number) {
      if (index < -1 || index >= this.items.length) return

      const el = this.getDiv(index)
      el.focus()
      let range = document.createRange()
      range.selectNodeContents(el)
      let sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(range)
    },
    getDiv(index: number) {
      return this.divs[this.items[index].id]
    },
    onEnter(item: Item, index: number) {
      const newItem = {
        id: this.counter,
        value: "item-" + this.counter,
        indent: Math.max(1, item.indent),
        parent: 0,
        lastChild: 0,
      }
      this.items.splice(index + 1, 0, newItem)
      this.counter++

      nextTick(() => {
        this.selectItem(index + 1)
      })
    },
    onBackspace(item: Item, index: number) {
      if (index == 0) return
      if (item.value != "") return
      item.indent--

      for (let i = index + 1; i < this.items.length; i++) {
        if (this.items[i - 1].indent + 2 !== this.items[i].indent) break
        this.items[i].indent--
      }
      this.items.splice(index, 1)
      this.getDiv(index - 1).focus()
    },

    deleteList() {
      this.items = [
        { id: 0, value: "root", indent: 0, parent: 0, lastChild: 0 },
        { id: 1, value: "item-1", indent: 1, parent: 0, lastChild: 0 },
      ]
      this.counter = this.items.length
    },
  },
})
