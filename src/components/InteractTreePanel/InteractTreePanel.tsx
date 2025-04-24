import { useState } from "react"
import { TreeType } from "../../types"
import "./InteractTreePanel.css"

export type InteractTreePanelPropsType = {
    tree: TreeType,
    onAddingNode: (newNodeName: string, idIncrement: number, parentId: string) => void,
    onRemovingNode: (nodeId: string) => void,
    onEditingNode: (nodeId: string, newName: string) => void,
    onResetingTree: () => void
}

const InteractTreePanel = ({tree, onAddingNode, onRemovingNode, onEditingNode, onResetingTree}: InteractTreePanelPropsType) => {
    const [newNodeName, setNewNodeName] = useState<string>("")
    const [parentId, setParentId] = useState("default")
    const [idIncrement, setIdIncrement] = useState(2)
    const [removingNodeId, setRemovingNodeId] = useState<string>("default")
    const [NodeNewName, setNodeNewName] = useState<string>("")
    const [editingNodeId, setEditingNodeId] = useState<string>("default")

    const handleAddNode = () => {
        if (!newNodeName.trim()) {
            alert("Введите название вершины")
            return
        }

        if (!parentId || parentId === "default") {
            alert("Выберите вершину для добавления")
            return
        }

        if (Object.keys(tree).length === 1) {
            setRemovingNodeId(String(idIncrement))
        }

        onAddingNode(newNodeName, idIncrement, parentId)
        setIdIncrement(prev => prev + 1)
        setNewNodeName("")
        setParentId("default")
        setRemovingNodeId("default")
    }

    const handleRemoveNode = () => {
        if (!removingNodeId || removingNodeId === "default") {
            alert("Выберите вершину для удаления")
            return
        }

        onRemovingNode(removingNodeId)
        setRemovingNodeId("default")
    }

    const handleEditNode = () => {
        if (!NodeNewName.trim()) {
            alert("Введите новое название вершины")
            return
        }

        if (!editingNodeId || editingNodeId === "default") {
            alert("Выберите вершину для редактирования")
            return
        }

        onEditingNode(editingNodeId, NodeNewName)
        setNodeNewName("")
        setEditingNodeId("default")
    }

    const handleResetTree = () => {
        if (window.confirm("Вы уверены, что хотите сбросить дерево?")) {
            onResetingTree()
            setNewNodeName("")
            setParentId("default")
            setRemovingNodeId("default")
            setNodeNewName("")
            setEditingNodeId("default")
        }
    }

    return (
        <div className="interact-tree-panel">
            <div className="interact-node-form">
                <input
                type="text"
                value={newNodeName}
                onChange={(e) => setNewNodeName(e.target.value)}
                placeholder="Название вершины"/>
                <select
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}>
                        <option value="default">Выберите вершину</option>
                    {Object.keys(tree).map(id => (
                        <option 
                            key={id} 
                            value={id}>
                            {tree[id].name}
                        </option>
                    ))}
                </select>
                <button type="button" className="add-node-button" onClick={handleAddNode}>Добавить вершину</button>
            </div>
            <div className="interact-node-form">
                <select 
                    value={removingNodeId} 
                    onChange={(e) => setRemovingNodeId(e.target.value)}>
                        <option value="default">Выберите вершину</option>
                    {Object.keys(tree).map(id => id !== "root" && (
                        <option 
                            key={id} 
                            value={id}>
                            {tree[id].name}
                        </option>
                    ))}
                </select>
                <button type="button" className="remove-node-button" onClick={handleRemoveNode}>Удалить вершину</button>
            </div>
            <div className="interact-node-form">
                <input
                    type="text"
                    value={NodeNewName}
                    onChange={(e) => setNodeNewName(e.target.value)}
                    placeholder="Новое название вершины"/>
                <select
                    value={editingNodeId}
                    onChange={(e) => setEditingNodeId(e.target.value)}>
                        <option value="default">Выберите вершину</option>
                    {Object.keys(tree).map(id => (
                        <option 
                            key={id} 
                            value={id}>
                            {tree[id].name}
                        </option>
                    ))}
                </select>
                <button type="button" className="edit-node-button" onClick={handleEditNode}>Редактировать вершину</button>
            </div>
            <div className="interact-node-form">
                <button type="button" className="reset-tree-button" onClick={handleResetTree}>Сбросить дерево</button>
            </div>
        </div>
    )
}

export default InteractTreePanel