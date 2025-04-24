import { TreeNodePropsType } from "../../types"
import "./TreeNode.css"
import DELETE_ICON from "../../assets/images/icons/delete-icon.svg"
import RESET_ICON from "../../assets/images/icons/reset-icon.svg"

const TreeNode = ({tree, id, name, children, onRemove, onReset}: TreeNodePropsType) => {
    return (
        <div className="tree-node" id={`node-${id}`}>
            <div className="node">
                {id === "1" && <img src={RESET_ICON} alt="Reset" className="reset-tree-icon" onClick={() => onReset()}/>}
                <span>{name}</span>
                {id !== "1" && <img src={DELETE_ICON} alt="Delete" className="remove-node-icon" onClick={() => onRemove(id)}/>}
            </div>

            
            {(children && children.length > 0) && (
                <ul className="tree-node-children">
                    {children.map(childId => {
                        const child = tree[childId]
                        if (!child) {
                            return null
                        }
                        return (
                            <li key={childId}>
                                <TreeNode
                                    tree={tree}
                                    id={child.id}
                                    name={child.name}
                                    children={child.children}
                                    onRemove={onRemove}
                                    onReset={onReset}/>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default TreeNode