import { TreeNodePropsType } from "../../types"
import "./TreeNode.css"

const TreeNode = ({tree, id, name, children, onClick}: TreeNodePropsType) => {
    return (
        <div className="tree-node" id={`node-${id}`}>
            <span>{name}</span>
            {(children && children.length > 0) && (
                <ul className="tree-node-children">
                    {children.map(childId => {
                        const child = tree[childId]
                        return (
                            <li key={childId}>
                                <TreeNode
                                    tree={tree}
                                    id={child.id}
                                    name={child.name}
                                    children={child.children}/>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default TreeNode