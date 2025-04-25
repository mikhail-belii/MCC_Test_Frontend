import { useState } from "react"
import { InteractTreePanelPropsType } from "../../types"
import "./InteractTreePanel.css"

const InteractTreePanel = ({tree, onAddingNode, onEditingNode}: InteractTreePanelPropsType) => {
    const [newNodeName, setNewNodeName] = useState<string>("")
    const [parentId, setParentId] = useState("default")
    const [idIncrement, setIdIncrement] = useState(2)
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

        onAddingNode(newNodeName, idIncrement, parentId)
        setIdIncrement(prev => prev + 1)
        setNewNodeName("")
        setParentId("default")
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

    return (
        <div className="interact-tree-panel">
            <div className="interact-node-form">
                <p>Добавление вершины</p>
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
            <p>Изменение названия вершины</p>
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
        </div>
    )
}

export default InteractTreePanel