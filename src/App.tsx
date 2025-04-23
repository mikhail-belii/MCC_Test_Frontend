import { useState } from 'react'
import './App.css'
import Tree from './components/Tree/Tree'
import { baseTree } from './constants'
import { TreeType } from './types'

function App() {
  const [tree, setTree] = useState<TreeType>(baseTree)
  const [newNodeName, setNewNodeName] = useState<string>("")
  const [parentId, setParentId] = useState("root")
  const [idIncrement, setIdIncrement] = useState(2)

  const addNode = () => {
    if (!newNodeName.trim()) {
      alert("Введите название вершины")
      return
    }

    const newId = idIncrement.toString()
    setIdIncrement(prev => prev + 1)
    const newNode = {
      id: newId.toString(),
      name: newNodeName,
      children: []
    }

    setTree((prevTree) => {
      const updatedTree = { ...prevTree }
      updatedTree[newId] = newNode
      if (parentId && updatedTree[parentId]) {
        updatedTree[parentId].children.push(newId.toString())
      }
      return updatedTree
    })
    setNewNodeName("")
  }

  return (
    <div className="app">
      <Tree tree={tree} rootName='root'/>

      <div className="add-node-form">
        <input
          type="text"
          value={newNodeName}
          onChange={(e) => setNewNodeName(e.target.value)}
          placeholder="Введите название вершины"/>
        <select
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}>
            {Object.keys(tree).map(id => (
              <option 
                key={id} 
                value={id}>
                  {tree[id].name}
                </option>
            ))}
        </select>
        <button type="button" onClick={addNode}>Добавить вершину</button>
      </div>
    </div>
  )
}

export default App
