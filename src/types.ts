export type TreeNodeType = {
    id: string,
    name: string,
    children: string[],
}

export type TreeType = {
    [key: string]: TreeNodeType,
}

export type TreePropsType = {
    tree: TreeType,
    rootName: string,
    onRemove: (id: string) => void,
    onReset: () => void
}

export type TreeNodePropsType = {
    tree: TreeType,
    id: string,
    name: string,
    children: string[],
    onRemove: (id: string) => void,
    onReset: () => void
}

export type InteractTreePanelPropsType = {
    tree: TreeType,
    onAddingNode: (newNodeName: string, idIncrement: number, parentId: string) => void,
    onEditingNode: (nodeId: string, newName: string) => void
}