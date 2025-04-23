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
    rootName: string
}

export type TreeNodePropsType = {
    tree: TreeType,
    id: string,
    name: string,
    children: string[],
    onClick?: () => void,
}