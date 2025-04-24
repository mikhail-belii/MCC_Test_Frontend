import { useState } from 'react'
import './App.css'
import Tree from './components/Tree/Tree'
import { baseTree } from './constants'
import { TreeType } from './types'
import InteractTreePanel from './components/InteractTreePanel/InteractTreePanel'

function App() {
  const [tree, setTree] = useState<TreeType>(structuredClone(baseTree))

  const addNode = (newNodeName: string, idIncrement: number, parentId: string) => {
    const nodeId = idIncrement.toString()
    
    const newNode = {
      id: nodeId.toString(),
      name: newNodeName,
      children: []
    }

    setTree((prevTree) => {
      const updatedTree = { ...prevTree }
      updatedTree[nodeId] = newNode
      if (parentId && updatedTree[parentId]) {
        updatedTree[parentId].children.push(nodeId.toString())
      }
      return updatedTree
    })
  }

  const removeNode = (nodeId: string) => {
    setTree((prevTree) => {
      if (!prevTree[nodeId]) {
        return prevTree
      }
      const updatedTree = { ...prevTree }

      const pickIdsForDeleting = (id: string) => {
        const ids: string[] = [id]
        const node = tree[id]
        if (node && node.children) {
          node.children.forEach((childId) => {
            ids.push(...pickIdsForDeleting(childId))
          })
        }

        return ids
      }

      const idsForDeleting = pickIdsForDeleting(nodeId)
      idsForDeleting.forEach(id => {
        delete updatedTree[id]
      })

      Object.keys(updatedTree).forEach((key) => {
        updatedTree[key].children = updatedTree[key].children.filter(
          childId => childId !== nodeId
        )
      })

      return updatedTree
    })
  }

  const editNode = (nodeId: string, newName: string) => {
    setTree((prevTree) => {
      if (!prevTree[nodeId]) {
        return prevTree
      }

      const updatedTree = { ...prevTree }
      if (updatedTree[nodeId]) {
        updatedTree[nodeId].name = newName
      }
      return updatedTree
    })
  }

  const resetTree = () => {
    setTree(baseTree)
  }

  return (
    <div className="app">
      <Tree tree={tree} rootName='root'/>
      <InteractTreePanel
        tree={tree}
        onAddingNode={addNode}
        onRemovingNode={removeNode}
        onEditingNode={editNode}
        onResetingTree={resetTree}/>

    </div>
  )
}

export default App
